<template>
  <div>
    <div class="md:mx-auto text-[#F2F2F2] antialiased h-full">
      <div class="bg-[#343434] h-[585px] rounded-xl">
        <!-- Header -->
        <div class="h-[64px] flex p-2 lg:px-8 lg:py-4 py-3">
          <Skeleton
            shape="circle"
            height="2.5rem"
            width="2.8rem"
            class="grow-0 bg-[##464646] mr-2.5"
          ></Skeleton>
          <div class="w-full">
            <Skeleton width="60%" class="mb-2 rounded-md"></Skeleton>
            <Skeleton
              width="45%"
              height="0.8rem"
              class="mb-2 rounded-md"
            ></Skeleton>
          </div>
        </div>

        <!-- Media -->
        <div class="mt-3.5">
          <Skeleton width="100%" height="22.1rem" animation="none"></Skeleton>
        </div>

        <!-- Footer -->
        <div class="p-2 lg:px-8 lg:py-5">
          <Skeleton
            width="80%"
            height="0.75rem"
            class="mb-2 rounded-md"
          ></Skeleton>
          <Skeleton
            width="80%"
            height="1.125rem"
            class="mb-2 rounded-md"
          ></Skeleton>

          <Skeleton
            width="30%"
            height="0.75rem"
            class="mb-2 rounded-md mt-6"
          ></Skeleton>
          <Skeleton
            width="35%"
            height="1.125rem"
            class="mb-2 rounded-md"
          ></Skeleton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Skeleton from "primevue/skeleton";

export default {
  name: "SinglePostSkeleton",
  components: {
    Skeleton,
  },
};
</script>
