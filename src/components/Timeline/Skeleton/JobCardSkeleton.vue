<template>
  <div class="grid lg:grid-cols-1 md:grid-cols-1 grid-cols-1 gap-3">
    <div class="" v-for="index in 2" :key="index">
      <div
        class="app-bg-color-secondary rounded-md p-4 text-[#333333] cursor-pointer mb-3"
      >
        <div class="job-card-container">
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
              <p class="font-medium text-sm w-full truncate mb-3 mt-1">
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
</template>
<script>
import Skeleton from "primevue/skeleton";

export default {
  name: "JobCardSkeleton",
  components: {
    Skeleton,
  },
};
</script>
<style>
.job-card-container {
  display: grid;
  grid-template-columns: 66px auto 120px;
}
</style>
