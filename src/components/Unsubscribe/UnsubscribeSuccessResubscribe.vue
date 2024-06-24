<template>
  <div class="flex flex-row justify-center">
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
          <!-- <h1
            class="lg:text-[7rem] md:text-[4.5rem] text-[3rem] font-medium lg:mb-10 text-white text-center"
          >
            403
          </h1>
          <br /> -->
          <h1
            class="lg:mt-8 md:mt-2 mt-0 text-base font-medium text-black text-center"
          >
            You have been successfully unsubscribed.
            <br />
            Didn't mean to unsubscribe? You can re-subscribe in your settings
          </h1>
          <br />
          <div class="justify-center flex lg:mt-5 md:mt-5 mt-3">
            <button @click="goToSetting()" class="btn lg:w-40 md:w-40">
              Settings
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
  name: "UnsubscribeSuccessResubscribe",
  components: {},
  setup() {
    const store = useStore();
    const router = useRouter();
    const toast = useToast();
    let reasonsList = computed(
      () => store.getters["unsubscribe/getter_reasonsListData"]
    );

    function goToSetting() {
      router.push({ name: appConstants.display_route_Name.SETTINGS });
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
      goToSetting,
      setImageHeight,
    };
  },
};
</script>
