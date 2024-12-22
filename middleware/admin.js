export default defineNuxtRouteMiddleware(async (to, from) => {
    const userEmail = useCookie('userEmail').value;


    if (userEmail !== 'admin@gmail.com') {
      return navigateTo('/');
    }
})