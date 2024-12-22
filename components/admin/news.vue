<script setup>
const { $swal } = useNuxtApp();
const config = useRuntimeConfig();
const apiUrl = config.public.apiUrl;
const getUserCookie = useCookie("auth");

const { data: newData } = useFetch(`${apiUrl}api/v1/admin/news`, {
  headers: {
    Authorization: `Bearer ${getUserCookie.value}`,
  },
});

const addData = ref({
  title: "",
  description: "",
  image: "",
});

const selectedNews = ref({});

const updateNewsHandler = async () => {
  if (!selectedNews.value) return;

  try {
    await $fetch(`${apiUrl}api/v1/admin/news/${selectedNews.value._id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getUserCookie.value}`,
      },
      body: {
        title: selectedNews.value.title,
        description: selectedNews.value.description,
        image: selectedNews.value.image,
      },
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
    const index = newData.value.result.findIndex(
      (news) => news._id === selectedNews.value._id
    );
    if (index !== -1) {
      newData.value.result[index] = { ...selectedNews.value };
    }

    // 清空選中的資料
    selectedNews.value = null;
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

const deleteNewsHandler = async () => {
  if (!selectedNews.value) return;

  try {
    await $fetch(`${apiUrl}api/v1/admin/news/${selectedNews.value._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getUserCookie.value}`,
      },
    });

    // 刪除成功後更新資料
    newData.value.result = newData.value.result.filter(news => news._id !== selectedNews.value._id);

    await $swal.fire({
      position: "center",
      icon: "success",
      title: "刪除成功",
      showConfirmButton: false,
      timer: 1500,
    });

    // 清空選中的資料
    selectedNews.value = null;
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

const addNewsHandler = async () => {
  try {
    const response = await $fetch(`${apiUrl}api/v1/admin/news`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getUserCookie.value}`,
      },
      body: addData.value,
    });

    // 更新資料
    newData.value.result.push(response);

    // 成功提示
    await $swal.fire({
      position: "center",
      icon: "success",
      title: "新增成功",
      showConfirmButton: false,
      timer: 1500,
    });

    // 清空輸入框
    addData.value = { title: "", description: "", image: "" };
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
      <div v-if="newData?.result" class="card card-body h-100 container">
        <h2 class="mb-5">最新消息管理</h2>
        <div v-for="data in newData.result"  class="mb-2">
          <div class="">
            <h5>
              標題:{{ data.title }}
            </h5>
            <div class="my-3">
              <button 
                type="button"
                class="btn btn-outline-success"
                data-bs-toggle="modal"
                data-bs-target="#editNewsModal"
                @click="selectedNews = { ...data }"
              >
                修改
              </button>
              <button 
                type="button"
                class="btn btn-outline-danger ms-2"
                data-bs-toggle="modal"
                data-bs-target="#deleteNewsModal"
                @click="selectedNews = data"
              >
                刪除
              </button>
            </div>
          </div>

        </div>
        
        <div class="mt-5 d-flex flex-row-reverse">
          <button type="button" class="btn btn-primary-100 flex-grow-1 m  -0 py-4 text-white fw-bold"
           style="--bs-btn-hover-color: #fff"
           data-bs-toggle="modal" data-bs-target="#addNewsModal">
            新增
          </button>
        </div>
      </div>
      <div v-else>
        <p>資料加載中...</p>
      </div>

      <div class="modal fade" id="editNewsModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">修改新聞</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="editTitle" class="form-label">標題</label>
                <input
                  id="editTitle"
                  type="text"
                  class="form-control"
                  v-model="selectedNews.title"
                />
              </div>
              <div class="mb-3">
                <label for="editDescription" class="form-label">描述</label>
                <textarea
                  id="editDescription"
                  class="form-control"
                  v-model="selectedNews.description"
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="editImage" class="form-label">圖片網址</label>
                <input
                  id="editImage"
                  type="text"
                  class="form-control"
                  v-model="selectedNews.image"
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                取消
              </button>
              <button
                type="button"
                class="btn btn-primary"
                @click="updateNewsHandler"
                data-bs-dismiss="modal"
              >
                確定修改
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="modal fade" id="deleteNewsModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">確認刪除</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>是否確定刪除以下新聞項目？</p>
              <p><strong>標題：</strong>{{ selectedNews?.title }}</p>
              <p><strong>描述：</strong>{{ selectedNews?.description }}</p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                取消
              </button>
              <button
                type="button"
                class="btn btn-danger"
                @click="deleteNewsHandler"
                data-bs-dismiss="modal"
              >
                確定刪除
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade" id="addNewsModal" >
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

              <div class="mb-5">
                <label for="addTitle" class="mb-2 fw-bold">請輸入 title</label>
                <input type="text" id="addTitle" class="form-control  rounded-3"
                  v-model="addData.title" 
                >
              </div>

              <div class="mb-5">
                <label for="addTitle" class="mb-2 fw-bold">請輸入 描述</label>
                <input type="text" id="addTitle" class="form-control  rounded-3"
                  v-model="addData.description" 
                >
              </div>

              <div>
                <label for="addTitle" class="mb-2 fw-bold">請輸入 圖片網址</label>
                <input type="text" id="addTitle" class="form-control  rounded-3"
                v-model="addData.image" 
                >
              </div>
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
                @click="addNewsHandler"
              >
                確定新增
              </button>
            </div>
          </div>
        </div>
      </div>
  </div>


</template>

<style lang='scss' scoped>

</style>