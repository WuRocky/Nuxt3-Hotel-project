<script setup>
import { Autoplay, Navigation, Pagination } from 'swiper/modules';


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
    <section class="room-intro position-relative px-3 py-20 px-md-0 py-md-30 bg-neutral-120">
        <div class="d-flex flex-column flex-md-row justify-content-center align-items-center justify-content-md-start align-items-md-end gap-6 gap-md-20">
            <Swiper
                ref="roomSwiper"
                :modules="modules"
                :slides-per-view="1"
                :pagination="true"
                :autoplay="{
                    delay: 5000,
                    disableOnInteraction: false,
                }"
                :loop="true"
            >
                <SwiperSlide
                    v-for="(num, index) in 5"
                    :key="index"
                >
                    <picture>
                    <source
                        srcset="@/assets/images/home-room-1.png"
                        media="(min-width:768px)"
                    >
                    <img
                        class="w-100"
                        src="@/assets/images/home-room-sm-1.png"
                        alt="room-a"
                    >
                    </picture>
                </SwiperSlide>
            </Swiper>
            
            <div class="room-intro-content text-neutral-0">
                <h2 class="mb-2 mb-md-4 fw-bold">
                    尊爵雙人房
                </h2>
                <p class="mb-6 mb-md-10 fs-8 fs-md-7">
                    享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。
                </p>
                <div class="mb-6 mb-md-10 fs-3 fw-bold">
                    NT$ 10,000
                </div>

                <RouterLink
                    to="/rooms"
                    class="btn btn-neutral-0 d-flex justify-content-end align-items-center gap-3 w-100 p-5 p-md-10 mb-6 mb-md-10 text-end text-neutral-100 fs-7 fs-md-5 fw-bold border-0"
                >
                    查看更多
                    <div class="cta-deco" />
                </RouterLink>

                <div class="d-flex justify-content-end">
                    <button
                        class="bg-transparent text-primary-100 icon-link icon-link-hover border-0"
                        type="button"
                        @click="slidePrev"
                    >
                    <Icon
                        icon="mdi:arrow-left"
                        class="bi m-4"
                        style="font-size: 1.5rem; --bs-icon-link-transform: translateX(-0.25em);"
                    />
                    </button>
                    <button
                        class="bg-transparent text-primary-100 icon-link icon-link-hover border-0"
                        type="button"
                        @click="slideNext"
                    >
                    <Icon
                        icon="mdi:arrow-right"
                        class="bi m-4"
                        style="font-size: 1.5rem;"
                    />
                    </button>
                </div>
            </div>
        </div>
    </section> 
</template>

<style lang='scss' scoped>
    @import "bootstrap/scss/mixins/breakpoints";

    $grid-breakpoints: (
        xs: 0,
        sm: 576px,
        md: 768px,
        lg: 992px,
        xl: 1200px,
        xxl: 1400px,
        xxxl: 1537px
    );

    section .btn {
        --primary: #BF9D7D;
        --neutral: #FFFFFF;
        height: clamp(4rem, 12vh, 7.25rem);
        padding: 5%;

        &:hover {
            box-shadow: inset 48vw 0 0 0 var(--primary);
            color: var(--neutral) !important;
            transition-duration: 0.25s;

            .cta-deco {
            background-color: var(--neutral) !important;
            width: 8vw;
            }
        }

        @include media-breakpoint-down(md) {
            height: 4rem;
        }
    }

    .room-intro::before {
        position: absolute;
        top: -24px;
        right: -80px;
        z-index: 2;
        content: '';
        width: 375px;
        height: 84px;
        background-image: url('@/assets/images/deco-line-group-horizontal-sm.svg');
        background-repeat: no-repeat;

        @include media-breakpoint-up(md) {
            background-image: url('@/assets/images/deco-line-group-horizontal.svg');
            width: 1060px;
            height: 187px;
            top: -50px;
            left: 430px;
            right: auto;
        }

        @include media-breakpoint-up(lg) {
            top: 0px;
            left: 430px;
        }

        @include media-breakpoint-up(xl) {
            top: 130px;
            left: 630px;
        }

        @include media-breakpoint-up(xxxl) {
            top: 180px;
            left: 860px;
        }
    }

    .room-intro::after {
        position: absolute;
        z-index: -1;
        bottom: 265px;
        right: 0;
        content: '';
        width: 375px;
        height: 132px;
        background-image: url('@/assets/images/deco-wave-bg-sm.svg');
        background-repeat: no-repeat;

        @include media-breakpoint-up(md) {
            background-image: url('@/assets/images/deco-wave-bg.svg');
            width: 1920px;
            height: 86%;
            bottom: 0;
            left: -280px;
            right: auto;
        }

        @include media-breakpoint-up(lg) {
            height: 80%;
        }

        @include media-breakpoint-up(xl) {
            height: 62.5%;
            left: -100px;
        }

        @include media-breakpoint-up(xxxl) {
            height: 677px;
            bottom: 0;
            left: 0;
        }
    }

    .room-intro .swiper{
        --origin-width: 900;
        --container-width: 1920;
        --percent-width: calc(var(--origin-width) / var(--container-width) * 100vw);
        max-width: var(--percent-width);
        margin: 0;

        @include media-breakpoint-down(md) {
            max-width: 100%;
        }
    }

    .room-intro-content {
        max-width: 628px;

        @include media-breakpoint-up(xxxl) {
            flex-grow: 1;
        }
    }
</style>