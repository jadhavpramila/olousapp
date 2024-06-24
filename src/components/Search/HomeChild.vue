<template lang="">
  <div class="form-container">
    <div
      class="max-w-full mx-4 md:mx-auto bg-[#1C1C1C] text-[#F2F2F2] antialiased relative"
    >
      <div class="flex flex-col items-center space-y-[3rem]">
        <!-- logo -->
        <div class="flex flex-col items-center space-y-3">
          <span class="flex space-x-3 items-center">
            <img
              class="h-[3rem]"
              :src="getStaticImage('Olous_logo_with_text.svg')"
              alt="Olous logo"
            />
            <!-- <span class="text-[3rem] tracking-wide font-[400]">Olous</span> -->
          </span>
          <!-- tagline -->
          <h1 class="text-lg text-center tracking-wide lg:w-full w-3/4">
            Empowering Future Of Construction
          </h1>
        </div>
        <!-- input for search -->
        <div class="flex items-center w-full md:w-1/2 relative">
          <input
            v-model="query"
            type="text"
            ref="search_query"
            v-on:keyup="isSearchClick($event)"
            class="w-full px-4 h-[2.5rem] rounded-md leading-none bg-[#464646] focus:outline-none"
            placeholder="Olous Search"
          />
          <div class="absolute right-0 top-0 md:-mr-4 btn-focus">
            <button
              v-if="query.length > 0"
              class="h-[2.5rem] px-3 rounded-md right-2"
            >
              <img @click="clear()" src="../../assets/clear.svg" alt="" />
            </button>
            <button
              @click="search"
              class="bg-[#343434] h-[2.5rem] px-3 rounded-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 27.414 27.414"
              >
                <g transform="translate(1 1)">
                  <circle
                    cx="10"
                    cy="10"
                    r="10"
                    fill="none"
                    stroke="#fff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  />
                  <line
                    x1="8"
                    y1="8"
                    transform="translate(17 17)"
                    fill="none"
                    stroke="#fff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  />
                </g>
              </svg>
            </button>
          </div>
        </div>
        <h3 class="md:w-2/3 text-center lg:text-xl text-base">
          Olous is a virtual Global Construction Community to learn, <br />
          <span>share knowledge, get hired and grow</span>
        </h3>
        <!-- Grid starts here -->
        <div
          class="animate-wrapper pt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-4 overflow-auto pb-[3rem] w-full"
        >
          <div
            v-for="data in getter_getData"
            class="card-animation relative flex items-center justify-center w-full h-[18.68rem] bg-gray-400 bg-cover bg-no-repeat rounded-[1.4rem]"
            @click="showPost(data)"
          >
            <img
              :src="setImageUrl(data)"
              :alt="setAltText(data)"
              class="w-full h-full rounded-[1.4rem]"
            />
            <!-- play button -->
            <div
              class="flex items-center justify-center w-12 h-12 bg-gray-900 bg-opacity-90 rounded-full cursor-pointer absolute"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15.621"
                height="21.302"
                viewBox="0 0 15.621 21.302"
              >
                <g transform="translate(0.5 0.528)">
                  <path
                    d="M366,293.029v16.187a1.993,1.993,0,0,0,3.192,1.621l10.632-8.095a2.044,2.044,0,0,0,0-3.239l-10.632-8.095A1.993,1.993,0,0,0,366,293.029Z"
                    transform="translate(-366 -291)"
                    fill="none"
                    stroke="#fff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
import Nav from "/src/components/Layout/Nav.vue";
import {
  getCoverImageURL,
  getPostTitleElseContent,
  getParamsForPostURL,
} from "/src/common/js/ReadPostData.js";
import appConstants from "/src/appConstants.js";
import { mapGetters, mapActions, mapMutations } from "vuex";
import { getUUIDtoEncodedString } from "/src/common/js/UUIDtoBase64.js";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { ref, computed } from "vue";

export default {
  name: "HomeChild",
  components: {
    Nav,
  },
  async setup(props) {
    const store = useStore();
    const router = useRouter();
    const search_query = ref(null);

    let query = ref("");

    let getter_getData = computed(() => store.getters["search/getter_getData"]);

    await store.dispatch("search/action_getData");

    function setImageUrl(postdata) {
      return getCoverImageURL(postdata);
    }

    function clear() {
      query.value = "";
      search_query.value.focus();
    }

    async function showPost(post) {
      let encode_str = getUUIDtoEncodedString(post.id);
      let res = await getParamsForPostURL(post);
      router.push({
        name: appConstants.routes.POST,
        params: {
          post_id: `${res.user_slur}_${res.title}${appConstants.url_separator}${encode_str}${appConstants.shape_page_postfix.POST}`,
        },
      });
    }

    function search() {
      if (query.value.trim() != "") {
        store.commit("search/commit_saveActiveTabs", {
          mainTab: appConstants.search_tabs.CONTENT,
          subTab: appConstants.search_sub_tabs.ALL,
        });
        router.push({
          name: appConstants.routes.SEARCH_CONTENT,
          params: {
            searchFor: query.value,
          },
        });
      } else {
        this.query = "";
        search_query.value.focus();
      }
    }

    function isSearchClick(e) {
      if (e.keyCode === 13) {
        search();
        search_query.value.blur();
      }
    }

    function setAltText(postData) {
      let postTitleOrContent = getPostTitleElseContent(postData);
      if (postTitleOrContent.length > 60)
        postTitleOrContent = postTitleOrContent.substring(0, 60);
      return postTitleOrContent;
    }

    return {
      search_query,
      query,
      getter_getData,
      setImageUrl,
      clear,
      showPost,
      search,
      isSearchClick,
      setAltText,
    };
  },
};
</script>
<style scoped></style>
