
export default defineNuxtRouteMiddleware(async (to, from) => {
  const bookingStore = useBookingStore();
  const router = useRouter();

  if (!bookingStore.price || !bookingStore.checkInDate || !bookingStore.checkOutDate || !bookingStore.people) {
    return  router.go(-1); // 返回上一頁或首頁
  }
});