<script setup>
const config = useRuntimeConfig();
const apiUrl = config.public.apiUrl
const { data } = await useFetch(`${apiUrl}api/v1/home/culinary/`);
</script>

<template>
    <section class="delicacy position-relative py-20 py-md-30 bg-primary-10">
        <div class="container">
            <div class="d-flex align-items-center gap-10 mb-10 mb-md-20">
                <h2 class="mb-0 fs-1 fw-bold text-primary-100">
                    佳餚<br>美饌
                </h2>
                <div class="deco-line" />
            </div>

            <div class="row flex-nowrap overflow-x-auto">
                <div class="col-10 col-md-6 col-xl-4" v-for="delicacy in data.result" :key="delicacy._id">
                  <div class="card position-relative border-0 rounded-3">
                    <picture>
                      <source :srcset="delicacy.image" media="(min-width: 576px)">
                      <img :src="delicacy.image" :alt="delicacy.title">
                    </picture>
                    <div class="card-body position-absolute bottom-0 p-4 p-md-6 rounded-bottom-3  text-neutral-0">
                      <div class="d-flex justify-content-between align-items-center mb-4 mb-md-6">
                        <h5 class="card-title mb-0 fw-bold">
                          {{ delicacy.title }}
                        </h5 >
                        <div class="d-flex justify-content-between gap-4 text-neutral-40 fs-8 fs-md-7">
                          <span class="fw-bold">{{ delicacy.diningTime.match(/[A-Z\-]+/g)?.[0] || '' }}</span>
                          <span class="fw-bold">{{ delicacy.diningTime.match(/\d{2}:\d{2}-\d{2}:\d{2}/g)?.[0] || '' }}</span>
                        </div>
                      </div>
                      <p class="card-text fs-8 fs-md-7">
                        {{ delicacy.description }}
                      </p>
                    </div>
                  </div>
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

    .delicacy::before {
        @include media-breakpoint-up(lg) {
            position: absolute;
            top: -40px;
            right: 80px;
            content: '';
            width: 200px;
            height: 200px;
            background-image: url('../assets/images/deco-dot-group.svg');
        }
    }

    .delicacy::after {
        @include media-breakpoint-up(xxxl) {
            position: absolute;
            top: 55px;
            left: 40px;
            content: '';
            width: 187px;
            height: 1068px;
            background-image: url('@/assets/images/deco-line-group-vertical.svg');
        }
    }

    .delicacy .deco-line {
        width: 200px;

        @include media-breakpoint-up(md) {
            width: 167px;
        }
        }

        .delicacy .card-body {
        background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #140F0A 77.6%);
        backdrop-filter: blur(10px);
    }

</style>