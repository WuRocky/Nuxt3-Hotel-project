export default defineNuxtRouteMiddleware(async (to, from) => {
    const userEmail = useCookie('userEmail').value;

    // 檢查用戶是否為 admin@gmail.com
    if (userEmail !== 'admin@gmail.com') {
      return navigateTo('/403'); // 如果不是，跳轉到 403 禁止頁面
    }
})