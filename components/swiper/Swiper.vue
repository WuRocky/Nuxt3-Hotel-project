<script setup>
//  Swiper JS 核心功能
import Swiper from "swiper";

// Swiper 核心與模組的樣式
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const props = defineProps({
    autoplay: Object,
    pagination: Object,
    navigation: Object,
    loop: Boolean,
    slidesPerView: Number,
    modules: Array,
    breakpoints: Object,
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
        <!-- <div class="swiper-pagination"></div> -->
<!-- 
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div> -->
    </div>
</template>

<style scoped></style>