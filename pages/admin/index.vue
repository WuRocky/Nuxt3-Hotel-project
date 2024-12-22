<script setup>
definePageMeta({
  middleware: ["auth", "admin"],
  layout: 'admin'
});



</script>

<template>
  <div class="container mt-12">
      <div class="row">
          <AdminNews/>
          <AdminCulinary/>
          <AdminRooms />
          <AdminOrders />
      </div>
  </div>
</template>

<style lang='scss' scoped>

</style>