<script setup>
const route = useRoute();


const page = ref(route.fullPath);
</script>

<template>
  <div class="flex flex-col items-center py-24">
    <h1 class="text-6xl font-semibold text-blue-600">404 Not Found</h1>
    <p>你所請求的頁面：{{ page }}，不存在。</p>
    <NuxtLink class="btn btn-primary" to="/">返回首頁</NuxtLink>
  </div>
</template>

<style scoped>

</style>