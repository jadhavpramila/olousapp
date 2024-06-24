<template lang="">
  <div class="form-container">
    <div class="max-w-[80rem] md:mx-auto antialiased pb-[3rem] h-full">
      <div class="flex items-center justify-between">
        <!-- input for search -->
        <!-- {{ getter_searchString }} -->
        <div
          class="flex items-center btn-focus w-full md:w-1/3 relative block lg:hidden md:hidden"
        >
          <input
            v-model="searchFor"
            type="text"
            ref="search"
            v-on:keyup="isSearchClick($event)"
            class="form-control"
            placeholder="Olous Search"
          />
          <button
            v-if="searchFor != null && searchFor.length > 0"
            class="lg:h-[2.6rem] md:h-[2.1rem] sm:h-[1.8rem] mt-1 h-[1.8rem] px-3 rounded-md absolute right-2 clear"
          >
            <img @click="clear()" src="../../assets/clear.svg" alt="" />
          </button>
          <button
            @click="searchData()"
            class="h-[3rem] px-3 rounded-md absolute right-0"
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
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <line
                  x1="8"
                  y1="8"
                  transform="translate(17 17)"
                  fill="none"
                  stroke="#000"
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
      <div class="">
        <!-- {{getter_searchString}} -->
        <!-- Tabs -->
        <div class="flex tab-overflow justify-between">
          <div
            class="flex overflow-x-scroll space-x-5 pb-0 mb-[10px] tab-overflow"
          >
            <!-- <div
              @click="
                searchCriteriaChanged(search_tab.CONTENT, search_sub_tab.ALL)
              "
              :class="{
                active: getter_saveActiveTabs.mainTab == search_tab.CONTENT,
              }"
              class="tab w-[6.375rem] py-2"
            >
              Content
            </div> -->
            <button
              id="companies"
              @click="
                searchCriteriaChanged(search_tab.COMPANIES, search_sub_tab.ALL)
              "
              :class="{
                active: getter_saveActiveTabs.mainTab == search_tab.COMPANIES,
              }"
              class="btn cursor-pointer w-[6.375rem] flex items-center justify-center"
            >
              Business
            </button>
            <!-- USERS -->
            <button
              id="users"
              @click="
                searchCriteriaChanged(search_tab.USERS, search_sub_tab.ALL)
              "
              :class="{
                active: getter_saveActiveTabs.mainTab == search_tab.USERS,
              }"
              class="btn cursor-pointer w-[6.375rem] flex items-center justify-center"
            >
              People
            </button>
          </div>
          <div>
            <div
              class="flex items-center btn-focus w-[23.5rem] relative hidden lg:block md:block mb-2"
            >
              <input
                v-model="searchFor"
                type="text"
                ref="search"
                v-on:keyup="isSearchClick($event)"
                class="form-control h-[40px] mt-[0px]"
                placeholder="Olous Search"
              />
              <button
                v-if="searchFor != null && searchFor.length > 0"
                class="lg:h-[2.6rem] md:h-[2.1rem] sm:h-[1.8rem] h-[1.8rem] mt-1 px-3 rounded-md absolute right-2 clear"
              >
                <img @click="clear()" src="../../assets/clear.svg" alt="" />
              </button>
              <button
                @click="searchData()"
                class="h-[3rem] px-3 rounded-md absolute right-0"
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
                      stroke="#000"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    />
                    <line
                      x1="8"
                      y1="8"
                      transform="translate(17 17)"
                      fill="none"
                      stroke="#000"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    />
                  </g>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <!-- card + ads -->
        <div class="flex-col md:flex-row md:space-x-[2.5rem] justify-between">
          <!-- card grid md:w-[43.8rem]-->
          <div class="space-y-6">
            <!-- <div
              v-if="getter_saveActiveTabs.mainTab == search_tab.CONTENT"
              class="flex space-x-10 w-full pb-5 overflow-x-auto"
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
                >Articles</span
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
                >Library</span
              >
            </div> -->
            <!-- <span v-if="getter_saveActiveTabs.mainTab == search_tab.CONTENT">
              <span v-if="getter_searchData.lNo Result Foundclearength > 0">
                <Content :details="getter_searchData" />
              </span>
              <span v-else>
                <h5>No Result Found</h5>
              </span>
            </span> -->
            <span v-if="getter_saveActiveTabs.mainTab == search_tab.COMPANIES">
              <span v-if="getter_companiesData.length > 0">
                <!-- <Companies :details="getter_companiesData" /> -->
                <div
                  class="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pb-4"
                >
                  <div
                    v-for="(detail, index) in getter_companiesData"
                    :key="index"
                    class="w-full"
                  >
                    <BusinessSingleview :details="detail"></BusinessSingleview>
                  </div>
                </div>
              </span>
              <span v-else>
                <h5 class="app-text-color-secondary">No Result Found</h5>
              </span>
            </span>
            <span v-if="getter_saveActiveTabs.mainTab == search_tab.USERS">
              <span v-if="getter_usersData.length > 0">
                <Users :details="getter_usersData" />
              </span>
              <span v-else>
                <h5 class="app-text-color-secondary">No Result Found</h5>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Content from "./Content.vue";
// import Companies from "./Companies.vue";
import Users from ".//Users.vue";
import Documents from ".//Documents.vue";
import Ad from "/src/components/Ads/Ad.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
import appConstants from "../../appConstants.js";
import { shallowRef } from "@vue/reactivity";
import Skeleton from "primevue/skeleton";
import { useStore } from "vuex";
import { ref, computed } from "vue";
import { getCurrentInstance } from "vue";
import { useRoute, useRouter } from "vue-router";
import BusinessSingleview from "../Business/BusinessSingleview.vue";

export default {
  name: "SearchChild",
  components: {
    Content,
    // Companies,
    BusinessSingleview,
    Users,
    Documents,
    Ad,
    Skeleton,
  },
  // props: ["query"],
  // computed: {
  //   ...mapGetters("search", [
  //     "getter_searchData",
  //     "getter_companiesData",
  //     "getter_usersData",
  //     "getter_saveActiveTabs",
  //     "getter_searchString",
  //   ]),
  //   ...mapMutations("search", [
  //     "commit_searchData",
  //     "commit_companiesData",
  //     "commit_usersData",
  //   ]),
  // },

  async setup(props, context) {
    const route = useRoute();
    const router = useRouter();
    const app = getCurrentInstance();
    // const $emitter = app.appContext.config.globalProperties.emitter;

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

    await fromURLSetTab();

    function getURLparamValue() {
      if (route.params.searchFor == undefined) {
        return "";
      } else {
        let query = route.params.searchFor;
        query = query.replace(/-/g, " ");
        return query;
      }
    }

    async function fromURLSetTab() {
      searchFor.value = getURLparamValue();

      switch (route.name) {
        // case appConstants.routes.DEFAULT_SEARCH_CONTENT:
        // case appConstants.routes.SEARCH_CONTENT:
        //   store.commit("search/commit_saveActiveTabs", {
        //     mainTab: appConstants.search_tabs.CONTENT,
        //     subTab: appConstants.search_sub_tabs.ALL,
        //   });
        //   break;

        // case appConstants.routes.DEFAULT_SEARCH_HEADLINES:
        // case appConstants.routes.SEARCH_HEADLINES:
        //   store.commit("search/commit_saveActiveTabs", {
        //     mainTab: appConstants.search_tabs.CONTENT,
        //     subTab: appConstants.search_sub_tabs.HEADLINE,
        //   });
        //   break;

        // case appConstants.routes.DEFAULT_SEARCH_DOCUMENTS:
        // case appConstants.routes.SEARCH_DOCUMENTS:
        //   store.commit("search/commit_saveActiveTabs", {
        //     mainTab: appConstants.search_tabs.CONTENT,
        //     subTab: appConstants.search_sub_tabs.DOCUMENT,
        //   });
        //   break;

        case appConstants.routes.DEFAULT_SEARCH_BUSINESS:
        case appConstants.routes.SEARCH_BUSINESS:
          store.commit("search/commit_saveActiveTabs", {
            mainTab: appConstants.search_tabs.COMPANIES,
            subTab: appConstants.search_sub_tabs.ALL,
          });
          break;
        case appConstants.routes.DEFAULT_SEARCH_PROFILE:
        case appConstants.routes.SEARCH_PROFILE:
          store.commit("search/commit_saveActiveTabs", {
            mainTab: appConstants.search_tabs.USERS,
            subTab: appConstants.search_sub_tabs.ALL,
          });
          break;

        default:
          store.commit("search/commit_saveActiveTabs", {
            mainTab: appConstants.search_tabs.COMPANIES,
            subTab: appConstants.search_sub_tabs.ALL,
          });
      }
      await loadSearchDataOnPageLoad();
    }

    function isSearchClick(e) {
      if (e.keyCode === 13) {
        searchData();
      }
    }
    function searchData() {
      let sendQueryParam = searchFor.value.trim().slice();
      sendQueryParam = sendQueryParam.replace(/\s+/g, "-");
      if (searchFor.value) {
        switch (router.currentRoute.value.name) {
          case appConstants.routes.SEARCH_CONTENT:
          case appConstants.routes.DEFAULT_SEARCH_CONTENT:
            router.push({
              name: appConstants.routes.SEARCH_CONTENT,
              params: { searchFor: sendQueryParam },
            });
            break;

          case appConstants.routes.SEARCH_HEADLINES:
          case appConstants.routes.DEFAULT_SEARCH_HEADLINES:
            router.push({
              name: appConstants.routes.SEARCH_HEADLINES,
              params: { searchFor: sendQueryParam },
            });
            break;

          case appConstants.routes.SEARCH_DOCUMENTS:
          case appConstants.routes.DEFAULT_SEARCH_DOCUMENTS:
            router.push({
              name: appConstants.routes.SEARCH_DOCUMENTS,
              params: { searchFor: sendQueryParam },
            });
            break;

          case appConstants.routes.SEARCH_BUSINESS:
          case appConstants.routes.DEFAULT_SEARCH_BUSINESS:
            router.push({
              name: appConstants.routes.SEARCH_BUSINESS,
              params: { searchFor: sendQueryParam },
            });
            break;

          case appConstants.routes.SEARCH_PROFILE:
          case appConstants.routes.DEFAULT_SEARCH_PROFILE:
            router.push({
              name: appConstants.routes.SEARCH_PROFILE,
              params: { searchFor: sendQueryParam },
            });
            break;
        }
        // searchFor.value =  searchFor.value.replace(/-/g, ' ');
        // });
      } else {
        searchFor.value = "";
        search.value.focus();
      }

      // if (searchFor.value) {
      //   if (router.currentRoute.value.name == appConstants.routes.SEARCH) {
      //     router.push({
      //       name: appConstants.routes.SEARCH_CONTENT,
      //       params: { searchFor: searchFor.value },
      //     });
      //   } else {
      //     router.push({
      //       name: router.currentRoute.value.name,
      //       params: { searchFor: searchFor.value },
      //     });
      //   }

      // } else {
      //   searchFor.value = "";
      //   search.value.focus();
      // }
    }
    // function fetch() {
    //   store
    //     .dispatch("search/action_setSearchString", searchFor.value)
    //     .then(() => {
    //       if (getter_saveActiveTabs.value.mainTab == search_tab.CONTENT) {
    //         fetchData(getter_saveActiveTabs.value.subTab);
    //       } else if (
    //         getter_saveActiveTabs.value.mainTab == search_tab.COMPANIES
    //       ) {
    //         fetchData(search_tab.COMPANIES);
    //       } else if (getter_saveActiveTabs.value.mainTab == search_tab.USERS) {
    //         fetchData(search_tab.USERS);
    //       }
    //     });
    // }

    async function loadSearchDataOnPageLoad() {
      // searchFor.value = getter_searchString.value.data;
      searchFor.value = getURLparamValue();
      // if (getter_saveActiveTabs.value.mainTab == search_tab.CONTENT) {
      //   if (getter_saveActiveTabs.value.subTab == search_sub_tab.ALL) {
      //     await fetchData(search_sub_tab.ALL);
      //   } else if (
      //     getter_saveActiveTabs.value.subTab == search_sub_tab.HEADLINE
      //   ) {
      //     await fetchData(search_sub_tab.HEADLINE);
      //   } else if (
      //     getter_saveActiveTabs.value.subTab == search_sub_tab.DOCUMENT
      //   ) {
      //     await fetchData(search_sub_tab.DOCUMENT);
      //   }
      // } else
      if (getter_saveActiveTabs.value.mainTab == search_tab.COMPANIES) {
        await fetchData(search_tab.COMPANIES);
      } else if (getter_saveActiveTabs.value.mainTab == search_tab.USERS) {
        await fetchData(search_tab.USERS);
      }
    }
    function searchCriteriaChanged(tab, subTab) {
      let search_query = "";
      //searchFor.value =  searchFor.value.replace(/\s+/g, '-');
      if (searchFor.value.trim() != "") {
        search_query = searchFor.value.trim();
        search_query = search_query.replace(/\s+/g, "-");
      } else {
        search_query = getURLparamValue();
        searchFor.value = getURLparamValue();
      }

      switch (tab) {
        case search_tab.CONTENT:
          switch (subTab) {
            case search_sub_tab.ALL:
              if (search_query != null && search_query.trim() != "") {
                router.push({
                  name: appConstants.routes.SEARCH_CONTENT,
                  params: {
                    searchFor: search_query,
                  },
                });
              } else {
                router.push({
                  name: appConstants.routes.DEFAULT_SEARCH_CONTENT,
                });
              }
              break;

            case search_sub_tab.HEADLINE:
              if (search_query != null && search_query.trim() != "") {
                router.push({
                  name: appConstants.routes.SEARCH_HEADLINES,
                  params: {
                    searchFor: search_query,
                  },
                });
              } else {
                router.push({
                  name: appConstants.routes.DEFAULT_SEARCH_HEADLINES,
                });
              }
              break;

            case search_sub_tab.DOCUMENT:
              if (search_query != null && search_query.trim() != "") {
                router.push({
                  name: appConstants.routes.SEARCH_DOCUMENTS,
                  params: {
                    searchFor: search_query,
                  },
                });
              } else {
                router.push({
                  name: appConstants.routes.DEFAULT_SEARCH_DOCUMENTS,
                });
              }
              break;
          }
          break;

        case search_tab.COMPANIES:
          if (search_query != null && search_query.trim() != "") {
            router.push({
              name: appConstants.routes.SEARCH_BUSINESS,
              params: {
                searchFor: search_query,
              },
            });
          } else {
            router.push({
              name: appConstants.routes.DEFAULT_SEARCH_BUSINESS,
            });
          }

          break;

        case search_tab.USERS:
          if (search_query != null && search_query.trim() != "") {
            router.push({
              name: appConstants.routes.SEARCH_PROFILE,
              params: {
                searchFor: search_query,
              },
            });
          } else {
            router.push({
              name: appConstants.routes.DEFAULT_SEARCH_PROFILE,
            });
          }
          break;
      }
    }
    async function fetchData(text) {
      // searchFor.value = getter_searchString.value.data;
      searchFor.value = getURLparamValue();
      // searchFor.value =  searchFor.value.replace(/-/g, ' ');
      // if (text == search_sub_tab.ALL) {
      //   let data = {
      //     query: searchFor.value,
      //     type: search_tab.CONTENT,
      //     filter: search_sub_tab.ALL,
      //   };
      //   // console.log("data", data)
      //   await store.dispatch("search/action_getSearchData", data);
      //   // .then(() => {

      //   // });
      // } else if (text == search_sub_tab.HEADLINE) {
      //   let data = {
      //     query: searchFor.value,
      //     type: search_tab.CONTENT,
      //     filter: search_sub_tab.HEADLINE,
      //   };

      //   await store.dispatch("search/action_getSearchData", data);
      // } else if (text == search_sub_tab.DOCUMENT) {
      //   let data = {
      //     query: searchFor.value,
      //     type: search_tab.CONTENT,
      //     filter: search_sub_tab.DOCUMENT,
      //   };
      //   await store.dispatch("search/action_getSearchData", data);
      // } else
      if (text == search_tab.COMPANIES) {
        let data = {
          query: searchFor.value,
          type: search_tab.VENDOR,
          filter: search_sub_tab.ALL,
        };
        await store.dispatch("search/action_getCompaniesData", data);
      } else if (text == search_tab.USERS) {
        let data = {
          query: searchFor.value,
          type: search_tab.USERS,
          filter: search_sub_tab.ALL,
        };
        await store.dispatch("search/action_getUsersData", data);
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
      //console.log("arranged array", array)
      return array;
    }
    function clear() {
      searchFor.value = "";
      search.value.focus();
      if (getter_saveActiveTabs.value.mainTab == search_tab.USERS) {
        router.push({
          name: appConstants.routes.DEFAULT_SEARCH_PROFILE,
        });
      } else if (getter_saveActiveTabs.value.mainTab == search_tab.COMPANIES) {
        router.push({
          name: appConstants.routes.DEFAULT_SEARCH_BUSINESS,
        });
      }
    }

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
      fromURLSetTab,
      isSearchClick,
      searchData,
      loadSearchDataOnPageLoad,
      fetchData,
      arrangeData,
      clear,
      searchCriteriaChanged,
    };
  },
};
</script>
<style>
/* .tab-overflow .active {
  background-color: black !important;
  color: #fff;
} */
</style>
<!--<style scoped>
@import url("https://css.gg/more-vertical.css");
</style>-->
