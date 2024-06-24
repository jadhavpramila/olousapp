<template>
  <Suspense>
    <template #default>
      <ArticleChild />
    </template>
    <template #fallback>
      <ArticleSkeleton />
    </template>
  </Suspense>
</template>

<script>
import ArticleChild from "./ArticleChild.vue";
import ArticleSkeleton from "./ArticleSkeleton.vue";

export default {
  name: "Article",
  inheritAttrs: false,
  components: {
    ArticleChild,
    ArticleSkeleton,
  },

  setup() {},
};
</script>
