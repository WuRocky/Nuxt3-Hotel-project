<script setup>

</script>

<template>
    <section class="transportation  bg-neutral-120">
        <div class="container pt-20 pb-10 pt-md-30 pb-md-20">
            <div class="d-flex align-items-center gap-10 mb-10 mb-md-20">
                <h2 class="mb-0 fs-1 fw-bold text-primary-100">
                    交通<br>方式
                </h2>
                <div class="deco-line" />
            </div>
            <div class="row gap-6 gap-md-0">
                <div class="col-12 mb-md-10">
                    <p class="text-neutral-40 fw-bold">
                        台灣高雄市新興區六角路123號
                    </p>
                    <picture>
                        <source
                            srcset="@/assets/images/home-map.png"
                            media="(min-width: 576px)"
                        >
                        <img
                            class="w-100"
                            src="@/assets/images/home-map-sm.png"
                            alt="描述地圖中酒店所在的位置"
                        >
                    </picture>
                </div>
                <div class="col-12 col-md-4 text-neutral-0">
                    <Icon
                        class="mb-2 mb-md-4 display-1 text-primary-100"
                        icon="ic:baseline-directions-car"
                    />
                    <h5 class="fs-7 fs-md-5 fw-bold">
                        自行開車
                    </h5>
                    <p class="mb-0 fs-8 fs-md-7">
                        如果您選擇自行開車，可以透過國道一號下高雄交流道，往市區方向行駛，並依路標指示即可抵達「享樂酒店」。飯店內設有停車場，讓您停車方便。
                    </p>
                </div>
                <div class="col-12 col-md-4 text-neutral-0">
                    <Icon
                        class="mb-2 mb-md-4 display-1 text-primary-100"
                        icon="ic:baseline-train"
                    />
                    <h5 class="fs-7 fs-md-5 fw-bold">
                        高鐵/火車
                    </h5>
                    <p class="mb-0 fs-8 fs-md-7">
                        如果您是搭乘高鐵或火車，可於左營站下車，外頭有計程車站，搭乘計程車約20分鐘即可抵達。或者您也可以轉乘捷運紅線至中央公園站下車，步行約10分鐘便可抵達。
                    </p>
                </div>
                <div class="col-12 col-md-4 text-neutral-0">
                    <Icon
                        class="mb-2 mb-md-4 display-1 text-primary-100"
                        icon="mdi:car-side"
                    />
                    <h5 class="fs-7 fs-md-5 fw-bold">
                        禮賓車服務
                    </h5>
                    <p class="mb-0 fs-8 fs-md-7">
                        承億酒店提供禮賓專車接送服務，但因目的地遠近會有不同的收費，請撥打電話將由專人為您服務洽詢專線：(07)123-4567
                    </p>
                </div>
            </div>
        </div>
        <picture>
            <source
                srcset="@/assets/images/deco-line-group-horizontal-full.svg"
                media="(min-width:576px)"
            >
            <img
                class="w-100"
                src="@/assets/images/deco-line-group-horizontal-sm.svg"
                alt="deco-line-group"
            >
        </picture>
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

.transportation .deco-line {
    width: 161px;

    @include media-breakpoint-down(md) {
        width: 194px;
    }
}
</style>