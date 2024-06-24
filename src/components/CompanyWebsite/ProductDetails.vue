<template>
  <Suspense>
    <template #default>
      <!-- <ProductDetailsSkeleton/> -->
      <ProductDetailsChild :product_id="getProductId()" />
    </template>
    <template #fallback>
      <ProductDetailsSkeleton />
    </template>
  </Suspense>
</template>

<script>
import ProductDetailsChild from "./ProductDetailsChild.vue";
import ProductDetailsSkeleton from "./ProductDetailsSkeleton.vue";
import { useRoute } from "vue-router";

export default {
  name: "CompanyWebsite",
  inheritAttrs: false,
  components: {
    ProductDetailsChild,
    ProductDetailsSkeleton,
  },

  setup(props, context) {
    const route = useRoute();

    function getProductId() {
      return route.params.product_id;
    }

    return {
      getProductId,
    };
  },
};
</script>
