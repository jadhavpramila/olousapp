<template lang="">
  <div class="form-container">
    <div
      class="max-w-full mx-4 md:mx-auto bg-[#1C1C1C] text-[#F2F2F2] antialiased relative"
    >
      <div class="flex flex-col items-center space-y-[3rem]">
        <!-- logo -->
        <div class="flex flex-col items-center space-y-3 w-full">
          <span class="space-x-3 items-center">
            <Skeleton
              class="rounded-md mb-3"
              width="12.9rem"
              height="3rem"
            ></Skeleton>
          </span>
          <h1 class="text-lg text-center tracking-wide w-2/5">
            <Skeleton class="rounded-md" height="1.2rem"></Skeleton>
          </h1>
        </div>
        <!-- input for search -->
        <div
          class="items-center w-full md:w-1/2 h-[2.5rem] bg-[#343434] rounded-md"
        >
          <Skeleton
            class="mb-2 rounded-l-md px-4 h-[2.5rem] lg:w-[90%] md:w-[90%] sm:w-[88%] w-[85%]"
          ></Skeleton>
        </div>
        <h3
          class="flex flex-col items-center justify-center w-full md:w-1/2 rounded-md"
        >
          <Skeleton class="mb-2.5 rounded-md"></Skeleton>
          <!-- <Skeleton class="mb-2.5 rounded-md "></Skeleton> -->
          <Skeleton class="rounded-md" width="50%"></Skeleton>
        </h3>

        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-4 overflow-auto pb-[3rem] w-full"
        >
          <div
             v-for="index in 9" :key="index"
            class="relative flex items-center justify-center w-full h-[18.68rem] bg-[#464646] bg-no-repeat rounded-[1.4rem]"
          >
            <!-- play button -->
            <div
              class="flex items-center justify-center w-12 h-12 bg-gray-900 bg-opacity-90 rounded-full cursor-pointer"
            >

            </div>
          </div>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
import Skeleton from "primevue/skeleton";

export default {
  name: "HomeSkeleton",
  components: {
    Skeleton,
  },
};
</script>
