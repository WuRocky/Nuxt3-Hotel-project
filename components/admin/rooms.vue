<script setup>
const { $swal } = useNuxtApp();
const config = useRuntimeConfig();
const apiUrl = config.public.apiUrl;
const getUserCookie = useCookie("auth");

const { data: roomsData } = useFetch(`${apiUrl}api/v1/admin/rooms`, {
  headers: {
    Authorization: `Bearer ${getUserCookie.value}`,
  },
});

const addData = ref({
  name: "",
  description: "",
  imageUrl: "",
  imageUrlList: [],
  areaInfo: "",
  bedInfo: "",
  maxPeople: 0,
  price: 0,
  layoutInfo: [
    {
      title: "",
      isProvide: false,
    },
  ],
  facilityInfo: [
    {
      title: "",
      isProvide: false,
    },
  ],
  amenityInfo: [
    {
      title: "",
      isProvide: false,
    },
  ],
});

const selectedRooms = ref({});

const updateRoomsHandler = async () => {
  if (!selectedRooms.value) return;

  try {
    await $fetch(`${apiUrl}api/v1/admin/rooms/${selectedRooms.value._id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getUserCookie.value}`,
      },
      body: selectedRooms.value,
    });

    // 更新成功提示
    await $swal.fire({
      position: "center",
      icon: "success",
      title: "修改成功",
      showConfirmButton: false,
      timer: 1500,
    });

    // 更新本地資料
    const index = roomsData.value.result.findIndex(
      (room) => room._id === selectedRooms.value._id
    );
    if (index !== -1) {
      roomsData.value.result[index] = { ...selectedRooms.value };
    }

    // 清空選中的資料
    selectedRooms.value = null;
    window.location.reload();
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

const deleteRoomsHandler = async () => {
  if (!selectedRooms.value) return;

  try {
    await $fetch(`${apiUrl}api/v1/admin/rooms/${selectedRooms.value._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getUserCookie.value}`,
      },
    });

    // 刪除成功後更新資料
    roomsData.value.result = roomsData.value.result.filter(
      (room) => room._id !== selectedRooms.value._id
    );

    await $swal.fire({
      position: "center",
      icon: "success",
      title: "刪除成功",
      showConfirmButton: false,
      timer: 1500,
    });

    // 清空選中的資料
    selectedRooms.value = null;
    window.location.reload();
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

const addRoomsHandler = async () => {
  try {
    const response = await $fetch(`${apiUrl}api/v1/admin/culinary`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getUserCookie.value}`,
      },
      body: addData.value,
    });


    // 成功提示
    await $swal.fire({
      position: "center",
      icon: "success",
      title: "新增成功",
      showConfirmButton: false,
      timer: 1500,
    });

    // 清空輸入框
    addData.value = { name: "", description: "", diningTime: "", image: "" };
    window.location.reload();
  } catch (error) {
    console.error(error);
    await $swal.fire({
      position: "center",
      icon: "error",
      title: "新增失敗",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
</script>

<template>
  <div class="col-sm-6 py-2">
      <div v-if="roomsData?.result && roomsData.result.length" class="card card-body h-100 container">
        <h2 class="mb-5">房型管理</h2>
        <div v-for="data in roomsData.result"  class="mb-2">
          <div class="">
            <h5>
              標題:{{ data.name }}
            </h5>
            <div class="my-3">
              <button 
                type="button"
                class="btn btn-outline-success"
                data-bs-toggle="modal"
                data-bs-target="#editRoomsModal"
                @click="selectedRooms = { ...data }"
              >
                修改
              </button>
              <button 
                type="button"
                class="btn btn-outline-danger ms-2"
                data-bs-toggle="modal"
                data-bs-target="#deleteRoomsModal"
                @click="selectedRooms = data"
              >
                刪除
              </button>
            </div>
          </div>

        </div>
        
        <div class="mt-5 d-flex flex-row-reverse">
          <button type="button" class="btn btn-primary-100 flex-grow-1 m  -0 py-4 text-white fw-bold"
           style="--bs-btn-hover-color: #fff"
           data-bs-toggle="modal" data-bs-target="#addRoomsModal">
            新增
          </button>
        </div>
      </div>
      <div v-else>
        <p>資料加載中或無資料可顯示...</p>
      </div>

      <div class="modal fade" id="editRoomsModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">修改房間</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <input v-model="selectedRooms.name" placeholder="房間名稱" class="form-control mb-3" />
              <input v-model="selectedRooms.description" placeholder="描述" class="form-control mb-3" />
              <input v-model="selectedRooms.imageUrl" placeholder="圖片網址" class="form-control mb-3" />
              <input v-model="selectedRooms.price" placeholder="價格" type="number" class="form-control mb-3" />
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
              <button class="btn btn-primary" @click="updateRoomsHandler" data-bs-dismiss="modal">確定修改</button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="modal fade" id="deleteRoomsModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">刪除房間</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>確定要刪除房間 {{ selectedRooms.name }} 嗎？</p>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
              <button class="btn btn-danger" @click="deleteRoomsHandler" data-bs-dismiss="modal">確定刪除</button>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade" id="addRoomsModal" >
        <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">新增房間</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <input v-model="selectedRooms.name" placeholder="房間名稱" class="form-control mb-3" />
            <input v-model="selectedRooms.description" placeholder="描述" class="form-control mb-3" />
            <input v-model="selectedRooms.imageUrl" placeholder="圖片網址" class="form-control mb-3" />
            <input v-model="selectedRooms.price" placeholder="價格" type="number" class="form-control mb-3" />
            <input v-model="selectedRooms.areaInfo" placeholder="房間大小" class="form-control mb-3" />
            <input v-model="selectedRooms.bedInfo" placeholder="床型資訊" class="form-control mb-3" />
            <input v-model="selectedRooms.maxPeople" placeholder="最多入住人數" type="number" class="form-control mb-3" />
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
            <button class="btn btn-primary" @click="addRoomsHandler" data-bs-dismiss="modal">確定新增</button>
          </div>
        </div>
      </div>
      </div>
  </div>


</template>

<style lang='scss' scoped>

</style>