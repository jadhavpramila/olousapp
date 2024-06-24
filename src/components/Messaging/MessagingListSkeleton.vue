<template>
  <div
    class="bg-[#fff]"
    :class="[isMobile ? 'page-height-for-msgList' : 'page-height']"
    v-if="showSkeleton()"
  >
    <div
      class="grid md:pt-4 pt-2 md:pr-6 md:pl-6 pr-3 pl-3 mb-1 pb-2 rounded-l-lg rounded-tr-lg"
    >
      <div class="wl-2.5 mb-6">
        <Skeleton class="w-1/2 py-1 bg-[#e2e2e2] rounded-md h-3"></Skeleton>
      </div>
      <div class="w-full inline-flex mb-11">
        <Skeleton shape="circle" class="w-10 h-9 bg-[#e2e2e2] align-middle" />

        <div class="w-full ml-2.5">
          <div class="inline-flex">
            <Skeleton
              class="w-56 py-1 bg-[#e2e2e2] rounded-md h-3 mb-2.5"
            ></Skeleton>
          </div>

          <Skeleton
            class="w-1/2 py-1 bg-[#e2e2e2] rounded-md h-2 mb-2.5"
          ></Skeleton>
        </div>
      </div>
      <div v-for="index in 3" class="mb-3">
        <div class="w-full inline-flex mb-2">
          <Skeleton shape="circle" class="w-10 h-9 bg-[#e2e2e2] align-middle" />

          <div class="inline-flex items-end ml-2.5 w-full">
            <Skeleton
              class="w-56 py-1 bg-[#e2e2e2] rounded-md h-5 mb-2"
            ></Skeleton>
          </div>
        </div>
        <Skeleton
          class="w-full py-1 bg-[#e2e2e2] rounded-md h-10 mb-2.5"
        ></Skeleton>
      </div>
    </div>
  </div>
</template>

<script>
import Skeleton from "primevue/skeleton";
import { useStore } from "vuex";
import { computed } from "vue";
import appConstants from "../../appConstants.js";
export default {
  name: "MessagingListSkeleton",
  components: {
    Skeleton,
  },
  setup() {
    const store = useStore();
    let isMobile = computed(() => store.getters["messaging/getter_is_mobile"]);
    let getter_device = computed(() => store.getters["login/getter_device"]);
    function showSkeleton() {
      if (
        getter_device.value == appConstants.devices.IOS ||
        getter_device.value == appConstants.devices.ANDROID
      ) {
        return false;
      } else {
        return true;
      }
    }
    return {
      isMobile,
      getter_device,
      showSkeleton,
    };
  },
};
</script>

<style>
.p-skeleton {
  background-color: #e2e2e2 !important;
}
</style>
