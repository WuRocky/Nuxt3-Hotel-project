  <script setup>
    definePageMeta({
      layout: 'userlayout',
      middleware: "auth",
    });

    import ZipCodeMap from '@/assets/zipcodes';

    const cities = Array.from(new Set(ZipCodeMap.map(item => item.city))); 
    const selectedCity = ref("");
    const areas = computed(() => {
      return ZipCodeMap.filter(item => item.city === selectedCity.value);
    });


    const { $swal } = useNuxtApp();
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiUrl
    const getUserCookie = useCookie("auth"); 
    const { data } = await useFetch(`${apiUrl}api/v1/user`, {
      headers: {
        Authorization: `Bearer ${getUserCookie.value}`,
      },
    });
    const formatBirthday = (isoDate) => {
      const date = new Date(isoDate);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      return `${year} 年 ${month} 月 ${day} 日`;
    };

    const formattedBirthday = formatBirthday(data.value.result.birthday);

    const userChangeUserDataObject = ref({
      userId: data.value.result._id,
      name: data.value.result.name,
      email: "",
      password: "",
      phone:  data.value.result.phone,
      birthday: {
        year: "",
        month: "",
        day: "",
      },
      address: {
        zipcode: data.value.result.address.zipcode,
        detail: data.value.result.address.detail,
      },
      oldPassword: "",
      newPassword: ""
    })

    const isEditPassword = ref(false);
    const isEditProfile = ref(false);
    const confirmAginPassword = ref("");
    
    const changePassword = async () => {
      // 資料驗證
      if (userChangeUserDataObject.value.newPassword.length < 8) {
        $swal.fire({
          position: "center",
          icon: "error",
          title: "新密碼需至少 8 個字元",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }

      if (/^\d+$/.test(userChangeUserDataObject.value.newPassword)) {
        $swal.fire({
          position: "center",
          icon: "error",
          title: "新密碼不能只有數字",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }

      const confirmPassword = document.querySelector("#confirmPassword").value;
      if (userChangeUserDataObject.value.newPassword !== confirmPassword) {
        $swal.fire({
          position: "center",
          icon: "error",
          title: "新密碼與確認密碼不一致",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }

      // API 請求
      isEditPassword.value = true;
      try {
        const { data: response } = await useFetch(`${apiUrl}api/v1/user`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${getUserCookie.value}`,
          },
          body: {
            userId: userChangeUserDataObject.value.userId,
            oldPassword: userChangeUserDataObject.value.oldPassword,
            newPassword: userChangeUserDataObject.value.newPassword,
          },
        });

        // 成功提示
        $swal.fire({
          position: "center",
          icon: "success",
          title: "密碼修改成功",
          showConfirmButton: false,
          timer: 1500,
        });

        // 重置表單
        userChangeUserDataObject.value.oldPassword = "";
        userChangeUserDataObject.value.newPassword = ""; 
        confirmAginPassword.value = ""; 
        isEditPassword.value = false;
      } catch (error) {
        const message = error.response?._data?.message || "密碼修改失敗，請稍後再試";
        $swal.fire({
          position: "center",
          icon: "error",
          title: message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    };

    const changeProfile = async () => {
      try {
        const response = await useFetch(`${apiUrl}api/v1/user`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${getUserCookie.value}`,
          },
          body: {
            userId: userChangeUserDataObject.value.userId,
            name: userChangeUserDataObject.value.name,
            phone: userChangeUserDataObject.value.phone,
            birthday: `${userChangeUserDataObject.value.birthday.year}-${userChangeUserDataObject.value.birthday.month}-${userChangeUserDataObject.value.birthday.day}`,
            address: userChangeUserDataObject.value.address,
          },
        });

        $swal.fire({
          position: "center",
          icon: "success",
          title: "基本資料修改成功",
          showConfirmButton: false,
          timer: 1500,
        });

        isEditProfile.value = false; // 關閉編輯狀態
      } catch (error) {
        const message = error.response?._data?.message || "基本資料修改失敗，請稍後再試";
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
      <div class="col-12 col-md-5">
        
        <section class="rounded-3xl d-flex flex-column gap-6 gap-md-10 p-6 p-md-10 bg-neutral-0">
          <h2 class="fs-6 fs-md-5 fw-bold">
            修改密碼
          </h2>

          <div class="d-flex flex-column gap-4 gap-md-6">
            <div class="fs-8 fs-md-7">
              <p class="mb-2 text-neutral-80 fw-medium">
                電子信箱
              </p>
              <span
                class="form-control pe-none p-0 text-neutral-100 fw-bold border-0"
              >{{ data.result.email }}</span>
            </div>

            <div
              class="d-flex justify-content-between align-items-center"
              :class="{'d-none': isEditPassword}"
            >
              <div>
                <label class="mb-0 text-neutral-80 fs-8 fs-md-7 fw-medium">
                  密碼
                </label>
                <input
                  class="form-control pe-none p-0 text-neutral-100 fs-5 fs-md-3 fw-bold border-0"
                  type="password"
                  value="**********"
                >
              </div>

              <button
                class="flex-shrink-0 text-primary-100 fs-8 fs-md-7 fw-bold text-decoration-underline border-0 bg-transparent"
                type="button"
                @click="isEditPassword = !isEditPassword"
              >
                重設
              </button>
            </div>

            <div
              class="d-flex flex-column gap-4 gap-md-6"
              :class="{'d-none': !isEditPassword}"
            >
              <div>
                <label
                  for="oldPassword"
                  class="form-label fs-8 fs-md-7 fw-bold"
                >舊密碼</label>
                <input
                  id="oldPassword"
                  type="password"
                  class="form-control p-4 fs-7 rounded-3"
                  placeholder="請輸入舊密碼"
                  v-model="userChangeUserDataObject.oldPassword"
                >
              </div>

              <div>
                <label
                  for="newPassword"
                  class="form-label fs-8 fs-md-7 fw-bold"
                >新密碼</label>
                <input
                  id="newPassword"
                  type="password"
                  class="form-control p-4 fs-7 rounded-3"
                  placeholder="請輸入新密碼"
                  v-model="userChangeUserDataObject.newPassword"
                >
              </div>

              <div>
                <label
                  for="confirmPassword"
                  class="form-label fs-8 fs-md-7 fw-bold"
                >確認新密碼</label>
                <input
                  id="confirmPassword"
                  type="password"
                  class="form-control p-4 fs-7 rounded-3"
                  placeholder="請再輸入一次新密碼"
                  v-model="confirmAginPassword"
                >
              </div>
            </div>

            <button
              :class="{'d-none': !isEditPassword}"
              class="btn btn-neutral-40 align-self-md-start px-8 py-4 text-neutral-60 rounded-3"
              type="button"
              @click="changePassword"
            >
              儲存設定
            </button>
          </div>
        </section>

      </div>

      <div class="col-12 col-md-7">
        <section class="rounded-3xl d-flex flex-column gap-6 gap-md-10 p-6 p-md-10 bg-neutral-0">
          <h2 class="fs-6 fs-md-5 fw-bold">
            基本資料
          </h2>
          <div class="d-flex flex-column gap-4 gap-md-6">
            <div class="fs-8 fs-md-7">
              <label
                class="form-label"
                :class="{'fw-bold text-neutral-100': isEditProfile, 'fw-medium text-neutral-80': !isEditProfile}"
                for="name"
              >
                姓名
              </label>
              <input
                id="name"
                name="name"
                class="form-control text-neutral-100 fw-bold"
                :class="{'pe-none p-0 border-0': !isEditProfile, 'p-4': isEditProfile}"
                type="text"
                v-model="userChangeUserDataObject.name"
              >
            </div>

            <div class="fs-8 fs-md-7">
              <label
                class="form-label"
                :class="{'fw-bold text-neutral-100': isEditProfile, 'fw-medium text-neutral-80': !isEditProfile}"
                for="phone"
              >
                手機號碼
              </label>
              <input
                id="phone"
                name="phone"
                class="form-control text-neutral-100 fw-bold"
                :class="{'pe-none p-0 border-0': !isEditProfile, 'p-4': isEditProfile}"
                type="tel"
                
                v-model="userChangeUserDataObject.phone"
              >
            </div>

            <div class="fs-8 fs-md-7">
              <label
                class="form-label"
                :class="{'fw-bold text-neutral-100': isEditProfile, 'fw-medium text-neutral-80': !isEditProfile}"
                for="birth"
              >
                生日
              </label>
              <span
                class="form-control pe-none p-0 text-neutral-100 fw-bold border-0"
                :class="{'d-none': isEditProfile}"
              >{{ formattedBirthday }}</span>
              <div
                class="d-flex gap-2"
                :class="{'d-none': !isEditProfile}"
              >
                <select
                  id="birth"
                  class="form-select p-4 text-neutral-80 fw-medium rounded-3"
                  v-model="userChangeUserDataObject.birthday.year"
                >
                  <option
                    v-for="year in 65"
                    :key="year"
                    :value="year + 1958"
                  >
                    {{ year + 1958 }} 年
                  </option>
                </select>
                <select
                  class="form-select p-4 text-neutral-80 fw-medium rounded-3"
                  v-model="userChangeUserDataObject.birthday.month"
                >
                  <option
                    v-for="month in 12"
                    :key="month"
                    :value="month"
                  >
                    {{ month }} 月
                  </option>
                </select>
                <select
                  class="form-select p-4 text-neutral-80 fw-medium rounded-3"
                  v-model="userChangeUserDataObject.birthday.day"
                >
                  <option
                    v-for="day in 30"
                    :key="day"
                    :value="day"
                  >
                    {{ day }} 日
                  </option>
                </select>
              </div>
            </div>

            <div class="fs-8 fs-md-7">
              <label
                class="form-label"
                :class="{'fw-bold text-neutral-100': isEditProfile, 'fw-medium text-neutral-80': !isEditProfile}"
                for="address"
              >
                地址
              </label>
              <span
                class="form-control pe-none p-0 text-neutral-100 fw-bold border-0"
                :class="{'d-none': isEditProfile}"
              >{{ data.result.address.detail }}</span>
              <div :class="{'d-none': !isEditProfile}">
                <div
                  class="d-flex gap-2 mb-2"
                >
                  <select
                    v-model="selectedCity"
                    class="form-select p-4 text-neutral-80 fw-medium rounded-3"
                  >
                    <option value="" disabled>請選擇城市</option>
                    <option v-for="city in cities" :key="city" :value="city">
                      {{ city }}
                    </option>
                  </select>
                  <select
                    class="form-select p-4 text-neutral-80 fw-medium rounded-3"
                    v-model="userChangeUserDataObject.address.zipcode"
                  >
                    <option value="" disabled>請選擇區域</option>
                    <option v-for="area in areas" :key="area.zipcode" :value="area.zipcode">
                      {{ area.county }} ({{ area.zipcode }})
                    </option>
                    </select>
                </div>
                <input
                  id="address"
                  type="text"
                  class="form-control p-4 rounded-3"
                  placeholder="請輸入詳細地址"
                  v-model="userChangeUserDataObject.address.detail"
                >
              </div>
            </div>
          </div>
          <button
            :class="{'d-none': isEditProfile}"
            class="btn btn-outline-primary-100 align-self-start px-8 py-4 rounded-3"
            type="button"
            @click="isEditProfile = !isEditProfile"
          >
            編輯
          </button>

          <button
            :class="{'d-none': !isEditProfile}"
            class="btn btn-neutral-40 align-self-md-start px-8 py-4 text-neutral-60 rounded-3"
            type="button"
            @click="changeProfile"
          >
            儲存設定
          </button>
        </section>
      </div>
    </div>
  </template>

  <style scoped>
    .rounded-3xl {
      border-radius: 1.25rem;
    }

    input[type="password"] {
      font: small-caption;
    }

    .form-control::placeholder {
      --neutral-60: #909090;
      color: var(--neutral-60);
      font-weight: 500;
    }
  </style>