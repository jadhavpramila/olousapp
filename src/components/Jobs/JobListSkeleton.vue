<template>
  <div class="cls-joblist form-container">
    <div class="flex lg:justify-center md:justify-center mb-6 w-full">
      <!-- <Skeleton class="" height="2rem" width="15%"> </Skeleton> -->
    </div>
    <div class="grid lg:grid-cols-3 md:grid-cols-4 grid-cols-12 gap-3">
      <div class="lg:col-span-3 md:col-span-3 col-span-12">
        <div class="grid grid-cols-6 gap-3">
          <div
            class="w-full app-bg-color-secondary rounded-md col-span-2 max-h-[40rem] p-3 lg:block md:block hidden"
          >
            <div class="flex items-center">
              <Skeleton width="18%" height="2.2rem"> </Skeleton>
              <Skeleton width="30%" height="1.5rem" class="ml-1"> </Skeleton>
              <div class="flex justify-end w-full">
                <Skeleton width="30%" height="1rem" class="ml-9"> </Skeleton>
              </div>
            </div>
            <div class="mt-4 flex flex-row">
              <Skeleton shape="circle" width="1rem" height="1rem"></Skeleton>
              <Skeleton width="30%" height="1rem" class="ml-2"> </Skeleton>
            </div>
            <div class="mt-4 flex flex-row">
              <Skeleton shape="circle" width="1rem" height="1rem"></Skeleton>
              <Skeleton width="50%" height="1rem" class="ml-2"> </Skeleton>
            </div>
            <div class="mt-4 flex flex-row">
              <Skeleton shape="circle" width="1rem" height="1rem"></Skeleton>
              <Skeleton width="70%" height="1rem" class="ml-2"> </Skeleton>
            </div>
            <div class="mt-5">
              <Skeleton width="70%" height="1rem" class=""> </Skeleton>
            </div>
            <div class="mt-5">
              <Skeleton
                width="100%"
                height="2.7rem"
                class="rounded-lg"
              ></Skeleton>
            </div>
            <div class="mt-5">
              <Skeleton
                width="100%"
                height="2.7rem"
                class="rounded-lg"
              ></Skeleton>
            </div>
            <div class="mt-5">
              <Skeleton
                width="100%"
                height="2.7rem"
                class="rounded-lg"
              ></Skeleton>
            </div>
            <p class="mt-5">
              <Skeleton width="100%" height="1rem"> </Skeleton>
            </p>

            <p class="mt-5">
              <Skeleton width="100%" height="1rem"> </Skeleton>
            </p>
            <p class="mt-5">
              <Skeleton width="80%" height="1rem"> </Skeleton>
            </p>
            <!-- <Filter @clickFilter="filterAllJob" />
            < -->
          </div>
          <div class="lg:col-span-4 md:col-span-4 col-span-12">
            <div class="grid lg:grid-cols-1 md:grid-cols-1 grid-cols-1 gap-3">
              <div class="" v-for="index in 4" :key="index">
                <div
                  class="app-bg-color-secondary rounded-md p-4 text-[#333333] cursor-pointer mb-3"
                >
                  <div class="job-container">
                    <div class="flex items-center">
                      <Skeleton
                        height="4rem"
                        width="30%"
                        class="lg:w-[4rem] lg:h-[4rem] md:w-[4rem] md:h-[4rem] w-[3rem] h-[3rem] rounded-md"
                      >
                      </Skeleton>
                    </div>
                    <div class="ml-2">
                      <div class="flex flex-col w-full">
                        <h1 class="font-weight-700 text-sm w-full truncate">
                          <Skeleton height="1.3rem" width="100%"> </Skeleton>
                        </h1>
                        <p
                          class="font-medium text-sm w-full truncate mb-3 mt-1"
                        >
                          <Skeleton height="0.75rem" width="50%"> </Skeleton>
                        </p>
                        <p class="text-gray-400 font-light text-xs mb-1 mt-2">
                          <Skeleton height="0.75rem" width="40%"> </Skeleton>
                        </p>
                        <div class="">
                          <p
                            class="text-black font-light lg:text-xs md:text-xs text-[0.639rem]"
                          >
                            <Skeleton height="0.75rem" width="100%"> </Skeleton>
                          </p>
                          <p
                            class="mt-1 text-black font-light lg:text-xs md:text-xs text-[0.639rem]"
                          >
                            <Skeleton height="0.75rem" width="30%"> </Skeleton>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="flex w-full flex-col justify-between items-end">
                      <Skeleton height="30%" width="30%"> </Skeleton>

                      <!-- <Skeleton height="1rem" width="70%"> </Skeleton> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="lg:block md:block hidden rounded-md"></div>
    </div>
  </div>
</template>
<script>
import Skeleton from "primevue/skeleton";

export default {
  name: "JobListSkeleton",
  components: {
    Skeleton,
  },
};
</script>
