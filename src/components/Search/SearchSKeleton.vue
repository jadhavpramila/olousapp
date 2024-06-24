<template>
  <div class="form-container">
    <div
      class="max-w-[80rem] md:mx-auto bg-[#fff] text-[#F2F2F2] antialiased pb-[3rem] h-full"
    >
      <div class="items-center justify-between">
        <div class="lg:hidden md:hidden block mb-5">
          <Skeleton class="w-full py-1 bg-[#343434] rounded-md h-9"></Skeleton>
        </div>
        <div class="">
          <div class="flex lg:justify-between md:justify-between">
            <div class="flex overflow-x-auto space-x-5 pb-0 mb-5">
              <Skeleton
                class="w-32 py-1 bg-[#343434] rounded-md h-9"
              ></Skeleton>
              <Skeleton
                class="w-32 py-1 bg-[#343434] rounded-md h-9"
              ></Skeleton>
              <Skeleton
                class="w-32 py-1 bg-[#343434] rounded-md h-9"
              ></Skeleton>
            </div>
            <div class="lg:block md:block hidden">
              <Skeleton
                class="w-[23.5rem] py-1 bg-[#343434] rounded-md h-9"
              ></Skeleton>
            </div>
          </div>

          <div class="flex-col md:flex-row justify-between">
            <div class="space-y-6" v-if="isShowSubFilter()">
              <div class="flex space-x-10 w-full pb-5 overflow-x-auto">
                <Skeleton class="rounded-md w-8"></Skeleton>
                <Skeleton class="rounded-md w-[5rem]"></Skeleton>
                <Skeleton class="rounded-md w-[5rem]"></Skeleton>
              </div>
            </div>
            <div class="w-full">
              <div
                v-if="!isPeopleSearch() && !isShowBusiness()"
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
              >
                <div v-for="index in 12" :key="index">
                  <div class="w-full">
                    <!-- Content -->
                    <div class="flex flex-col">
                      <div
                        class="h-[18rem] sm:h-[13rem] md:h-[13rem] lg:h-[13rem] rounded-t-lg bg-[#464646] flex items-center justify-center"
                      ></div>
                      <div
                        class="h-[7rem] rounded-b-lg bg-[#343434] flex flex-col justify-between p-2"
                      >
                        <div class="flex">
                          <div class="w-full">
                            <Skeleton
                              width="70%"
                              height="1rem"
                              class="rounded-md mb-2"
                            ></Skeleton>
                            <Skeleton
                              width="80%"
                              height="0.75rem"
                              class="rounded-md"
                            ></Skeleton>
                          </div>
                          <!-- <div v-if="isShowContact()">
                            <Skeleton
                              shape="circle"
                              size="2rem"
                              class="grow-0 bg-[##464646] mr-2.5"
                            ></Skeleton>
                          </div> -->
                        </div>

                        <div>
                          <Skeleton
                            width="90%"
                            height="0.5rem"
                            class="rounded-md mb-2"
                          ></Skeleton>
                          <Skeleton
                            width="80%"
                            height="0.5rem"
                            class="rounded-md"
                          ></Skeleton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- End content -->

              <!-- user -->
              <div
                v-if="isPeopleSearch()"
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
              >
                <div v-for="index in 12" :key="index">
                  <div class="w-full">
                    <div class="app-bg-color-secondary h-[14.2rem] rounded-md">
                      <div class="flex flex-col justify-center py-6 px-3">
                        <div class="flex justify-center">
                          <Skeleton
                            shape="circle"
                            size="5rem"
                            class="grow-0 bg-[##464646] mr-2.5"
                          ></Skeleton>
                        </div>
                        <div
                          class="flex flex-col justify-center items-center pt-4"
                        >
                          <Skeleton
                            width="60%"
                            height="1rem"
                            class="rounded-md mb-3"
                          ></Skeleton>
                          <Skeleton
                            width="80%"
                            height="0.5rem"
                            class="rounded-md mb-3"
                          ></Skeleton>
                          <Skeleton
                            width="60%"
                            height="0.5rem"
                            class="rounded-md mb-3"
                          ></Skeleton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- user -->

              <!-- Business -->
              <div class="w-full" v-if="isShowBusiness()">
                <div
                  class="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pb-4"
                >
                  <div v-for="index in 12" :key="index" class="w-full">
                    <BusinessSingleViewSkeleton></BusinessSingleViewSkeleton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Skeleton from "primevue/skeleton";
import { useRoute } from "vue-router";
import appConstants from "../../appConstants.js";
import BusinessSingleViewSkeleton from "../Business/BusinessSingleViewSkeleton.vue";

export default {
  name: "SearchSkeleton",
  components: {
    Skeleton,
    BusinessSingleViewSkeleton,
  },
  setup() {
    const route = useRoute();

    function isShowSubFilter() {
      if (
        route.name == appConstants.routes.SEARCH_CONTENT ||
        route.name == appConstants.routes.DEFAULT_SEARCH_CONTENT
      ) {
        return true;
      } else {
        return false;
      }
    }

    function isShowBusiness() {
      if (
        route.name == appConstants.routes.SEARCH_BUSINESS ||
        route.name == appConstants.routes.DEFAULT_SEARCH_BUSINESS
      ) {
        return true;
      } else {
        return false;
      }
    }

    function isPeopleSearch() {
      if (
        route.name == appConstants.routes.SEARCH_PROFILE ||
        route.name == appConstants.routes.DEFAULT_SEARCH_PROFILE
      ) {
        return true;
      } else {
        return false;
      }
    }
    return {
      isShowSubFilter,
      isShowBusiness,
      isPeopleSearch,
    };
  },
};
</script>

<style></style>
