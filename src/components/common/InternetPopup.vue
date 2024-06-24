<template>
  <div>
    <div class="h-full w-full fixed top-0 left-0 z-20" v-on:click="hide"></div>
    <div
      class="
        bg-white
        rounded-lg
        text-lg
        pt-6
        shadow-lg
        w-96
        fixed
        top-1/2
        left-1/2
        transform
        -translate-x-1/2 -translate-y-1/2
        z-30
      "
    >
      <div class="px-6 pb-6 text-center">
        <h3 class="text-xl mb-2 font-semibold">Your Options</h3>
        <p class="text-gray-600 font-light">
          You Are Offline. Please check internet Connection.
        </p>
      </div>
      <div class="cursor-pointer border-t border-gray-100 text-center">
        <button
          class="
            border-b
            text-blue-500
            border-gray-100
            w-full
            px-6
            py-3
            hover:bg-gray-100
          "
        >
          Ok
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InternetPopup",
};
</script>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s ease-out both;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse ease-in both;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
    