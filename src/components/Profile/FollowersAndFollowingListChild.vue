<template>
  <div class="form-container">
    <div
      class="flex flex-col lg:px-16 md:px-16 px-4 lg:pt-[2.5rem] md:pt-[2.5rem] pt-[1rem] lg:pb-14 md:pb-14 pb-7 rounded-xl"
    >
      <div class="card">
        <!-- <h5>Default</h5> -->
        <TabView
          ref="tabview1"
          :activeIndex="activeIndex"
          @tab-click="checkTab"
        >
          <TabPanel header="Followers">
            <div class="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4">
              <div
                class="bg-[#333] grid grid-cols-7 p-2 rounded-md"
                v-for="(user, index) in getter_userFollowersList"
                :key="index"
              >
                <div class="flex w-auto col-span-1" @click="viewProfile(user)">
                  <img
                    v-if="user.profile_image"
                    class="rounded-full border border-gray-100 shadow-sm lg:h-12 h-8 w-12 bg-white cursor-pointer object-contain"
                    :src="user.profile_image"
                    alt="user image"
                  />
                  <div v-else>
                    <div
                      class="rounded-full text-[#333] flex lg:w-12 lg:h-12 h-8 w-10 justify-center items-center relative bg-[#f2f2f2] cursor-pointer"
                    >
                      <span>
                        {{ shortForm(user.first_name, user.last_name) }}
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  class="flex col-span-4 flex-col lg:ml-0 mg:ml-0 ml-2 cursor-pointer"
                  @click="viewProfile(user)"
                >
                  <span class="font-weight-600 text-sm"
                    >{{ user.first_name }} {{ user.last_name }}</span
                  >
                  <span
                    class="text-xs font-weight-500"
                    v-if="user.designation"
                    >{{ user.designation }}</span
                  >
                  <span class="text-xs font-weight-500" v-else>{{
                    getAboutText(user.about)
                  }}</span>
                </div>
                <div
                  class="flex items-center col-span-2 justify-end"
                  v-if="user.id != getter_user.id"
                >
                  <span
                    v-if="user.is_following"
                    @click="clickUnfollow(user.id)"
                    class="text-xs text-white font-weight-600 cursor-pointer"
                    >Unfollow</span
                  >
                  <span
                    v-if="!user.is_following"
                    @click="clickFollow(user.id)"
                    class="text-xs text-white font-weight-600 cursor-pointer"
                    >Follow</span
                  >
                </div>
                <!-- <div
                    v-if="getter_user.id == user.id"
                    class="flex justify-end mr-2.5"
                  ></div>
                  <div
                    v-if="isLoading && getter_user.id != user.id"
                    class="flex justify-end mr-2.5"
                  >
                    <ProgressSpinner
                      style="width: 20px; height: 20px"
                      strokeWidth="8"
                      fill="var(--surface-ground)"
                      animationDuration="1s"
                    />
                  </div> -->
              </div>
            </div>
          </TabPanel>
          <TabPanel header="Following">
            <div class="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4">
              <div
                class="bg-[#333] grid grid-cols-7 p-3 rounded-md"
                v-for="(user, index) in getter_userFollowingList"
                :key="index"
              >
                <div class="flex w-auto col-span-1" @click="viewProfile(user)">
                  <img
                    v-if="user.profile_image"
                    class="rounded-full border border-gray-100 shadow-sm w-12 lg:h-12 h-8 cursor-pointer bg-white object-contain"
                    :src="user.profile_image"
                    alt="user image"
                  />
                  <div v-else>
                    <div
                      class="rounded-full text-[#333] flex lg:w-12 lg:h-12 h-8 w-10 justify-center items-center relative bg-[#f2f2f2] cursor-pointer"
                    >
                      <span>
                        {{ shortForm(user.first_name, user.last_name) }}
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  class="flex flex-col col-span-4 ml-2 w-full lg:ml-0 mg:ml-0 ml-2 cursor-pointer"
                  @click="viewProfile(user)"
                >
                  <span class="font-weight-600 text-sm"
                    >{{ user.first_name }} {{ user.last_name }}</span
                  >
                  <span
                    class="text-xs font-weight-500"
                    v-if="user.designation"
                    >{{ user.designation }}</span
                  >
                  <span v-else class="text-xs font-weight-500"
                    ><span v-if="user.about">{{
                      getAboutText(user.about)
                    }}</span></span
                  >
                </div>
                <div class="flex items-center col-span-2 justify-end">
                  <div v-if="getter_user.id != user.id && !isLoading">
                    <span
                      v-if="user.is_following"
                      @click="clickUnfollow(user.id)"
                      class="text-xs text-white font-weight-600 cursor-pointer"
                      >Unfollow</span
                    >
                    <span
                      v-if="!user.is_following"
                      @click="clickFollow(user.id)"
                      class="text-xs text-white font-weight-600 cursor-pointer"
                      >Follow</span
                    >
                  </div>
                  <!-- <div
                      v-if="getter_user.id == user.id"
                      class="flex justify-end mr-2.5"
                    ></div>
                    <div
                      v-if="isLoading && getter_user.id != user.id"
                      class="flex justify-end mr-2.5"
                    >
                      <ProgressSpinner
                        style="width: 20px; height: 20px"
                        strokeWidth="8"
                        fill="var(--surface-ground)"
                        animationDuration="1s"
                      />
                    </div> -->
                </div>
              </div>
            </div>
          </TabPanel>
        </TabView>
      </div>
    </div>
  </div>
</template>
<script>
import appConstants from "../../appConstants.js";
import {
  computed,
  ref,
  onMounted,
  reactive,
  onBeforeMount,
  watchEffect,
} from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { useToast } from "primevue/usetoast";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import ProgressSpinner from "primevue/progressspinner";

export default {
  name: "FollowersAndFollowingListChild",
  components: {
    TabView,
    TabPanel,
    ProgressSpinner,
  },
  async setup() {
    const store = useStore();
    //let objectId = props.objectId;
    const router = useRouter();
    const route = useRoute();
    const toast = useToast();
    let isLoading = ref(false);
    let position = ref(0);
    let isDataFetching = ref(false);
    let isNextCall = ref(true);
    let activeIndex = ref(0);
    let args = reactive({
      id: "",
      offset: 0,
      limit: 10,
      page: 1,
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
      let type = route.params.users_type;
      //console.log("param", type);
      if (type == appConstants.users_type.FOLLOWING) {
        activeIndex.value = 1;
        let obj = {
          page: 1,
          usersData: null,
        };
        store.commit("UserProfile/commit_userFollowingList", obj);
        getFollowingList();
      } else {
        activeIndex.value = 0;
        let obj = {
          page: 1,
          usersData: null,
        };
        store.commit("UserProfile/commit_userFollowersList", obj);
        getFollowersList();
      }
    });

    let isFetchingNewData = false;
    watchEffect(() => {
      if (position.value >= 70) {
        if (!isFetchingNewData) {
          isFetchingNewData = true;
          if (route.params.users_type == appConstants.users_type.FOLLOWING) {
            getFollowingList();
          } else {
            getFollowersList();
          }
        }
      }
    });

    let getter_scrollBarPosition = computed(
      () => store.getters["jobs/getter_scrollBarPosition"]
    );

    let getter_UserProfile = computed(
      () => store.getters["UserProfile/getter_UserProfile"]
    );
    let getter_userFollowingList = computed(
      () => store.getters["UserProfile/getter_userFollowingList"]
    );
    let getter_userFollowersList = computed(
      () => store.getters["UserProfile/getter_userFollowersList"]
    );
    let getter_user = computed(() => store.getters["login/getter_user"]);

    async function getFollowersList() {
      if (!isNextCall.value) {
        return;
      }
      isDataFetching.value = true;
      args.offset = (args.page - 1) * args.limit;

      args.id = getter_user.value.id;
      try {
        await store
          .dispatch("UserProfile/action_getUserFollowersList", args)
          .then((res) => {
            isFetchingNewData = false;
            //isShowSkeleton.value = false;

            args.page = res.currentPage + 1;
            // console.log("next res", res)
            if (res.next == null) {
              isNextCall.value = false;
              isDataFetching.value = false;
            }
          });
      } catch (error) {
        console.log(error);
      }
      //store.dispatch("UserProfile/action_getUserFollowersList", args);
      //store.dispatch("UserProfile/action_getUserFollowingList", args);
    }
    async function getFollowingList() {
      if (!isNextCall.value) {
        return;
      }
      isDataFetching.value = true;
      args.offset = (args.page - 1) * args.limit;

      args.id = getter_user.value.id;
      try {
        await store
          .dispatch("UserProfile/action_getUserFollowingList", args)
          .then((res) => {
            isFetchingNewData = false;
            //isShowSkeleton.value = false;

            args.page = res.currentPage + 1;
            // console.log("next res", res)
            if (res.next == null) {
              isNextCall.value = false;
              isDataFetching.value = false;
            }
          });
      } catch (error) {
        console.log(error);
      }
      //store.dispatch("UserProfile/action_getUserFollowersList", args);
      //store.dispatch("UserProfile/action_getUserFollowingList", args);
    }
    function shortForm(fName, lName) {
      let initialLetters =
        fName.charAt(0).toUpperCase() + lName.charAt(0).toUpperCase();
      return initialLetters;
    }
    function getAboutText(about) {
      let maxLength = 100;
      if (about.length > maxLength) {
        about = about.slice(0, maxLength) + "...";
      }
      return about;
    }
    async function clickUnfollow(id) {
      isLoading.value = true;
      await store.dispatch("timeline/action_unfollowUser", id).then((res) => {
        isLoading.value = false;
      });
    }

    async function clickFollow(id) {
      isLoading.value = true;
      let obj = {
        id: id,
        data: {
          reset_feeds: false,
        },
      };
      await store.dispatch("timeline/action_followUser", obj).then((res) => {
        isLoading.value = false;
      });
    }
    function viewProfile(authorData) {
      if (authorData.is_admin == true) {
        return;
      }

      if (authorData.is_pseudo_user == true) {
        let userSlug = authorData.slug;
        // console.log("in if =>", userSlug);
        router.push({
          name: appConstants.routes.PORTFOLIO_URL,
          params: { slug: userSlug },
        });
        // window.open(routeData.href, "_blank");
      } else {
        let userSlug = authorData.slug;
        router.push({
          name: appConstants.routes.VIEWPROFILE,
          params: { user_slug: userSlug },
        });
        // window.open(routeData.href, "_blank");
      }
    }
    function checkTab(tabinfo) {
      let obj = {
        page: 1,
        usersData: null,
      };
      store.commit("UserProfile/commit_userFollowingList", obj);
      if (
        tabinfo.originalEvent.target.innerText ==
        appConstants.users_type.FOLLOWERS
      ) {
        //getFollowersList();
        router.push({
          name: appConstants.routes.FOLLOWERSANDFOLLOWING,
          params: { users_type: appConstants.users_type.FOLLOWERS },
        });
      } else if (
        tabinfo.originalEvent.target.innerText ==
        appConstants.users_type.FOLLOWING
      ) {
        router.push({
          name: appConstants.routes.FOLLOWERSANDFOLLOWING,
          params: { users_type: appConstants.users_type.FOLLOWING },
        });
        // getFollowingList();
      }
    }

    return {
      getter_UserProfile,
      getter_userFollowersList,
      getter_userFollowingList,
      getter_scrollBarPosition,
      getter_user,
      isLoading,
      position,
      isDataFetching,
      isNextCall,
      args,
      activeIndex,
      wheelOpt,
      wheelEvent,
      getFollowersList,
      getFollowingList,
      shortForm,
      clickUnfollow,
      clickFollow,
      viewProfile,
      checkTab,
      getAboutText,
    };
  },
};
</script>
