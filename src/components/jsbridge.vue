<template>
  <div class="form-container h-full w-full items-center align-middle">
    <Spinner />
  </div>
</template>

<script>
import { onMounted } from "vue";
import Spinner from "./common/Spinner.vue";

export default {
  name: "JsBridge",
  components: {
    Spinner,
  },
};
</script>

<style>
.align-middle {
  margin-top: 20rem !important;
}
</style>
