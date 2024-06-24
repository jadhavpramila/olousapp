<template>
  <div
    class="fixed z-50 inset-0 p-3"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="flex items-end justify-center min-h-screen pt-4 pb-20 text-center sm:block sm:p-0"
    >
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >
      <div
        class="inline-block m-auto align-bottom bg-[#f2f2f2] rounded-xl text-left overflow-hidden shadow-xl transform transition-all mt-8 sm:align-middle lg:max-w-2xl w-full"
      >
        <div class="lg:px-5 lg:py-5 py-3 px-3">
          <!-- top section -->
          <div class="flex text-sm">
            <div
              class="w-full mt-1 pt-2 font-size-22 items-center leading-4 leading-6 relative text-[#1c1c1c] text-center text-lg"
              id="modal-title"
            >
              Stars
              <!-- <pre>{{ likeList }}</pre> -->
            </div>
            <div class="flex justify-end">
              <button
                class="bg-[#ffffff] rounded-full"
                type="submit"
                @click="close()"
              >
                <img
                  class="h-7"
                  :src="getStaticImage('Close-Black.svg')"
                  alt="close"
                />
              </button>
            </div>
          </div>
        </div>
        <div
          class="lg:px-5 lg:pb-4 sm:pb-4 sm:px-6 max-h-[21.5rem] overflow-auto list"
        >
          <!-- {{ likeList[0].author.id }} -->
          <!-- list section -->

          <div class="text-black">
            <!-- new like list view -->
            <div
              class="bg-[#ffffff] p-1.5 rounded-lg mb-2"
              v-for="(user, index) in likeList"
              :key="index"
            >
              <SingleLikeRow :user="user" />
              <!-- <div class="grid grid-cols-4 gap-2">
                <div
                  class="col-span-3 cursor-pointer truncate"
                  @click="clickUser(user.author)"
                >
                  <div class="flex w-full items-center lg:gap-4 gap-2">
                    <img
                      v-if="user.author.profile_image"
                      class="
                        rounded-full
                        border border-gray-100
                        shadow-sm
                        lg:h-12
                        h-10
                        cursor-pointer
                      "
                      :src="user.author.profile_image"
                      alt="user image"
                    />
                    <div v-else>
                      <div
                        class="
                          rounded-full
                          text-[#333]
                          flex
                          lg:w-12 lg:h-12
                          h-10
                          w-10
                          justify-center
                          items-center
                          relative
                          bg-[#f2f2f2]
                          cursor-pointer
                        "
                      >
                        <span>
                          {{
                            shortForm(
                              user.author.first_name,
                              user.author.last_name
                            )
                          }}
                        </span>
                      </div>
                    </div>
                    <div class="flex flex-col">
                      <strong class="lg:font-size-18 font-size-14"
                        >{{ user.author.first_name }}
                        {{ user.author.last_name }}
                      </strong>
                      <span
                        class="font-size-14 font-size-12"
                        data-bs-toggle="tooltip"
                        :title="user.author.designation"
                        >{{ user.author.designation }}
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  class="flex just justify-end mr-2.5"
                  v-if="getter_user.id != user.author.id && !isLoading"
                >
                  <button
                    v-if="user.author.is_following"
                    @click="clickUnfollow(user.author.id)"
                  >
                    <span class="font-size-12">Unfollow</span>
                  </button>
                  <button
                    v-if="!user.author.is_following"
                    @click="clickFollow(user.author.id)"
                  >
                    <span class="font-size-12">Follow</span>
                  </button>
                </div>
                <div
                  v-if="getter_user.id == user.author.id"
                  class="flex just justify-end mr-2.5"
                ></div>
                <div
                  v-if="isLoading && getter_user.id != user.author.id"
                  class="flex items-center justify-end mr-2.5"
                >
                  <ProgressSpinner
                    style="width: 20px; height: 20px"
                    strokeWidth="8"
                    fill="var(--surface-ground)"
                    animationDuration="1s"
                  />
                </div>
              </div> -->
            </div>
            <div class="flex justify-end mt-2" v-if="isSeeMore">
              <span class="cursor-pointer" @click="getLikeList()"
                >See More...</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import appConstants from "../../../appConstants.js";
import SingleLikeRow from "./SingleLikeRow.vue";
import { onMounted, onUnmounted } from "vue";
import {
  disableScrollbar,
  enableScrollbar,
} from "../../../common/js/HandleBodyScrollbar.js";

export default {
  name: "LikePostListChild",
  components: {
    SingleLikeRow,
  },
  props: {
    objectId: String,
  },
  async setup(props, { emit }) {
    let objectId = props.objectId;
    const router = useRouter();
    const store = useStore();
    let isLoading = ref(false);
    let args = reactive({
      id: objectId,
      offset: 0,
      limit: 10,
      page: 1,
    });
    let isSeeMore = ref(false);
    let likeList = computed(() => store.getters["timeline/getter_likeList"]);
    let getter_user = computed(() => store.getters["login/getter_user"]);
    let scrollbarPosition = ref(0);

    onMounted(() => {
      scrollbarPosition.value = window.pageYOffset;
      //console.log("scrollbar postion =>", window.pageYOffset);
      store.commit("timeline/commit_scrollBarPosition", window.pageYOffset);
      disableScrollbar(window.pageYOffset);
    });

    onUnmounted(() => {
      enableScrollbar(scrollbarPosition.value);
    });

    await getLikeList();

    function close() {
      emit("close");
    }
    async function getLikeList() {
      args.offset = (args.page - 1) * args.limit;
      await store
        .dispatch("timeline/action_likeListofPost", args)
        .then((res) => {
          // console.log(res);
          args.page = res.page + 1;
          if (res.next == null) {
            isSeeMore.value = false;
          } else {
            isSeeMore.value = true;
          }
        });
    }

    function shortForm(fName, lName) {
      let initialLetters =
        fName.charAt(0).toUpperCase() + lName.charAt(0).toUpperCase();
      return initialLetters;
    }

    function clickUser(authorData) {
      // console.log(authorData);
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
      } else {
        let userSlug = authorData.slug;
        //console.log("in else =>", userSlug);
        router.push({
          name: appConstants.routes.VIEWPROFILE,
          params: { user_slug: userSlug },
        });
      }
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

    return {
      isSeeMore,
      isLoading,
      likeList,
      getter_user,
      args,
      close,
      getLikeList,
      shortForm,
      clickUser,
      clickUnfollow,
      clickFollow,
    };
  },
};
</script>
<style scoped>
.list::-webkit-scrollbar {
  width: 10px;
  background-color: #f2f2f2;
}

.list::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #afafaf;
}
.left-popup {
  margin-left: -230px !important;
}
@media only screen and (max-width: 600px) {
  .left-popup {
    margin-left: 0px !important;
  }
}
.p-progress-spinner {
  margin-left: 70% !important;
}

/* progressive spinner color */
@keyframes p-progress-spinner-color {
  100%,
  0% {
    stroke: #333333 !important;
  }
  40% {
    stroke: #d8d8d8 !important;
  }
  66% {
    stroke: #333333 !important;
  }
  80%,
  90% {
    stroke: #d8d8d8 !important;
  }
}
</style>
