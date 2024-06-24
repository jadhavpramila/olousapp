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
</template>

<script>
import Skeleton from "primevue/skeleton";

export default {
  name: "BusinessSingleViewSkeleton",
  components: {
    Skeleton,
  },
};
</script>

<style></style>
