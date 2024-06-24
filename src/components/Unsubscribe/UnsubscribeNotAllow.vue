<template>
  <div class="flex justify-center">
    <div class="max-w-full">
      <!-- <Nav /> -->
      <div class="flex justify-center relative" style="">
        <img
          src="/src/assets/Block.png"
          alt=""
          style="width: auto"
          :style="{ height: setImageHeight() }"
        />
        <div class="absolute top-1/3 ml-6">
          <h1
            class="lg:text-[7rem] md:text-[4.5rem] text-[3rem] font-medium lg:mb-10 text-black text-center"
          >
            403
          </h1>
          <br />
          <h1
            class="lg:mt-0 md:mt-2 mt-0 text-base font-medium text-black text-center"
          >
            You don't have access to this page
          </h1>
          <br />
          <div class="justify-center flex lg:mt-5 md:mt-5 mt-3">
            <button @click="goToHome()" class="btn lg:w-40 md:w-40">
              Go To Home
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import appConstants from "../../appConstants.js";
import { useToast } from "primevue/usetoast";

export default {
  name: "UnsubscribeNotAllow",
  components: {},
  setup() {
    const store = useStore();
    const router = useRouter();
    const toast = useToast();
    let reasonsList = computed(
      () => store.getters["unsubscribe/getter_reasonsListData"]
    );

    function goToHome() {
      router.push({ name: appConstants.routes.HOME });
    }
    function setImageHeight() {
      let width = 640;
      if (window.innerWidth > width) {
        let window_height = window.innerHeight;
        let imageHeight = window_height - 254 + "px";
        return imageHeight;
      } else {
        return "auto";
      }
    }

    onMounted(() => {});
    return {
      goToHome,
      setImageHeight,
    };
  },
};
</script>
