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
            You don't have access to this page, please login to unsubscribe
          </h1>
          <br />
          <div class="justify-center flex lg:mt-5 md:mt-5 mt-3">
            <button @click="clickLogin()" class="btn lg:w-40 md:w-40">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="flex">
      <img
        src="../../assets/403.png"
        alt=""
        class="lg:w-32 md:w-32 w-16 h-auto"
      />
    </div>
    <div class="flex items-center justify-center w-full">
      <span class="text-[#444] font-weight-600 text-lg"
        >You don't have access to this page, please
        <span class="text-[#0000ff] cursor-pointer" @click="clickLogin"
          >login</span
        >
        to unsubscribe</span
      >
    </div> -->
  </div>
</template>
<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import appConstants from "../../appConstants.js";
import { useToast } from "primevue/usetoast";
import { getCurrentEncodedURL } from "../../common/js/webUrls.js";

export default {
  name: "UnsubscribeLoginToUnsubscribe",
  components: {},
  setup() {
    const store = useStore();
    const router = useRouter();
    const toast = useToast();
    let reasonsList = computed(
      () => store.getters["unsubscribe/getter_reasonsListData"]
    );

    function clickLogin() {
      getCurrentEncodedURL();
      //router.push({ name: appConstants.routes.LOGIN });
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
      setImageHeight,
      clickLogin,
    };
  },
};
</script>
