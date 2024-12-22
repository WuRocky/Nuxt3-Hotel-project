<script setup>
const { $swal } = useNuxtApp();
const config = useRuntimeConfig();
const apiUrl = config.public.apiUrl;
const getUserCookie = useCookie("auth");

const { data: ordersData } = useFetch(`${apiUrl}api/v1/admin/orders`, {
  headers: {
    Authorization: `Bearer ${getUserCookie.value}`,
  },
});

const orders = computed(() => ordersData?.value?.result || []);
const selectedOrder = ref(null);

const updateOrderHandler = async () => {
  if (!selectedOrder.value) return;

  try {
    await $fetch(`${apiUrl}api/v1/admin/orders/${selectedOrder.value._id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getUserCookie.value}`,
      },
      body: {
        roomId: selectedOrder.value.roomId._id,
        checkInDate: selectedOrder.value.checkInDate,
        checkOutDate: selectedOrder.value.checkOutDate,
        peopleNum: selectedOrder.value.peopleNum,
        userInfo: selectedOrder.value.userInfo,
      },
    });

    // 更新本地資料
    const index = orders.value.findIndex((order) => order._id === selectedOrder.value._id);
    if (index !== -1) {
      ordersData.value.result[index] = { ...selectedOrder.value };
    }

    await $swal.fire({
      position: "center",
      icon: "success",
      title: "修改成功",
      showConfirmButton: false,
      timer: 1500,
    });

    selectedOrder.value = null;
  } catch (error) {
    console.error(error);
    await $swal.fire({
      position: "center",
      icon: "error",
      title: "修改失敗",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

const deleteOrderHandler = async () => {
  if (!selectedOrder.value) return;

  try {
    await $fetch(`${apiUrl}api/v1/admin/orders/${selectedOrder.value._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getUserCookie.value}`,
      },
    });

    // 更新本地資料
    ordersData.value.result = orders.value.filter((order) => order._id !== selectedOrder.value._id);

    await $swal.fire({
      position: "center",
      icon: "success",
      title: "刪除成功",
      showConfirmButton: false,
      timer: 1500,
    });

    selectedOrder.value = null;
  } catch (error) {
    console.error(error);
    await $swal.fire({
      position: "center",
      icon: "error",
      title: "刪除失敗",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
</script>

<template>
  <div class="col-sm-6 py-2">
    <div v-if="orders && orders.length" class="card card-body h-100 container">
      <h2 class="mb-5">訂單管理</h2>
      <div v-for="order in orders" :key="order._id" class="mb-2">
        <div>
          <p>訂單編號: {{ order._id }}</p>
          <p>房間名稱: {{ order.roomId.name }}</p>
          <p>訂單人: {{ order.userInfo.name }}</p>
          <p>入住日期: {{ new Date(order.checkInDate).toLocaleDateString() }}</p>
          <p>退房日期: {{ new Date(order.checkOutDate).toLocaleDateString() }}</p>
          <div class="my-3">
            <button
              type="button"
              class="btn btn-outline-success"
              data-bs-toggle="modal"
              data-bs-target="#editOrderModal"
              @click="selectedOrder = { ...order }"
            >
              修改
            </button>
            <button
              type="button"
              class="btn btn-outline-danger ms-2"
              data-bs-toggle="modal"
              data-bs-target="#deleteOrderModal"
              @click="selectedOrder = order"
            >
              刪除
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="pending">
      <p>資料加載中...</p>
    </div>

    <div v-else>
      <p>目前無資料顯示。</p>
    </div>

    <!-- 修改訂單 Modal -->
    <div class="modal fade" id="editOrderModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">修改訂單</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div v-if="selectedOrder">
              <div class="mb-3">
                <label for="checkInDate" class="form-label">入住時間</label>
                <input
                  id="checkInDate"
                  type="date"
                  class="form-control"
                  v-model="selectedOrder.checkInDate"
                />
              </div>
              <div class="mb-3">
                <label for="checkOutDate" class="form-label">退房時間</label>
                <input
                  id="checkOutDate"
                  type="date"
                  class="form-control"
                  v-model="selectedOrder.checkOutDate"
                />
              </div>
              <div class="mb-3">
                <label for="peopleNum" class="form-label">人數</label>
                <input
                  id="peopleNum"
                  type="number"
                  class="form-control"
                  v-model="selectedOrder.peopleNum"
                />
              </div>
              <div class="mb-3">
                <label for="zipcode" class="form-label">郵遞區號</label>
                <input
                  id="zipcode"
                  type="text"
                  class="form-control"
                  v-model="selectedOrder.userInfo.address.zipcode"
                />
              </div>
              <div class="mb-3">
                <label for="detail" class="form-label">地址</label>
                <input
                  id="detail"
                  type="text"
                  class="form-control"
                  v-model="selectedOrder.userInfo.address.detail"
                />
              </div>
              <div class="mb-3">
                <label for="name" class="form-label">姓名</label>
                <input
                  id="name"
                  type="text"
                  class="form-control"
                  v-model="selectedOrder.userInfo.name"
                />
              </div>
              <div class="mb-3">
                <label for="phone" class="form-label">電話</label>
                <input
                  id="phone"
                  type="text"
                  class="form-control"
                  v-model="selectedOrder.userInfo.phone"
                />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">信箱</label>
                <input
                  id="email"
                  type="email"
                  class="form-control"
                  v-model="selectedOrder.userInfo.email"
                />
              </div>
            </div>
            <div v-else>
              <p>尚未選擇訂單。</p>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
            <button
              class="btn btn-primary"
              @click="updateOrderHandler"
              data-bs-dismiss="modal"
              :disabled="!selectedOrder"
            >
              確定修改
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 刪除訂單 Modal -->
    <div class="modal fade" id="deleteOrderModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">刪除訂單</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>確定要刪除訂單嗎？</p>
            <p v-if="selectedOrder"><strong>訂單編號：</strong>{{ selectedOrder._id }}</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
            <button
              class="btn btn-danger"
              @click="deleteOrderHandler"
              data-bs-dismiss="modal"
              :disabled="!selectedOrder"
            >
              確定刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
