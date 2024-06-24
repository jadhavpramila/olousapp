<template>
  <Suspense>
    <template #default>
      <!-- <BoardDetailsSkeleton /> -->
      <BoardDetailsChild />
    </template>
    <template #fallback>
      <BoardDetailsSkeleton />
    </template>
  </Suspense>
</template>

<script>
import BoardDetailsChild from "./BoardDetailsChild.vue";
import BoardDetailsSkeleton from "./BoardDetailsSkeleton.vue";
export default {
  name: "BoardDetails",
  inheritAttrs: false,
  components: { BoardDetailsChild, BoardDetailsSkeleton },
};
</script>
