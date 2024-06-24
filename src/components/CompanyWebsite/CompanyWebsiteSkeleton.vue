<template>
  <div class="cls-companywebsite form-container">
    <div class="grid grid-cols-1">
      <div class="bg-[#f2f2f2] rounded-3xl p-7">
        <div class="bg-[#fff] rounded-xl">
          <div class="relative flex lg:items-center md:items-center items-end">
            <div
              class="bg-[#ffffff] rounded-[1.25rem] lg:m-8 md:m-8 m-3 w-full"
            >
              <Skeleton
                class="lg:h-[11.25rem] md:h-[11.25rem] h-[5rem] rounded-[1.25rem] object-contain"
                height="8.5rem"
              >
              </Skeleton>
            </div>
          </div>
          <div
            class="grid md:grid-cols-2 lg:grid-cols-2 grid-cols-1 lg:px-8 md:px-8 px-4 lg:py-5 md:py-5 py-3"
          >
            <div class="space-y-3">
              <h1 class="">
                <Skeleton
                  class="text-white font-medium text-xl cursor-pointer"
                  height="1rem"
                  width="70%"
                >
                </Skeleton>
              </h1>
              <p class="">
                <Skeleton
                  class="text-[#c7c7c7] font-size-14 font-light"
                  height="0.688rem"
                  width="50%"
                >
                </Skeleton>
              </p>
              <p class="">
                <Skeleton
                  class="text-[#c7c7c7] font-size-14"
                  height="0.688rem"
                  width="40%"
                >
                </Skeleton>
              </p>

              <p class="">
                <Skeleton
                  class="text-[#c7c7c7] font-size-14"
                  height="0.688rem"
                  width="70%"
                >
                </Skeleton>
              </p>
            </div>
            <div
              class="flex lg:justify-end md:justify-end justify-start lg:mt-0 md:mt-0 mt-3 flex-row lg:items-start md:items-start items-center lg:space-x-6 md:space-x-6 space-x-2"
            >
              <div>
                <!-- <Skeleton
                  class="rounded-3xl w-24"
                  id="btnFollow"
                  height="2.25rem"
                  width="25%"
                >
                </Skeleton> -->
              </div>

              <Skeleton
                class="rounded-full p-5"
                shape="circle"
                width="1rem"
                height="1rem"
              >
              </Skeleton>
              <Skeleton
                class="rounded-full p-5"
                shape="circle"
                width="1rem"
                height="1rem"
              >
              </Skeleton>
              <!-- <Skeleton
                  class="rounded-full p-5"
                  shape="circle"
                  width="1rem"
                  height="1rem"
                >
                </Skeleton> -->
            </div>
          </div>
        </div>
        <div class="py-5">
          <div class="grid lg:grid-cols-6 my-5">
            <div class="col-span-3">
              <div class="grid grid-cols-3 gap-8">
                <div v-for="index in 2" :key="index">
                  <Skeleton class="" height="2.25rem" width="100%"></Skeleton>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div
              class="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-1 gap-4 mt-10"
            >
              <div v-for="index in 4" :key="index">
                <BusinessSingleViewSkeleton></BusinessSingleViewSkeleton>
                <!-- <div
                  class="bg-[#464646] h-[10.25rem] w-full rounded-t-xl"
                ></div>
                <div class="bg-[#343434] w-full rounded-b-xl h-[5rem]">
                  <div class="flex flex-col px-2">
                    <h1 class="pt-2">
                      <Skeleton height="0.625rem" width="75%"> </Skeleton>
                    </h1>

                    <h1 class="pt-2">
                      <Skeleton height="0.625rem" width="50%"> </Skeleton>
                    </h1>
                    <button class="pt-3">
                      <Skeleton
                        height="1.625rem"
                        width="35%"
                        class="rounded-lg"
                      >
                      </Skeleton>
                    </button>
                  </div>
                </div> -->
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
import BusinessSingleViewSkeleton from "../Business/BusinessSingleViewSkeleton.vue";

export default {
  name: "CopmanyWebsiteSkeleton",
  components: {
    Skeleton,
    BusinessSingleViewSkeleton,
  },
};
</script>
