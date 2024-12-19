export const useBookingStore = defineStore('booking', () => {

  const price = ref(0);
  const checkInDate = ref('');
  const checkOutDate = ref('');
  const people = ref(1);
  const day = ref(1)

  const setBookingDetails = ({ newPrice, newCheckInDate, newCheckOutDate, newPeople, newDay }) => {
    price.value = newPrice;
    checkInDate.value = newCheckInDate;
    checkOutDate.value = newCheckOutDate;
    people.value = newPeople;
    day.value = newDay
  };


  const formattedDetails = computed(() => ({
    price: new Intl.NumberFormat('zh-TW').format(price.value),
    checkInDate: checkInDate.value,
    checkOutDate: checkOutDate.value,
    people: people.value,
    day: day.value
  }));

  return {
    price,
    checkInDate,
    checkOutDate,
    people,
    day,
    setBookingDetails,
    formattedDetails,
  };
});