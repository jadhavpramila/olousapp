<template>
  <div class="flex items-center justify-center">
    <ProgressSpinner style="width: 50px; height: 50px" />
  </div>
</template>

<script>
import ProgressSpinner from "primevue/progressspinner";
export default {
  name: "Spinner",
  components: {
    ProgressSpinner,
  },
};
</script>

<style scoped></style>
