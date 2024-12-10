<script setup>
import Swiper from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const props = defineProps({
  modules: {
    type: Array,
    required: true,
  },
  autoplay: {
    type: Object,
    default: {
      delay: 3000,
    },
  },
  pagination: {
    type: Object,
    default: { 
      el: ".swiper-pagination",
      type: "bullets",
    },
  },
  navigation: {
    type: Object,
    default: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  },
  loop: {
    type: Boolean,
    default: true,
  },
  slidesPerView: {
    type: Number,
    default: 1,
  },
});

const swiperRef = ref(null);
onMounted(() => {
    new Swiper(swiperRef.value, props);
});
</script>

<template>
    <div class="swiper" ref="swiperRef">
        <div class="swiper-wrapper">
            <slot />
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>

<style lang="scss" scoped></style>