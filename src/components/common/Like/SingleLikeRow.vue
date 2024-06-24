<template>
  <div class="grid grid-cols-4 gap-2">
    <div
      class="col-span-3 cursor-pointer truncate"
      @click="clickUser(user.author)"
    >
      <div class="flex w-full items-center lg:gap-4 gap-2">
        <!-- <div class="relative w-12 h-12"> -->
        <img
          v-if="user.author.profile_image"
          class="rounded-full border border-gray-100 shadow-sm lg:h-12 h-10 cursor-pointer"
          :src="user.author.profile_image"
          alt="user image"
        />
        <div v-else>
          <div
            class="rounded-full text-[#333] flex lg:w-12 lg:h-12 h-10 w-10 justify-center items-center relative bg-[#f2f2f2] cursor-pointer"
          >
            <span>
              {{ shortForm(user.author.first_name, user.author.last_name) }}
            </span>
          </div>
        </div>
        <!-- </div> -->
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
    <!-- <p class="text-black">{{ user.author.id }}</p> -->
    <!-- <p class="text-black">{{ index }}</p> -->
    <!-- grid second col  -->
    <!-- {{index}} -->
    <div class="col-span-1 flex items-center justify-end">
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
        class="flex justify-end mr-2.5"
      ></div>
      <div
        v-if="isLoading && getter_user.id != user.author.id"
        class="flex justify-end mr-2.5"
      >
        <ProgressSpinner
          style="width: 20px; height: 20px"
          strokeWidth="8"
          fill="var(--surface-ground)"
          animationDuration="1s"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ProgressSpinner from "primevue/progressspinner";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { reactive, computed, ref } from "vue";
import appConstants from "../../../appConstants.js";

export default {
  name: "SingleLikeRow",
  components: {
    ProgressSpinner,
  },
  props: {
    user: Object,
  },
  async setup(props, { emit }) {
    //   console.log(props);
    let user = props.user;
    const router = useRouter();
    const store = useStore();
    let isLoading = ref(false);
    let getter_user = computed(() => store.getters["login/getter_user"]);

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
      user,
      isLoading,
      getter_user,
      close,
      shortForm,
      clickUser,
      clickUnfollow,
      clickFollow,
    };
  },
};
</script>

<style></style>
