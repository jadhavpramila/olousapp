<template>
  <div
    class="flex flex-col bg-[#fff] rounded-l-lg rounded-tr-lg border-r-[1px]"
    :class="[isMobile ? 'page-height-for-conList' : 'page-height']"
    v-if="showSkeleton()"
  >
    <div
      class="grid gap-3 md:pt-4 pt-2 md:pr-6 md:pl-6 pr-3 pl-3 mb-1 pb-2 rounded-tl-lg border-b-[1px]"
      :class="[getter_showNav ? 'lg:mt-0 md:mt-0 mt-20' : 'mt-14']"
    >
      <div class="wl-2.5 mb-9">
        <Skeleton class="w-1/2 py-1 bg-[#bababa] rounded-md h-3"></Skeleton>
      </div>

      <div class="inline-flex mb-9">
        <Skeleton class="w-full py-1 bg-[#bababa] rounded-3xl h-11"></Skeleton>
        <Skeleton shape="circle" class="w-12 h-11 ml-5 bg-[#bababa]" />
      </div>

      <div class="">
        <div class="mb-6">
          <Skeleton class="w-1/2 py-1 bg-[#bababa] rounded-md h-5"></Skeleton>
        </div>
        <div v-for="index in 4" class="mb-4">
          <div class="w-full inline-flex">
            <Skeleton
              shape="circle"
              class="w-12 h-11 bg-[#bababa] mr-2.5 align-middle"
            />

            <div class="w-full">
              <div class="inline-flex">
                <Skeleton
                  class="w-56 py-1 bg-[#bababa] rounded-md h-3 mb-2.5"
                ></Skeleton>
                <div class="">
                  <!-- <Skeleton
                  class="w-5 py-1 bg-[#bababa] rounded-md h-2 mb-2.5"
                ></Skeleton> -->
                </div>
              </div>

              <Skeleton
                class="w-56 py-1 bg-[#bababa] rounded-md h-2 mb-2.5"
              ></Skeleton>
              <Skeleton
                class="w-1/2 py-1 bg-[#bababa] rounded-md h-2 mb-2.5"
              ></Skeleton>
            </div>
          </div>
        </div>
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
  name: "ConversationListSkeleton",
  components: {
    Skeleton,
  },
  setup() {
    const store = useStore();
    let isMobile = computed(() => store.getters["messaging/getter_is_mobile"]);
    let getter_showNav = computed(() => store.getters["login/getter_showNav"]);
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
      getter_showNav,
      getter_device,
      showSkeleton,
    };
  },
};
</script>

<style>
.p-skeleton {
  background-color: #bababa !important;
}
</style>
