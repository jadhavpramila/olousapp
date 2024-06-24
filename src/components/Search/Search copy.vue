<template lang="">
  <div class="form-container">
    <div
      class="max-w-[80rem] md:mx-auto bg-[#1C1C1C] text-[#F2F2F2] antialiased pb-[3rem] h-full"
    >
      <div class="flex items-center justify-between">
        <!-- input for search -->
        <!-- {{ getter_searchString }} -->
        <div
          class="flex items-center btn-focus w-full md:w-1/3 relative block mb-10 lg:hidden md:hidden"
        >
          <input
            v-model="searchFor"
            type="text"
            ref="search"
            v-on:keyup="isSearchClick($event)"
            class="w-full px-2 h-[2.5rem] rounded-md leading-none bg-[#464646] focus:outline-none"
            placeholder="Olous Search"
          />
          <button
            v-if="searchFor.length > 0"
            class="lg:h-[2.6rem] md:h-[2.1rem] sm:h-[1.8rem] h-[1.8rem] px-3 rounded-md absolute right-2 clear"
          >
            <img @click="clear()" src="../../assets/clear.svg" alt="" />
          </button>
          <button
            @click="searchData()"
            class="bg-[#343434] h-[2.5rem] px-3 rounded-md absolute right-0"
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
      <!-- tabs, grid of cards, ads start here -->
      <div class="space-y-[1.5rem]">
        <!-- {{getter_searchString}} -->
        <!-- Tabs -->
        <div class="flex overflow-x-auto space-x-3 md:space-x-6 pb-0">
          <div
            @click="
              searchCriteriaChanged(search_tab.CONTENT, search_sub_tab.ALL)
            "
            :class="{
              active: getter_saveActiveTabs.mainTab == search_tab.CONTENT,
            }"
            class="tab w-32 py-1"
          >
            Content
          </div>
          <div
            id="companies"
            @click="
              searchCriteriaChanged(search_tab.COMPANIES, search_sub_tab.ALL)
            "
            :class="{
              active: getter_saveActiveTabs.mainTab == search_tab.COMPANIES,
            }"
            class="tab w-32 py-1"
          >
            Companies
          </div>
          <!-- USERS -->
          <div
            id="users"
            @click="searchCriteriaChanged(search_tab.USERS, search_sub_tab.ALL)"
            :class="{
              active: getter_saveActiveTabs.mainTab == search_tab.USERS,
            }"
            class="tab w-32 py-1"
          >
            People
          </div>
        </div>
        <!-- card + ads -->
        <div class="flex-col md:flex-row md:space-x-[2.5rem] justify-between">
          <!-- card grid md:w-[43.8rem]-->
          <div class="space-y-6">
            <div
              v-if="getter_saveActiveTabs.mainTab == search_tab.CONTENT"
              class="flex space-x-10 w-full pb-6 overflow-x-auto"
            >
              <span
                class="cursor-pointer"
                @click="
                  () => {
                    activeSubTab = search_sub_tab.ALL;
                    searchCriteriaChanged(
                      search_tab.CONTENT,
                      search_sub_tab.ALL
                    );
                  }
                "
                :class="{
                  subtabActive:
                    getter_saveActiveTabs.subTab == search_sub_tab.ALL,
                }"
                >All</span
              >

              <span
                class="cursor-pointer"
                @click="
                  () => {
                    activeSubTab = search_sub_tab.HEADLINE;
                    searchCriteriaChanged(
                      search_tab.CONTENT,
                      search_sub_tab.HEADLINE
                    );
                  }
                "
                :class="{
                  subtabActive:
                    getter_saveActiveTabs.subTab == search_sub_tab.HEADLINE,
                }"
                >Headlines</span
              >
              <span
                class="cursor-pointer"
                @click="
                  () => {
                    activeSubTab = search_sub_tab.DOCUMENT;
                    searchCriteriaChanged(
                      search_tab.CONTENT,
                      search_sub_tab.DOCUMENT
                    );
                  }
                "
                :class="{
                  subtabActive:
                    getter_saveActiveTabs.subTab == search_sub_tab.DOCUMENT,
                }"
                >Documents</span
              >
            </div>
            <span v-if="getter_saveActiveTabs.mainTab == search_tab.CONTENT">
              <span v-if="arrangeData(getter_searchData).length > 0">
                <Content :details="arrangeData(getter_searchData)" />
              </span>
              <span v-else>
                <h5>No Result Found</h5>
              </span>
            </span>
            <span v-if="getter_saveActiveTabs.mainTab == search_tab.COMPANIES">
              <span v-if="getter_companiesData.length > 0">
                <Companies :details="getter_companiesData" />
              </span>
              <span v-else>
                <h5>No Result Found !!</h5>
              </span>
            </span>
            <span v-if="getter_saveActiveTabs.mainTab == search_tab.USERS">
              <span v-if="getter_usersData.length > 0">
                <Users :details="getter_usersData" />
              </span>
              <span v-else>
                <h5>No Result Found</h5>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Content from ".//Content.vue";
import Companies from ".//Companies.vue";
import Users from ".//Users.vue";
import Documents from ".//Documents.vue";
import Ad from "/src/components/Ads/Ad.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
import appConstants from "../../appConstants.js";
import { shallowRef } from "@vue/reactivity";
import Skeleton from "primevue/skeleton";
import { useStore } from "vuex";
import { ref, onMounted, onUnmounted, computed } from "vue";
import { getCurrentInstance } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "Search",
  components: {
    Content,
    Companies,
    Users,
    Documents,
    Ad,
    Skeleton,
  },
  // props: ["query"],
  computed: {
    ...mapGetters("search", [
      "getter_searchData",
      "getter_companiesData",
      "getter_usersData",
      "getter_saveActiveTabs",
      "getter_searchString",
    ]),
    ...mapMutations("search", [
      "commit_searchData",
      "commit_companiesData",
      "commit_usersData",
    ]),
  },

  setup(props, context) {
    const route = useRoute();
    const router = useRouter();

    const app = getCurrentInstance();
    const $emitter = app.appContext.config.globalProperties.emitter;

    const search = ref(null);
    const store = useStore();

    let searchFor = ref("");
    let activeSubTab = shallowRef("all");
    let activeTab = ref("");

    const search_tab = appConstants.search_tabs;
    const search_sub_tab = appConstants.search_sub_tabs;

    let getter_searchData = computed(
      () => store.getters["search/getter_searchData"]
    );
    let getter_companiesData = computed(
      () => store.getters["search/getter_companiesData"]
    );
    let getter_usersData = computed(
      () => store.getters["search/getter_usersData"]
    );
    let getter_saveActiveTabs = computed(
      () => store.getters["search/getter_saveActiveTabs"]
    );
    let getter_searchString = computed(
      () => store.getters["search/getter_searchString"]
    );

    onMounted(() => {
      searchFor.value = route.params.searchFor;

      switch (route.name) {
        case appConstants.routes.SEARCH_CONTENT:
          store.commit("search/commit_saveActiveTabs", {
            mainTab: appConstants.search_tabs.CONTENT,
            subTab: appConstants.search_sub_tabs.ALL,
          });
          break;
        case appConstants.routes.SEARCH_HEADLINES:
          store.commit("search/commit_saveActiveTabs", {
            mainTab: appConstants.search_tabs.CONTENT,
            subTab: appConstants.search_sub_tabs.HEADLINE,
          });
          break;
        case appConstants.routes.SEARCH_DOCUMENTS:
          store.commit("search/commit_saveActiveTabs", {
            mainTab: appConstants.search_tabs.CONTENT,
            subTab: appConstants.search_sub_tabs.DOCUMENT,
          });
          break;
        case appConstants.routes.SEARCH_BUSINESS:
          store.commit("search/commit_saveActiveTabs", {
            mainTab: appConstants.search_tabs.COMPANIES,
            subTab: appConstants.search_sub_tabs.ALL,
          });
          break;
        case appConstants.routes.SEARCH_PROFILE:
          store.commit("search/commit_saveActiveTabs", {
            mainTab: appConstants.search_tabs.USERS,
            subTab: appConstants.search_sub_tabs.ALL,
          });
          break;
        default:
          store.commit("search/commit_saveActiveTabs", {
            mainTab: appConstants.search_tabs.CONTENT,
            subTab: appConstants.search_sub_tabs.ALL,
          });
      }

      searchFromHeader("");
      $emitter.on("olous_search", (searchText) => {
        searchFromHeader(searchText);
      });
    });

    onUnmounted(() => {
      $emitter.off("olous_search");
    });

    function isSearchClick(e) {
      if (e.keyCode === 13) {
        fetch();
        search.value.blur();
      }
    }
    function searchData() {
      if (searchFor.value) {
        fetch(search_sub_tab.ALL);
      } else {
        search.value.focus();
      }
    }
    function fetch() {
      store
        .dispatch("search/action_setSearchString", searchFor.value)
        .then(() => {
          if (getter_saveActiveTabs.value.mainTab == search_tab.CONTENT) {
            fetchData(getter_saveActiveTabs.value.subTab);
          } else if (
            getter_saveActiveTabs.value.mainTab == search_tab.COMPANIES
          ) {
            fetchData(search_tab.COMPANIES);
          } else if (getter_saveActiveTabs.value.mainTab == search_tab.USERS) {
            fetchData(search_tab.USERS);
          }
        });
    }

    function searchFromHeader() {
      // searchFor.value = getter_searchString.value.data;
      searchFor.value = route.params.searchFor;
      if (getter_saveActiveTabs.value.mainTab == search_tab.CONTENT) {
        if (getter_saveActiveTabs.value.subTab == search_sub_tab.ALL) {
          fetchData(search_sub_tab.ALL);
        } else if (
          getter_saveActiveTabs.value.subTab == search_sub_tab.HEADLINE
        ) {
          fetchData(search_sub_tab.HEADLINE);
        } else if (
          getter_saveActiveTabs.value.subTab == search_sub_tab.DOCUMENT
        ) {
          fetchData(search_sub_tab.DOCUMENT);
        }
      } else if (getter_saveActiveTabs.value.mainTab == search_tab.COMPANIES) {
        fetchData(search_tab.COMPANIES);
      } else if (getter_saveActiveTabs.value.mainTab == search_tab.USERS) {
        fetchData(search_tab.USERS);
      }
    }
    function searchCriteriaChanged(tab, subTab) {
      searchFor.value = route.params.searchFor;
      switch (tab) {
        case appConstants.search_tabs.CONTENT: {
          switch (subTab) {
            case search_sub_tab.ALL:
              router.push({
                name: appConstants.routes.SEARCH_CONTENT,
                params: {
                  searchFor: searchFor.value,
                },
              });
              break;
            case search_sub_tab.HEADLINE:
              router.push({
                name: appConstants.routes.SEARCH_HEADLINES,
                params: {
                  searchFor: searchFor.value,
                },
              });
              break;
            case search_sub_tab.DOCUMENT:
              router.push({
                name: appConstants.routes.SEARCH_DOCUMENTS,
                params: {
                  searchFor: searchFor.value,
                },
              });
              break;
          }
          break;
        }
        case appConstants.search_tabs.COMPANIES:
          router.push({
            name: appConstants.routes.SEARCH_BUSINESS,
            params: {
              searchFor: searchFor.value,
            },
          });
          break;
        case appConstants.search_tabs.USERS:
          router.push({
            name: appConstants.routes.SEARCH_PROFILE,
            params: {
              searchFor: searchFor.value,
            },
          });
          break;
      }
    }
    function fetchData(text) {
      // searchFor.value = getter_searchString.value.data;
      searchFor.value = route.params.searchFor;
      if (text == search_sub_tab.ALL) {
        let data = {
          query: searchFor.value,
          type: search_tab.CONTENT,
          filter: search_sub_tab.ALL,
        };
        store.dispatch("search/action_getSearchData", data).then(() => {});
      } else if (text == search_sub_tab.HEADLINE) {
        let data = {
          query: searchFor.value,
          type: search_tab.CONTENT,
          filter: search_sub_tab.HEADLINE,
        };

        store.dispatch("search/action_getSearchData", data).then(() => {});
      } else if (text == search_sub_tab.DOCUMENT) {
        let data = {
          query: searchFor.value,
          type: search_tab.CONTENT,
          filter: search_sub_tab.DOCUMENT,
        };
        store.dispatch("search/action_getSearchData", data).then(() => {});
      } else if (text == search_tab.COMPANIES) {
        let data = {
          query: searchFor.value,
          type: search_tab.VENDOR,
          filter: search_sub_tab.ALL,
        };
        store.dispatch("search/action_getCompaniesData", data);
      } else if (text == search_tab.USERS) {
        let data = {
          query: searchFor.value,
          type: search_tab.USERS,
          filter: search_sub_tab.ALL,
        };
        store.dispatch("search/action_getUsersData", data);
      }
    }
    function arrangeData(json) {
      let array = [];
      for (let i = 0; i < json.length; i++) {
        let innerArray = json[i].hits.hits;
        for (let index = 0; index < innerArray.length; index++) {
          array.push(innerArray[index]);
        }
      }
      array.sort((a, b) => {
        if (a._score < b._score) return 1;
        if (a._score > b._score) return -1;
        return 0;
      });
      return array;
    }
    function clear() {
      searchFor.value = "";
    }

    // function(){
    //         switch (tab) {
    //     case search_tab.CONTENT:
    //       switch (subtab) {
    //         case search_sub_tab.ALL:
    //           break;
    //         case search_sub_tab.HEADLINE:
    //           break;
    //         case search_sub_tab.DOCUMENT:
    //           break;
    //         default:
    //           break;
    //       }
    //       break;
    //     case search_sub_tab.COMPANIES:
    //       break;
    //     case search_sub_tab.DOCUUSERSMENT:
    //       break;
    //     case search_sub_tab.ALL:
    //       break;
    //     default:
    //       break;
    //   }
    // }

    return {
      search,
      searchFor,
      activeSubTab,
      activeTab,
      search_tab,
      search_sub_tab,
      getter_searchData,
      getter_companiesData,
      getter_usersData,
      getter_saveActiveTabs,
      getter_searchString,
      isSearchClick,
      searchData,
      fetch,
      searchFromHeader,
      fetchData,
      arrangeData,
      clear,
      searchCriteriaChanged,
    };
  },
};
</script>

<!--<style scoped>
@import url("https://css.gg/more-vertical.css");
</style>-->
