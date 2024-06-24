<template>
  <div
    class="app-bg-color-secondary rounded-xl text-[#333333] cursor-pointer p-3"
  >
    <div class="h-[10.188rem]">
      <div class="grid grid-cols-1 rounded-t-lg">
        <!-- <Skeleton class="" height="0.688rem" width="50%">
                          </Skeleton> -->
      </div>
    </div>
    <div class="relative h-[15.406rem] pl-5 pr-4">
      <div class="mt-[-2.094rem]">
        <Skeleton width="4.188rem" height="4.188rem"></Skeleton>
      </div>
      <div class="">
        <div class="">
          <div class="text-base font-bold leading-5 mt-[1rem]">
            <Skeleton class=""> </Skeleton>
          </div>

          <div class="text-small mt-2.5 font-bold">
            <Skeleton class=""> </Skeleton>
          </div>

          <div class="text-small mt-2.5 h-[5.313rem] overflow-hidden">
            <Skeleton class=""> </Skeleton>
          </div>
        </div>
      </div>
      <div class="absolute w-full bottom-4 pr-4">
        <div class="pr-4">
          <div
            class="text-[#000] rounded-[0.313rem] app-bg-color-secondary h-[1.688rem] text-small font-bold flex items-center justify-center"
          >
            <Skeleton class=""> </Skeleton>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="w-full">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4"
    >
      <div
        v-for="index in 2"
        :key="index"
        class="w-full app-bg-color-secondary rounded-xl text-[#333333] cursor-pointer p-3"
      >
        <div class="grid grid-cols-5 mb-2">
          <div>
            <Skeleton
              class="rounded-full p-5"
              shape="circle"
              width="1.5rem"
              height="1.5rem"
            >
            </Skeleton>
          </div>
          <div class="col-span-4">
            <Skeleton class="" height="1rem" width="70%"> </Skeleton>
            <Skeleton class="mt-1" height="0.688rem" width="50%"> </Skeleton>
          </div>
        </div>
        <div class="grid grid-cols-1 rounded-lg">
          <Skeleton
            class="rounded-xl h-40 w-full object-cover bg-[##4e4c4c]"
            src=""
            alt=""
          >
          </Skeleton>
        </div>
        <div class="grid grid-cols-4 items-center justify-between mt-2">
          <div class="col-span-3">
            <p class="">
              <Skeleton
                class="text-[#c7c7c7] font-size-14 font-light"
                height="0.688rem"
                width="100%"
              >
              </Skeleton>
              <Skeleton class="mt-1" height="0.688rem" width="70%"> </Skeleton>
            </p>
          </div>

          <div class="flex justify-end">
            <Skeleton
              class="rounded-full p-5"
              shape="circle"
              width="1rem"
              height="1rem"
            ></Skeleton>
          </div>
        </div>
      </div>
    </div>
  </div> -->
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
