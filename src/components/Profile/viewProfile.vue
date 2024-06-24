<template>
  <Suspense>
    <template #default>
      <div v-if="showEditProfilePage">
        <profileNew></profileNew>
      </div>
      <div v-else>
        <viewProfileChild />
      </div>
    </template>
    <template #fallback>
      <div v-if="showEditProfilePage">
        <viewProfileSkeleton />
      </div>
      <div v-else>
        <ExternalUserProfileSkeleton />
      </div>
    </template>
  </Suspense>
  <!-- <Suspense>
    <template #default>
      <profileNew />
    </template>
    <template #fallback>
      <profileNew />
    </template>
  </Suspense> -->
</template>

<script>
import viewProfileChild from "./ExternalUserProfile.vue";
import viewProfileSkeleton from "./viewProfileSkeleton.vue";
import profileNew from "./profileNew.vue";
import { useStore } from "vuex";
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";
import ExternalUserProfileSkeleton from "./ExternalUserProfileSkeleton.vue";

export default {
  name: "viewProfile",
  inheritAttrs: false,
  components: {
    viewProfileChild,
    viewProfileSkeleton,
    profileNew,
    ExternalUserProfileSkeleton,
  },

  setup(props, context) {
    const store = useStore();
    const route = useRoute();

    let showEditProfilePage = ref(false);

    let userData = computed(() => store.getters["login/getter_user"]);

    if (userData.value.slug == route.params.user_slug) {
      showEditProfilePage.value = true;
    }

    return {
      showEditProfilePage,
    };
  },
};
</script>
