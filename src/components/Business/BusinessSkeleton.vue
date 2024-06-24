<template>
  <div class="form-container">
    <div class="flex justify-center">
      <!-- <h1 class="lg:text-3xl md:text-3xl text-xl text-white font-weight-700"> -->
      <!-- Business -->
      <Skeleton class="mt-1" height="1rem" width="50%"> </Skeleton>
      <!-- </h1> -->
    </div>
    <div class="grid grid-cols-1 gap-3 pb-4 mt-6">
      <div class="">
        <div class="w-full">
          <div class="grid lg:grid-cols-4 grid-cols-1 gap-3 pb-4">
            <div class="lg:col-span-4 col-span-12">
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
</template>

<script>
import Skeleton from "primevue/skeleton";
import BusinessSingleViewSkeleton from "./BusinessSingleViewSkeleton.vue";

export default {
  name: "BusinessSkeleton",
  components: {
    Skeleton,
    BusinessSingleViewSkeleton,
  },
};
</script>

<style></style>
