<template>
  <div class="form-container">
    <div
      class="md:mx-auto bg-[#1C1C1C] text-[#F2F2F2] antialiased pb-[2rem] h-full"
    >
      <div class="text-white">
        <div class="grid lg:grid-cols-12 grid-cols-12 gap-3">
          <div class="lg:col-span-8 col-span-12 mb-3 place-items-center">
            <!-- <button class="btn btn-white h-14 mb-2" @click="openPostModal">
              <span>+</span> Create Post popup
            </button> -->
            <div class="flex mb-4 w-auto">
              <button
                v-if="!isShowSkeleton"
                class="border hover-buildCV hover-effect inline-flex items-center justify-center mr-3 px-4 rounded-lg text-lg w-auto py-1"
                @click="clickJobs"
              >
                <img
                  src="/src/assets/Job-Button.svg"
                  alt="Job-Button"
                  class="mr-2"
                />
                <span class="">Jobs</span>
              </button>
              <button
                v-if="!isShowSkeleton"
                class="border hover-buildCV hover-effect inline-flex items-center justify-center mr-3 px-4 rounded-lg text-lg w-auto py-1"
                @click="clickBusiness"
              >
                <img
                  src="/src/assets/Business.svg"
                  alt="Job-Button"
                  class="mr-2"
                />
                <span class="">Business</span>
              </button>
              <button
                v-if="!isShowSkeleton"
                class="border hover-buildCV hover-effect inline-flex items-center justify-center mr-3 px-4 rounded-lg text-lg w-auto py-1"
                @click="clickArticle"
              >
                <img
                  :src="getStaticImage('Article_white.svg')"
                  alt="Job-Button"
                  class="mr-2"
                />
                <span class="">Articles</span>
              </button>
              <div v-if="isShowSkeleton" class="flex">
                <Skeleton
                  class="rounded-lg lg:w-32 w-16 mr-3"
                  height="2rem"
                ></Skeleton>
                <Skeleton
                  class="rounded-lg lg:w-32 w-16 mr-3"
                  height="2rem"
                ></Skeleton>
                <Skeleton
                  class="rounded-lg lg:w-32 w-16"
                  height="2rem"
                ></Skeleton>
              </div>
            </div>

            <!-- <router-link :to="routes.CREATEPOST"> -->
            <button
              v-if="!isShowSkeleton"
              class="hover-effect flex h-12 w-full items-center justify-center rounded-xl cursor-pointer w-full"
              @click="openPostModal()"
              :class="[isShow ? 'hide-create-post' : 'show-create-post']"
            >
              <img
                :src="getStaticImage('Plus_icon.svg')"
                class="mr-2"
                alt=""
                srcset=""
              /><span class="text-base font-semibold">Create Post </span>
            </button>
            <!-- <button
              v-if="!isShowSkeleton"
              class="mt-2 button button_three flex h-14 w-full items-center justify-center rounded-xl mb-2 cursor-pointer w-full"
              @click="openPostModal()"
              :class="[isShow ? 'hide-create-post' : 'show-create-post']"
            >
              <img
                src="../../assets/Plus-icon.svg"
                class="mr-2"
                alt=""
                srcset=""
              /><span class="text-base font-semibold">Create Post </span>
            </button> -->
            <!-- <button
              class="button button_three flex h-14 w-full items-center justify-center rounded-xl mb-2 cursor-pointer w-full"
            >
              Button Three
            </button> -->
            <!-- <div
              v-if="!isShowSkeleton"
              class="flex bg-[#f2f2f2] h-14 items-center justify-center rounded-xl mb-2 cursor-pointer"
              @click="openPostModal()"
              :class="[isShow ? 'hide-create-post' : 'show-create-post']"
            >
              <img
                src="../../assets/Plus-icon.svg"
                class="mr-2"
                alt=""
                srcset=""
              /><span class="text-base font-semibold text-black"
                >Create Post
              </span>
            </div> -->
            <div v-if="isShowSkeleton">
              <Skeleton
                class="rounded-xl"
                width="100%"
                height="3rem"
              ></Skeleton>
            </div>
            <div class="flex flex-col w-full" v-if="!isShowSkeleton">
              <CurrentTopNews
                :topNewsList="topNewsList"
                :key="getKey()"
              ></CurrentTopNews>
            </div>
            <div class="flex flex-col w-full mt-10" v-if="isShowSkeleton">
              <div class="lg:block md:block sm:hidden hidden">
                <div class="grid grid-cols-6 gap-2">
                  <div v-for="index in 6" :key="index">
                    <Skeleton
                      height="145px"
                      width="96px"
                      style="border-radius: 10px"
                    >
                    </Skeleton>
                  </div>
                </div>
              </div>
              <div class="lg:hidden md:hidden sm:block block">
                <div class="grid grid-cols-3 gap-3">
                  <div v-for="index in 3" :key="index">
                    <Skeleton
                      height="145px"
                      width="96px"
                      style="border-radius: 10px"
                    >
                    </Skeleton>
                  </div>
                </div>
              </div>
            </div>
            <!-- <button class="mr-2" id="fade-in" @click="fadeIn()">Fade In</button>
            <button id="fade-out" @click="fadeOut()">Fade Out</button>

            <div id="block">
              <CreatePost />
            </div> -->
            <!-- <button id="slid" @click="slidBtn()">Slide</button> -->
            <div v-if="isShow">
              <CreatePost @close="closeModal" />
            </div>
            <!-- </router-link> -->
          </div>
        </div>
        <!-- {{ postData}} -->
        <div>
          <div class="flex flex-col">
            <div class="grid lg:grid-cols-12 grid-cols-12 gap-3 pb-4">
              <!-- Post Details -->
              <div
                class="lg:col-span-8 col-span-12 mb-1"
                v-for="(allPostData, index) in postData"
                :key="index"
              >
                <!-- <pre> -->
                <!-- {{ allPostData.medias }} -->
                <!-- </pre> -->
                <SinglePost
                  :postData="allPostData"
                  :showFollowing="showFollowing"
                  :post_type="post_prefix"
                />
                <!-- suggestions -->
              </div>
              <div v-if="isShowSkeleton" class="lg:col-span-8 col-span-12 mb-1">
                <SinglePostSkeleton></SinglePostSkeleton>
              </div>
              <div class="lg:block hidden"></div>
            </div>
            <!-- <div v-if="isShowSkeleton" class="w-full" style="width=100%">
              <SinglePostSkeleton></SinglePostSkeleton>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SinglePost from "/src/components/Post/SinglePost.vue";
import appConstants from "/src/appConstants.js";
import { useStore, mapGetters, mapActions } from "vuex";
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
import { ref, watchEffect, onBeforeMount, reactive, onMounted } from "vue";
import { computed } from "vue";
import SinglePostSkeleton from "../Post/SinglePostSkeleton.vue";
import CreatePost from "./CreatePost.vue";
import { useRouter, useRoute } from "vue-router";
import Skeleton from "primevue/skeleton";
import CurrentTopNews from "../Headlines/CurrentTopNews.vue";
import { getUUID } from "../../common/js/commonFunctions.js";
import { readUserTokenCookie } from "../../common/js/UserToken.js";

export default {
  name: "TimelineChild",
  components: {
    SinglePost,
    InfiniteLoading,
    SinglePostSkeleton,
    CreatePost,
    Skeleton,
    CurrentTopNews,
  },
  data() {
    return {
      showFollowing: true,
      post_prefix: appConstants.shape_page_postfix.POST,
      routes: appConstants.routes,
      form_data: {
        context: "",
      },
      display_media: [],
      allow_total_number_of_files: 6,
    };
  },
  async setup(props, context) {
    const router = useRouter();
    const route = useRoute();
    let isShowSkeleton = ref(true);
    let distance = ref(100);
    let position = ref(0);
    const store = useStore();
    let isShow = ref(false);
    let args = reactive({
      page: 1,
      offset: 0,
      limit: 10,
    });

    var supportsPassive = false;
    try {
      window.addEventListener(
        "test",
        null,
        Object.defineProperty({}, "passive", {
          get: function () {
            supportsPassive = true;
          },
        })
      );
    } catch (e) {}

    var wheelOpt = supportsPassive ? { passive: false } : false;
    var wheelEvent =
      "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

    document.onscroll = function () {
      let pos = getVerticalScrollPercentage(document.body);
      position.value = Math.round(pos);
      // console.log("position =>", position.value);
    };

    function getVerticalScrollPercentage(elm) {
      var p = elm.parentNode;
      return (
        ((elm.scrollTop || p.scrollTop) / (p.scrollHeight - p.clientHeight)) *
        100
      );
    }
    onBeforeMount(() => {
      // if (
      //   getter_previousUrl.value === appConstants.routes.TIMELINE ||
      //   getter_previousUrl.value === undefined
      // ) {
      //   let obj = {
      //     page: 1,
      //     postData: null,
      //   };
      //   store.commit("timeline/commit_PostData", obj);
      //   // load();
      // } else {
      // }
      // let userToken = readUserTokenCookie();
      // if (userToken) {
      //   store.dispatch("login/action_updateUserLastActivity", userToken);
      // }

      if (postData.value.length <= 0) {
        load();
      } else {
        isShowSkeleton.value = false;
      }
      getNewsList();
    });
    // load();
    isShowSkeleton.value = true;
    let isFetchingNewData = false;
    watchEffect(() => {
      if (position.value >= 70) {
        if (!isFetchingNewData) {
          isFetchingNewData = true;
          load();
        }
      }
    });
    let topNewsList = ref([]);
    let postData = computed(() => store.getters["timeline/getter_postData"]);
    let getter_user = computed(() => store.getters["login/getter_user"]);
    let getter_previousUrl = computed(
      () => store.getters["login/getter_previousUrl"]
    );
    let getter_scrollBarPosition = computed(
      () => store.getters["timeline/getter_scrollBarPosition"]
    );
    let newsList = computed(
      () => store.getters["topnews/getter_TopNewsListTimeline"]
    );
    // async function load($state) {
    //   disableScroll();
    //   // args.page = args.page + 1;
    //   args.offset = (args.page - 1) * args.limit;
    //   try {
    //     await store
    //       .dispatch("timeline/action_getPostData", args)
    //       .then((res) => {
    //         enableScroll();
    //         //pageNumber.value = res.currentPage+1
    //         args.page = res.currentPage + 1;
    //         if (res.next == null) {
    //           $state.complete();
    //         }
    //       });
    //     $state.loaded();
    //   } catch (error) {
    //     $state.error();
    //   }
    // }
    // if (position.value > 50) {
    //   console.log("position greater than 50%");
    //   load();
    // }
    async function load() {
      // args.page = args.page + 1;
      args.offset = (args.page - 1) * args.limit;
      try {
        await store
          .dispatch("timeline/action_getPostData", args)
          .then((res) => {
            isFetchingNewData = false;
            isShowSkeleton.value = false;
            //pageNumber.value = res.currentPage+1
            args.page = res.currentPage + 1;
          });
      } catch (error) {
        console.log(error);
      }
    }

    function openPostModal() {
      isShow.value = !isShow.value;
    }
    function closeModal() {
      isShow.value = false;
    }
    function openPost() {
      this.$router.push({ name: appConstants.routes.CREATEPOST });
    }
    function getIDandRef() {
      return `uploadMultiple_${this.id}`;
    }
    function clickJobs() {
      store.commit("jobs/commit_currentJobType", appConstants.jobType.ALL);
      router.push({ name: appConstants.routes.JOBS });
    }
    function clickBusiness() {
      router.push({ name: appConstants.routes.BUSINESSLIST });
    }
    function clickArticle() {
      router.push({ name: appConstants.routes.ARTICLE });
    }
    function SetDistance() {
      console.log("distance =>", distance.value);
      return (distance.value = 60);
    }
    function getKey() {
      var res = getUUID();
      return res;
    }
    async function getNewsList(type) {
      await store
        .dispatch("topnews/action_getTopNewsListTimeline", type)
        .then(() => {
          //console.log("TopNewsListTimeline", newsList.value.length);
          for (let i = 0; i < newsList.value.length; i++) {
            let newsObj = {
              url: newsList.value[i]?.medias[0].name,
              index: i,
              id: newsList.value[i]?.id,
              title: newsList.value[i]?.title,
              content: newsList.value[i]?.content,
              url_str: newsList.value[i]?.url_str,
            };

            topNewsList.value.push(newsObj);

            // console.log("topNewsList.value", topNewsList.value);
          }

          let newsObj = {
            url: "",
            index: newsList.value.length + 1,
            id: "",
            title: "View More",
            content: "",
          };
          topNewsList.value.push(newsObj);
          //console.log("topNewsList.value", topNewsList.value);
        });
    }
    return {
      args,
      postData,
      isShow,
      getter_user,
      distance,
      supportsPassive,
      wheelOpt,
      wheelEvent,
      getter_previousUrl,
      getter_scrollBarPosition,
      position,
      isFetchingNewData,
      isShowSkeleton,
      newsList,
      topNewsList,
      load,
      openPostModal,
      closeModal,
      openPost,
      getIDandRef,
      //disableScroll,
      //enableScroll,
      clickJobs,
      SetDistance,
      clickBusiness,
      clickArticle,
      getNewsList,
      getKey,
    };
  },
  // computed: {
  //   ...mapGetters("timeline", ["getter_postData"]),
  // },
  // methods: {
  //   ...mapActions("timeline", ["action_getPostData"]),
  // },
  // created() {
  //   this.action_getPostData(this.args);
  // },
};
</script>
<style scoped>
.hide-create-post {
  display: none !important;
}
.show-create-post {
  display: block;
}
/* hover effect */

.button {
  /* margin: 0rem 2.4rem; */
  padding: 1.6rem;
  border: 2px solid;
  font-weight: bold;
  color: #ffffff;
  cursor: pointer;
  position: relative;
  z-index: 1;
}

.button::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  top: 0;
  left: 0;
  /* background-color: rgba(0, 0, 0, 0.4); */
  background-color: #f2f2f2;
  z-index: -1;
  /* transition-duration: 0.9s; */
  transition: transform 0.5s ease 0s;
}
.button:hover {
  color: black;
  border: 2px solid #000000;
}
.button_three::after {
  transform: scale(0);
  transform-origin: bottom right;
}

.button_three:hover::after {
  transform: scale(1);
  transform-origin: top left;
}
</style>
