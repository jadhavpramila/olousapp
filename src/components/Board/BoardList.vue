<template>
  <Suspense>
    <template #default>
      <BoardListChild />
    </template>
    <!-- <template #fallback>
      <BoardListSkeleton />
    </template> -->
  </Suspense>
</template>

<script>
import BoardListChild from "./BoardListChild.vue";
import BoardListSkeleton from "./BoardListSkeleton.vue";
export default {
  name: "BoardList",
  inheritAttrs: false,
  components: { BoardListChild, BoardListSkeleton },
};
</script>
