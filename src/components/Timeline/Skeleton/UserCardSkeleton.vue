<template>
  <div
    class="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
  >
    <div v-for="index in 4" :key="index">
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
            <div class="flex flex-col justify-center items-center pt-4">
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
</template>
<script>
import Skeleton from "primevue/skeleton";

export default {
  name: "UserCardSkeleton",
  components: {
    Skeleton,
  },
};
</script>
