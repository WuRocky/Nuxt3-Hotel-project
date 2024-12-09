<!-- <script setup>
    const router = useRouter();
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import { Autoplay, Navigation, Pagination } from 'swiper/modules';

    import 'swiper/css';
    import 'swiper/css/navigation';
    import 'swiper/css/pagination';

    const modules = ref([Autoplay, Navigation, Pagination]);


    const roomSwiper = ref(null);

    const slidePrev = () => {
        roomSwiper.value.$el.swiper.slidePrev();
    }

    const slideNext = () => {
        roomSwiper.value.$el.swiper.slideNext();
    }
</script>

<template>
    <section class="hero position-relative">
        <swiper
            :modules="modules"
            :slides-per-view="1"
            :pagination="true"
            :autoplay="{
            delay: 3000,
            disableOnInteraction: false,
            }"
        >
            <swiper-slide
            v-for="(num, index) in 5"
            :key="index"
            >
            <picture>
                <source
                srcset="@/assets/images/home-hero.png"
                media="(min-width:576px)"
                >
                <img
                class="hero-img"
                src="@/assets/images/home-hero-sm.png"
                alt="hero banner"
                >
            </picture>
            </swiper-slide>
        </swiper>

        <div class="hero-wrapper d-flex flex-column justify-content-center align-items-center flex-md-row justify-content-md-between gap-md-10 w-100 px-md-20 position-absolute z-2">
            <div class="d-flex flex-column align-items-center text-center d-md-block text-md-start">
                <div class="mt-10 mb-5 mt-md-0 mb-md-10 text-primary-100 fw-bold">
                    <h2>享樂酒店</h2>
                    <h5 class="mb-0 fs-7 fs-md-5">
                    Enjoyment Luxury Hotel
                    </h5>
                </div>

                <div class="deco-line" />
            </div>

            <div class="hero__intro position-relative">
                <div class="hero__intro-content">
                    <h1 class="mb-6 text-white fw-bold text-nowrap">
                        高雄<br>豪華住宿之選
                    </h1>
                    <p class="text-neutral-40 fw-semibold">
                        我們致力於為您提供無與倫比的奢華體驗與優質服務
                    </p>
                    <RouterLink 
                    to="/rooms"
                    class="btn btn-neutral-0 d-flex justify-content-end align-items-center gap-3 w-100 text-end text-neutral-100 fs-5 fw-semibold border-0"
                    >立即訂房
                        <div class="cta-deco" />
                    </RouterLink>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>

</style> -->