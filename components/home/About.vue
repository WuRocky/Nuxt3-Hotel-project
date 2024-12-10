<script setup>

</script>

<template>
    <section class="about position-relative z-n1 bg-neutral-120 py-20 py-md-30">
        <div class="container p-0">
            <div class="about-content p-6 p-md-20 mt-10 ms-10 me-5 mt-md-20 mx-md-auto text-neutral-0">
                <div class="d-flex align-items-center gap-10 mb-10 mb-md-20">
                    <h2 class="text-nowrap mb-0 fs-1 fw-bold">
                    關於<br>我們
                    </h2>
                    <div class="deco-line" />
                </div>
                <div class="d-flex flex-column gap-4 gap-md-10 fw-medium">
                    <p class="mb-0 fs-8 fs-md-7">
                    享樂酒店，位於美麗島高雄的心臟地帶，是這座城市的璀璨瑰寶與傲人地標。
                    <br>
                    我們的存在，不僅僅是為了提供奢華的住宿體驗，更是為了將高雄的美麗與活力，獻給每一位蒞臨的旅客。
                    </p>
                    <p class="mb-0 fs-8 fs-md-7">
                    我們的酒店，擁有時尚典雅的裝潢，每一個細節都充滿著藝術與設計的精緻。
                    <br>
                    我們的員工，都以熱情的服務與專業的態度，讓每一位客人都能感受到賓至如歸的溫暖。
                    </p>
                    <p class="mb-0 fs-8 fs-md-7">
                    在這裡，您可以遙望窗外，欣賞高雄的城市景色，感受這座城市的繁華與活力；您也可以舒適地坐在我們的餐廳，品嚐精緻的佳餚，體驗無與倫比的味覺盛宴。
                    </p>
                    <p class="mb-0 fs-8 fs-md-7">
                    享樂酒店，不僅是您在高雄的住宿之選，更是您感受高雄魅力的最佳舞台。我們期待著您的蒞臨，讓我們共同編織一段難忘的高雄故事。
                    </p>
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


    .about {
        background-image: url('@/assets/images/home-about.png');
        height: 992px;
        background-position-y: 120px;
        background-repeat: no-repeat;

        @include media-breakpoint-down(md) {
            background-position-y: 80px;
            height: 794px;
        }
    }

    .about-content {
        max-width: 1044px;
        background-image: linear-gradient(180deg, rgba(20, 15, 10, 0.8) 0%, rgba(190, 156, 124, 0.8) 100%);
        backdrop-filter: blur(10px);
        border-width: 0px 0px 1px 1px;
        border-style: solid;
        border-color: #FFFFFF;
        border-radius: 80px 80px 0px 80px;
        transform: translateX(7vw);

        @include media-breakpoint-down(md) {
            height: 594px;
            border-radius: 40px 40px 0px 40px;
            transform: none;
        }
    }

    .about-content .deco-line {
        width: 165px;
        background: #fff;

        @include media-breakpoint-down(md) {
            width: 161px;
        }
    }


</style>