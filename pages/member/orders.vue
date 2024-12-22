<script setup>
definePageMeta({
  layout: 'userlayout',
  middleware: "auth",
});

const { $swal } = useNuxtApp();
const config = useRuntimeConfig();
const apiUrl = config.public.apiUrl;
const getUserCookie = useCookie("auth");

const { data } = await useFetch(`${apiUrl}api/v1/orders`, {
  headers: {
    Authorization: `Bearer ${getUserCookie.value}`,
  },
});

const now = new Date();

const upcomingTrips = ref([]);
const pastOrders = ref([]);

if (data.value?.result) {
  const allOrders = data.value.result;

  // 即將來的行程
  upcomingTrips.value = allOrders
    .filter(order => (new Date(order.checkInDate) > now && order.status === 0) && order.status !== -1)
    .sort((a, b) => new Date(a.checkInDate) - new Date(b.checkInDate));

  // 歷史訂單
  pastOrders.value = allOrders.filter(order => new Date(order.checkInDate) <= now || order.status === -1);
}

// 計算入住天數
const calculateDays = (checkInDate, checkOutDate) => {
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  return (checkOut - checkIn) / (1000 * 60 * 60 * 24); // 將毫秒轉換為天數
};

// 選中的行程
const selectedTrip = ref(null);

// 取消預訂
const cancelBooking = async () => {
  if (!selectedTrip.value) return;

  try {
    await useFetch(`${apiUrl}api/v1/orders/${selectedTrip.value._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getUserCookie.value}`,
      },
    });

    // 從即將來的行程中移除已取消的行程
    upcomingTrips.value = upcomingTrips.value.filter(trip => trip._id !== selectedTrip.value._id);

    $swal.fire({
      position: "center",
      icon: "success",
      title: "您已取消訂單",
      showConfirmButton: false,
      timer: 1500,
    });

    selectedTrip.value = null;
  } catch (error) {
    const message = error.response?._data?.message || "取消訂單失敗，請聯絡客服人員";
    $swal.fire({
      position: "center",
      icon: "error",
      title: message,
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

</script>

<template>

    <div class="row gap-6 gap-md-0">


      <div v-if="data.result.length === 0 || upcomingTrips.length === 0" class="col-12 col-md-7">
        <div class="rounded-3xl d-flex flex-column gap-6 gap-md-10 p-4 p-md-10 bg-neutral-0"
        style="max-width: 730px;">
          <div>
            <h2 class="mb-0 text-neutral-100 fs-7 fs-md-5 fw-bold">
              沒有即將來的行程
            </h2>
          </div>
        </div>
      </div>

      <div v-else class="col-12 col-md-7">
        <div
          v-for="(trip, index) in upcomingTrips"
          :key="trip._id"
          class="rounded-3xl d-flex flex-column gap-6 gap-md-10 p-4 p-md-10 bg-neutral-0"
          :style="{ maxWidth: '730px', marginTop: index > 0 ? '20px' : '0' }"
        >
          <div>
            <p class="mb-2 text-neutral-80 fs-8 fs-md-7 fw-medium">
              預訂參考編號： {{ trip._id }}
            </p>
            <h2 class="mb-0 text-neutral-100 fs-7 fs-md-5 fw-bold">
              即將來的行程
            </h2>
          </div>

          <img class="img-fluid rounded-3" :src="trip.roomId.imageUrl" :alt="trip.roomId.name" />

          <section class="d-flex flex-column gap-6">
            <h3 class="d-flex align-items-center mb-0 text-neutral-80 fs-8 fs-md-6 fw-bold">
              <p class="mb-0">
                {{ trip.roomId.name }}，{{ calculateDays(trip.checkInDate, trip.checkOutDate) }}晚
              </p>
              <span class="d-inline-block mx-4 bg-neutral-80" style="width: 1px;height: 18px;" />
              <p class="mb-0">
                住宿人數：{{ trip.peopleNum }} 位
              </p>
            </h3>
            <div class="text-neutral-80 fs-8 fs-md-7 fw-bold">
              <p class="title-deco mb-2">入住：{{ new Date(trip.checkInDate).toLocaleDateString() }}</p>
              <p class="title-deco mb-0">退房：{{ new Date(trip.checkOutDate).toLocaleDateString() }}</p>
            </div>
            <p class="mb-0 text-neutral-80 fs-8 fs-md-7 fw-bold">NT$ {{ trip.roomId.price }}</p>
          </section>

          <div class="d-flex gap-4">
            <button
              data-bs-toggle="modal"
              data-bs-target="#cancelModal"
              class="btn btn-outline-primary-100 w-50 py-4 fw-bold"
              style="--bs-btn-hover-color: #fff"
              @click="selectedTrip = trip"
            >
              取消預訂
            </button>
            <NuxtLink :to="{ params: { roomId: trip.roomId._id } }" class="btn btn-primary-100 text-neutral-0 w-50 py-4 fw-bold">
              查看詳情
            </NuxtLink>
          </div>
        </div>
      </div>



      <div v-if="data.result.length === 0" class="col-12 col-md-5">
        <div
          class="rounded-3xl d-flex flex-column gap-6 gap-md-10 p-4 p-md-10 bg-neutral-0"
        >
          <h2 class="mb-0 text-neutral-100 fs-7 fs-md-5 fw-bold">
            無歷史訂單
          </h2>
        </div>
      </div>

      <div v-else class="col-12 col-md-5">
        <div
          class="rounded-3xl d-flex flex-column gap-6 gap-md-10 p-4 p-md-10 bg-neutral-0"
        >
          <h2 class="mb-0 text-neutral-100 fs-7 fs-md-5 fw-bold">
            歷史訂單
          </h2>
  
          <div v-for="(order, index) in pastOrders" :key="order._id">
            <div class="d-flex flex-column flex-lg-row gap-6">
              <img
                class="img-fluid object-fit-cover rounded-3"
                style="max-width: 120px; height: 80px;"
                :src="order.roomId.imageUrl"
                :alt="order.roomId.name"
              >
              <section class="d-flex flex-column gap-4">
                <p class="mb-0 text-neutral-80 fs-8 fs-md-7 fw-medium">
                  預訂參考編號： {{order._id}}
                </p>
              
                <h3 class="d-flex align-items-center mb-0 text-neutral-80 fs-8 fs-md-6 fw-bold">
                  {{ order.roomId.name }}
                </h3>
  
                <div class="text-neutral-80 fw-medium">
                  <p class="mb-2">
                    住宿天數： {{ calculateDays(order.checkInDate,order.checkOutDate) }} 晚
                  </p>
                  <p class="mb-0">
                    住宿人數： {{  order.peopleNum }} 位
                  </p>
                </div>
  
                <div class="text-neutral-80 fs-8 fs-md-7 fw-medium">
                  <p class="title-deco mb-2">
                    入住：{{ new Date(order.checkInDate).toLocaleDateString() }}，15:00 可入住
                  </p>
                  <p
                    class="title-deco mb-0"
                  >
                    退房：{{ new Date(order.checkOutDate).toLocaleDateString() }}，12:00 前退房
                  </p>
                </div>
                <p class="mb-0 text-neutral-80 fs-8 fs-md-7 fw-bold">
                  NT$ {{ order.roomId.price }}
                </p>
              </section>
            </div>
  
            <hr class="my-0 opacity-100 text-neutral-40">
          </div>

  
          <button
            class="btn btn-outline-primary-100 py-4 fw-bold"
            style="--bs-btn-hover-color: #fff"
            type="button"
          >
            查看更多
          </button>
        </div>
      </div>

    </div>


    <div
      id="cancelModal"
      class="modal fade"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered align-items-end align-items-md-center m-0 mx-md-auto h-100">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div class="modal-body mx-auto my-10 my-md-15 text-neutral-80 fs-8 fs-md-6 fw-bold">
            確定要取消此房型的預訂嗎？
          </div>
          <div class="modal-footer d-flex gap-4">
            <button
              type="button"
              class="btn btn-outline-primary-100 flex-grow-1 m-0 py-4 fw-bold"
              style="--bs-btn-hover-color: #fff"
              data-bs-dismiss="modal"
            >
              關閉視窗
            </button>
            <button
              type="button"
              class="btn btn-primary-100 flex-grow-1 m  -0 py-4 text-white fw-bold"
              @click="cancelBooking"
            >
              確定取消
            </button>
          </div>
        </div>
      </div>
    </div>



</template>

<style lang="scss" scoped>
@import "bootstrap/scss/mixins/breakpoints";

$grid-breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1400px,
  xxxl: 1537px
);


.rounded-3xl {
  border-radius: 1.25rem;
}

.title-deco {
  display: flex;
  align-items: center;
}

.title-deco::before {
  --color: #BF9D7D;
  content: '';
  display: inline-block;
  width: 4px;
  height: 24px;
  background-color: var(--color);
  border-radius: 10px;
  margin-right: 0.75rem;
}

.title-deco:nth-child(2)::before {
  --color: #909090;
}

.flex-item {
  max-width: 97px;
  width: 100%;
  white-space: nowrap;
}


.modal {
  backdrop-filter: blur(10px);

  @include media-breakpoint-down(md) {
    backdrop-filter: none;
  }
}

.modal-header {
  @include media-breakpoint-down(md) {
    border-bottom: 0 !important;
  }
}

.modal-content {
  @include media-breakpoint-down(md) {
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }
}
</style>