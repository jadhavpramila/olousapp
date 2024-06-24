<template>
  <div>
    <div class="form-container">
      <div
        class="lg:grid lg:grid-cols-4 md:grid md:grid-cols-4 grid-col-12 gap-3"
      >
        <div
          class="app-bg-color-secondary rounded-3xl lg:col-span-3 md:col-span-3"
        >
          <div class="px-[2rem] py-[2rem]">
            <div class="">
              <div class="grid lg:grid-cols-2 grid-cols-1 gap-8">
                <div class="relative flex items-end rounded-2xl">
                  <Skeleton height="15rem" class="rounded-2xl"> </Skeleton>
                  <!-- <img
                    src="setProductImage(products.medias)"
                    alt=""
                    class="h-[15rem] w-full object-cover rounded-2xl"
                  /> -->
                </div>

                <div class="mt-1">
                  <h1 class="mb-2 text-lg text-white font-medium">
                    <Skeleton height="1rem" class="rounded"> </Skeleton>
                  </h1>
                  <h1 class="mb-2 text-lg text-white font-medium">
                    <Skeleton height="1rem" class="rounded" width="75%">
                    </Skeleton>
                  </h1>
                  <!-- <h1 class="mb-2 text-lg text-white font-medium">
                    <Skeleton height="1rem" class="rounded" width="50%">

                    </Skeleton>
                  </h1> -->
                  <div class="mb-4">
                    <span class="text-xs text-[#f0f0f0] font-medium"> </span>
                  </div>
                  <div>
                    <p class="text-white font-light text-sm cursor-pointer">
                      <Skeleton height="0.75rem"> </Skeleton>
                    </p>
                  </div>
                  <div class="mt-16">
                    <Skeleton height="2rem" width="25%"> </Skeleton>
                  </div>
                </div>
              </div>
              <div class="grid grid-col-1">
                <div class="mt-7">
                  <p class="font-extralight mb-2 text-[#fff] text-sm">
                    <Skeleton height="0.75rem"> </Skeleton>
                  </p>
                  <p class="font-extralight mb-2 text-[#fff] text-sm">
                    <Skeleton height="0.75rem"> </Skeleton>
                  </p>
                  <p class="font-extralight mb-2 text-[#fff] text-sm">
                    <Skeleton height="0.75rem"> </Skeleton>
                  </p>
                  <p class="font-extralight mb-2 text-[#fff] text-sm">
                    <Skeleton height="0.75rem" width="50%"> </Skeleton>
                  </p>

                  <div class="mb-4">
                    <span class="text-xs text-[#f0f0f0] font-medium"></span>
                  </div>
                </div>
              </div>
              <div
                class="grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-4 mt-3"
              >
                <div v-for="index in 4" :key="index">
                  <Skeleton height="13rem" class="rounded-lg"> </Skeleton>
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

export default {
  name: "ProductDetailsSkeleton",
  components: {
    Skeleton,
  },
};
</script>
