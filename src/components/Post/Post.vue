<template>
  <Suspense>
    <template #default>
      <PostChild :post_id="getPostID()" />
    </template>
    <template #fallback>
      <PostSkeleton />
    </template>
  </Suspense>
</template>

<script>
import PostChild from "./PostChild.vue";
import PostSkeleton from "./PostSkeleton.vue";
import { useRoute } from "vue-router";
import appConstants from "../../appConstants.js";

export default {
  name: "Post",
  inheritAttrs: false,
  components: {
    PostChild,
    PostSkeleton,
  },

  setup(props, context) {
    const route = useRoute();

    function getPostID() {
      let titleStr = route.params.post_id;
      let post_id = titleStr.split(appConstants.url_separator).pop();
      return post_id;
    }

    return {
      getPostID,
    };
  },
};
</script>
