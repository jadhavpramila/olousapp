<template>
  <div class="cls-activities form-container">
    <div class="flex flex-col text-white">
      <div
        class="grid lg:grid-cols-4 grid-cols-12 gap-3 pb-4"
        v-if="postData.length > 0"
      >
        <!-- Post Details -->
        <!-- {{ postData }} -->
        <div
          class="lg:col-span-3 col-span-12 mb-5"
          v-for="(allPostData, index) in postData"
          :key="index"
        >
          <!-- {{ allPostData.author.slug }} -->
          <SinglePost
            :postData="allPostData"
            :showFollowing="showFollowing"
            :post_type="post_prefix"
          />
          <!-- suggestions -->
        </div>

        <div class="lg:block hidden"></div>
      </div>

      <div v-else>
        <h1 class="text-base text-white text-[#8d8d8d]" v-if="isDataLoaded">
          No activities at present.
        </h1>
      </div>
      <div class="grid lg:grid-cols-4 grid-cols-12 gap-3 pb-4">
        <InfiniteLoading
          :comments="postData"
          @infinite="load"
          :distance="75"
          class="lg:col-span-3 col-span-12 mb-5"
        >
          <template #spinner>
            <SinglePostSkeleton></SinglePostSkeleton>
            <SinglePostSkeleton class="mt-5"></SinglePostSkeleton>
            <SinglePostSkeleton class="mt-5"></SinglePostSkeleton>
            <SinglePostSkeleton class="mt-5"></SinglePostSkeleton>
          </template>
        </InfiniteLoading>
      </div>
    </div>
  </div>
</template>
<script>
import { useStore } from "vuex";
import { ref, onBeforeMount, reactive } from "vue";
import { computed } from "vue";
import { useRoute } from "vue-router";
import SinglePost from "/src/components/Post/SinglePost.vue";
import appConstants from "/src/appConstants.js";
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
import SinglePostSkeleton from "../Post/SinglePostSkeleton.vue";

export default {
  name: "Activities",
  components: {
    SinglePost,
    InfiniteLoading,
    SinglePostSkeleton,
  },
  data() {
    return {
      post_prefix: appConstants.shape_page_postfix.POST,
      routes: appConstants.routes,
    };
  },
  setup(props) {
    const store = useStore();
    const route = useRoute();
    let userSlug = route.params.user_slug;
    let isDataLoaded = ref(false);
    let showFollowing = ref(false);

    let postData = computed(
      () => store.getters["UserProfile/getter_userActivitiesData"]
    );

    async function getPostData() {
      await store
        .dispatch("UserProfile/action_getUserActivitiesData", args)
        .then((res) => {
          args.page = res.currentPage + 1;
          if (res.next == null) {
            $state.complete();
          }
        });
    }
    let args = reactive({
      page: 1,
      offset: 0,
      limit: 10,
      slug: userSlug,
    });

    onBeforeMount(() => {
      //console.log("rounte name => ", route.name);
      let obj = {
        page: 1,
        postData: null,
      };
      store.commit("UserProfile/commit_UserActivitiesData", obj);
    });

    async function load($state) {
      // args.page = args.page + 1;
      args.offset = (args.page - 1) * args.limit;
      try {
        if (route.name == appConstants.routes.VIDEOS) {
          await store
            .dispatch("UserProfile/action_getUserChannelData", args)
            .then((res) => {
              //pageNumber.value = res.currentPage+1
              args.page = res.currentPage + 1;
              if (res.next == null) {
                $state.complete();
              }
              isDataLoaded.value = true;
            });
          $state.loaded();
        } else if (route.name == appConstants.routes.ACTIVITY) {
          await store
            .dispatch("UserProfile/action_getUserActivitiesData", args)
            .then((res) => {
              //pageNumber.value = res.currentPage+1
              args.page = res.currentPage + 1;
              if (res.next == null) {
                $state.complete();
              }
              isDataLoaded.value = true;
            });
          $state.loaded();
        }
      } catch (error) {
        $state.error();
      }
    }

    return {
      userSlug,
      isDataLoaded,
      args,
      postData,
      showFollowing,
      getPostData,
      load,
    };
  },
};
</script>
