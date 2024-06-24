<template>
  <div class="form-container">
    <div class="page-height flex justify-center w-full h-full">
      <div
        class="flex"
        style="max-width: 430px; max-height: 430px; margin: auto"
      >
        <img
          :src="getStaticImage('Thank+You.svg')"
          alt=""
          style="width: auto"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaymentSuccess",
  setup() {},
};
</script>

<style>
.page-height {
  height: calc(100vh - 180px) !important;
}
</style>
