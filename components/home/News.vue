<script setup>

</script>

<template>
    <section class="news bg-primary-10 py-20 py-md-30">
        <div class="container position-relative">
            <div class="row">
                <div class="col-12 col-md-2">
                    <div class="mb-10 mb-md-0">
                        <h2 class="mb-6 mb-md-10 fs-1 fw-bold text-primary-100">
                            最新<br>消息
                        </h2>
                        <div class="deco-line" />
                    </div>
                </div>
            <div class="col-12 col-md-10 d-flex flex-column gap-10">
                <div
                class="card bg-transparent border-0"
                >
                    <div class="d-flex flex-column flex-md-row align-items-center gap-6">
                        <picture>
                            <source
                                srcset="@/assets/images/home-news-1.png"
                                media="(min-width: 576px)"
                            >
                            <img
                                src="@/assets/images/home-news-sm-1.png"
                                class="w-100 rounded-3"
                                alt="可看見海景及泳池的套房"
                            >
                        </picture>
                        <div class="card-body p-0">
                            <h3 class="card-title mb-2 mb-md-6 fw-bold">
                                秋季旅遊，豪華享受方案
                            </h3>
                            <p class="card-text text-neutral-80 fs-8 fs-md-7 fw-medium">
                                秋天就是要來場豪華的旅遊！我們為您準備了一系列的秋季特別方案，包括舒適的住宿、美食饗宴，以及精彩的活動。不論您是想來一趟浪漫之旅，還是想和家人共度美好時光，都能在這裡找到最適合的方案。
                            </p>
                        </div>
                    </div>
                </div>

                <div
                class="card bg-transparent border-0"
                >
                    <div class="d-flex flex-column flex-md-row align-items-center gap-6">
                        <picture>
                            <source
                                srcset="@/assets/images/home-news-2.png"
                                media="(min-width: 576px)"
                            >
                            <img
                                src="@/assets/images/home-news-sm-2.png"
                                class="w-100 rounded-3"
                                alt="在雙人床上的兩顆灰色枕頭"
                            >
                        </picture>
                        <div class="card-body p-0">
                            <h3 class="card-title mb-2 mb-md-6 fw-bold">
                                輕鬆住房專案
                            </h3>
                            <p class="card-text text-neutral-80 fs-8 fs-md-7 fw-medium">
                                我們知道，有時候您只是需要一個舒適的地方放鬆心情。因此，我們推出了「輕鬆住房專案」，讓您無壓力地享受住宿。不管是短期的休息，還是長期的住宿，我們都會以最貼心的服務，讓您感到賓至如歸。
                            </p>
                        </div>
                    </div>
                </div>

                <div
                class="card bg-transparent border-0"
                >
                    <div class="d-flex flex-column flex-md-row align-items-center gap-6">
                        <picture>
                            <source
                                srcset="@/assets/images/home-news-3.png"
                                media="(min-width: 576px)"
                            >
                            <img
                                src="@/assets/images/home-news-sm-3.png"
                                class="w-100 rounded-3"
                                alt="坐在沙發上的聖誕麋鹿玩偶"
                            >
                        </picture>
                        <div class="card-body p-0">
                            <h3 class="card-title mb-2 mb-md-6 fw-bold">
                                耶誕快樂，住房送禮
                            </h3>
                            <p class="card-text text-neutral-80 fs-8 fs-md-7 fw-medium">
                                聖誕節來臨，我們為您準備了特別的禮物！在聖誕期間訂房，不僅有特別優惠，還會送上我們精心準備的聖誕禮物。讓我們一起慶祝這個溫馨的節日吧！
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </section> 
</template>

<style lang="scss" scoped>
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



    .news .deco-line {
        width: 140px;
    }

    .news picture {
        --parent-witdh: 1076;
        --width: 474;
        --percent-width: calc(var(--width) / var(--parent-witdh) * 100%);
        width: var(--percent-width);
        flex-shrink: 0;

        @include media-breakpoint-down(md) {
            width: 100%;
        }
    }

    .news .container::before {
        background-image: url('@/assets/images/deco-dot-group.svg');
        content: '';
        display: block;
        position: absolute;
        top: -20px;
        right: -120px;
        width: 200px;
        height: 200px;

        @include media-breakpoint-down(md) {
            background-image: url('@/assets/images/deco-dot-group-sm.svg');
            width: 100px;
            height: 100px;
            top: -40px;
            right: 24px;
        }
    }

    .news .container::after {
        background-image: url('@/assets/images/deco-dot-group.svg');
        content: '';
        display: block;
        position: absolute;
        bottom: -200px;
        left: -100px;
        width: 200px;
        height: 200px;

        @include media-breakpoint-down(md) {
            background-image: url('@/assets/images/deco-dot-group-sm.svg');
            width: 100px;
            height: 100px;
            bottom: -140px;
            left: 24px;
        }
    }

</style>