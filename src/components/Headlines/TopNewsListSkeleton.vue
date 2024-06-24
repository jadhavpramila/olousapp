<template>
  <div class="form-container cls-topnewslist">
    <div class="flex mb-4 justify-center">
      <span class="text-2xl font-bold">Headlines</span>
    </div>
    <div class="flex flex-col">
      <div class="grid lg:grid-cols-2 grid-cols-1 gap-4">
        <div
          v-for="index in 4"
          :key="index"
          class="md:mx-auto bg-[#343434] text-[#F2F2F2] w-full h-full rounded-lg p-3"
        >
          <div class="gap-4 grid grid-cols-6">
            <div class="col-span-2">
              <Skeleton width="144px" height="200px" class="rounded-lg">
              </Skeleton>
            </div>
            <div class="col-span-4">
              <Skeleton width="100%" height="24px"></Skeleton>
              <Skeleton width="100%" height="24px" class="mt-1.5"></Skeleton>
              <Skeleton width="50%" height="24px" class="mt-1.5"></Skeleton>

              <Skeleton width="100%" height="16px" class="mt-6"></Skeleton>
              <Skeleton width="100%" height="16px" class="mt-1.5"></Skeleton>
              <Skeleton width="100%" height="16px" class="mt-1.5"></Skeleton>
              <Skeleton width="50%" height="16px" class="mt-1.5"></Skeleton>
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
  name: "TopNewsListSkeleton",
  components: { Skeleton },
  setup() {
    return {};
  },
};
</script>
