<template lang="">
  <!-- single grid card -->
  <div v-if="details">
    <!-- {{details}} -->
    <div class="mb-6">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
      >
        <div class="card-animation" v-for="detail in details">
          <ContentCard :details="detail" />
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="w-[42.8rem]">Loading data..</div>
  </div>
</template>

<script>
import appConstants from "../../appConstants.js";
import { getUUID } from "../../common/js/commonFunctions.js";
import { useRouter, useRoute } from "vue-router";
import ContentCard from "./ContentCard.vue";
export default {
  name: "Content",
  props: {
    details: Object,
  },
  components: {
    ContentCard,
  },
  setup(props, context) {
    const enum_search_response = appConstants.search_response_types;

    const router = useRouter();

    function getUUIDAsKey() {
      var res = getUUID();
      return res;
    }

    return {
      enum_search_response,
      getUUIDAsKey,
    };
  },
};
</script>
<style scoped></style>
