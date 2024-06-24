<template>
  <Suspense>
    <template #default>
      <CompanyWebsiteChild :slug="getCompanySlug()" />
      <!-- <CompanyWebsiteSkeleton/> -->
    </template>
    <template #fallback>
      <CompanyWebsiteSkeleton />
    </template>
  </Suspense>
</template>

<script>
import CompanyWebsiteChild from "./CompanyWebsiteChild.vue";
import CompanyWebsiteSkeleton from "./CompanyWebsiteSkeleton.vue";
import { useRoute } from "vue-router";

export default {
  name: "CompanyWebsite",
  inheritAttrs: false,
  components: {
    CompanyWebsiteChild,
    CompanyWebsiteSkeleton,
  },

  setup(props, context) {
    const route = useRoute();

    function getCompanySlug() {
      return route.params.slug;
    }

    return {
      getCompanySlug,
    };
  },
};
</script>
