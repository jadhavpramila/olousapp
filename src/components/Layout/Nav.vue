<template>
  <div v-if="isHeaderVisible" class="cls-nav" :style="getBackgroundColor">
    <div class="flex w-full flex-row left-right-page-padding pt-2 app-width">
      <div class="nav flex w-full justify-between">
        <input type="checkbox" id="nav-check" />
        <div class="nav-header">
          <div class="nav-title">
            <img
              @click="homePage()"
              src="../../assets/olous_logo_black.svg"
              alt=""
              class="cursor-pointer lg:w-40 md:w-40 w-32"
            />
          </div>
        </div>
        <!-- <div class="nav-btn flex h-full items-center justify-center mr-2">
          <label for="nav-check">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div> -->
        <div class="gap-2 justify-content-center lg:hidden md:hidden block">
          <Button @click="visibleRight = true" icon="pi pi-bars"></Button>
        </div>
        <Sidebar
          v-model:visible="visibleRight"
          position="right"
          class="sidebar-item"
        >
          <div
            v-if="getter_isUserLoggedIn"
            :class="isOnViewProfilepage ? 'active' : ''"
            class="grid grid-cols-1 mb-3 rounded-[8px] p-1 box-shadow nav-links-items w-full"
          >
            <a
              class="lg:p-0 md:p-0 p-3 px-3 py-1 flex"
              @click="clickViewProfile()"
            >
              <div class="flex items-center space-x-2">
                <div class="rounded-full items-center w-7 h-7">
                  <img
                    v-if="hasProfileImage()"
                    :src="getProfileImage()"
                    class="rounded-full w-7 h-7 object-cover"
                  />
                  <div
                    class="rounded-full border border-white lg:h-7 lg:w-7 md:h-7 md:w-7 h-5 w-5 text-sm text-center flex justify-center items-center app-bg-color-primary app-text-on-bg-primary-color"
                    v-else
                  >
                    {{ getUserName() }}
                  </div>
                </div>
                <div class="flex flex-col">
                  <span class="text-normal font-bold leading-3">
                    {{ getter_user.first_name }} {{ getter_user.last_name }}
                  </span>
                  <span class="text-small font-normal">View Profile</span>
                </div>
              </div>
            </a>
          </div>
          <div v-if="getter_isUserLoggedIn" class="grid gap-3">
            <a
              class=""
              @click="timelineIconClick()"
              v-if="getter_isUserLoggedIn"
            >
              <div
                class="nav-links-items flex items-center space-x-2 py-1 w-full box-shadow rounded-[8px]"
                :class="isOnTimelinePage ? 'active' : ''"
              >
                <!-- <JobsIcon /> -->
                <div class="w-5 h-5">
                  <img
                    v-if="!isOnTimelinePage"
                    src="../../assets/timeline_v1.svg"
                    alt="timeline"
                  />
                  <img
                    v-if="isOnTimelinePage"
                    src="../../assets/Timeline_blue.svg"
                    alt="timeline"
                  />
                </div>
                <span class="text-normal">Timeline</span>
              </div>
            </a>
            <a @click="jobIconClick()" v-if="getter_isUserLoggedIn">
              <div
                class="nav-links-items flex items-center space-x-2 py-1 w-full box-shadow rounded-[8px]"
                :class="isOnJobListPage ? 'active' : ''"
              >
                <!-- <JobsIcon /> -->
                <div class="w-5 h-5">
                  <img
                    v-if="!isOnJobListPage"
                    src="../../assets/Jobs_v1.svg"
                    alt="jobs"
                  />
                  <img
                    v-if="isOnJobListPage"
                    src="../../assets/Jobs_blue.svg"
                    alt="jobsClick"
                  />
                </div>
                <span class="text-normal">Jobs</span>
              </div>
            </a>
            <a
              @click="businessIconClick()"
              class=""
              v-if="getter_isUserLoggedIn"
            >
              <div
                class="nav-links-items flex items-center space-x-2 py-1 w-full box-shadow rounded-[8px]"
                :class="isOnBusinessListPage ? 'active' : ''"
              >
                <div class="w-5 h-5">
                  <img
                    v-if="!isOnBusinessListPage"
                    src="../../assets/Business_v1.svg"
                    alt="business"
                  />
                  <img
                    v-if="isOnBusinessListPage"
                    src="../../assets/Business_blue.svg"
                    alt="business"
                  />
                </div>

                <span class="text-normal">Business</span>
              </div></a
            >
            <a
              @click="messagingIconClick()"
              class=""
              v-if="getter_isUserLoggedIn"
              ><div
                class="nav-links-items flex items-center space-x-2 py-1 w-full box-shadow rounded-[8px]"
                :class="isOnMessagingPage ? 'active' : ''"
              >
                <div class="w-5 h-5">
                  <img
                    v-if="!isOnMessagingPage"
                    src="../../assets/Message_v1.svg"
                    alt="message"
                  />
                  <img
                    v-if="isOnMessagingPage"
                    src="../../assets/Message_blue.svg"
                    alt="message"
                  />
                </div>

                <span class="text-normal">Message</span>
              </div></a
            >
            <a @click="searchIconClick()" class="" v-if="getter_isUserLoggedIn"
              ><div
                class="nav-links-items flex items-center space-x-2 py-1 w-full box-shadow rounded-[8px]"
                :class="isOnSearchPage ? 'active' : ''"
              >
                <div class="w-5 h-5">
                  <img
                    v-if="!isOnSearchPage"
                    src="../../assets/Search_v1.svg"
                    alt="search"
                  />
                  <img
                    v-if="isOnSearchPage"
                    src="../../assets/Search_blue.svg"
                    alt="search"
                  />
                </div>

                <span class="text-normal">Search</span>
              </div></a
            >
            <a class="" @click="openSetting()" v-if="getter_isUserLoggedIn">
              <div
                :class="isOnSettingPage ? 'active' : ''"
                class="nav-links-items flex space-x-2 nav-links-items items-center rounded-[8px] w-full box-shadow rounded-[8px]"
              >
                <div class="rounded-full items-start w-5 h-5">
                  <img
                    v-if="isOnSettingPage"
                    src="../../assets/Settings_Click_v1.svg"
                    class="rounded-full w-5 h-5 object-cover"
                  />
                  <img
                    v-if="!isOnSettingPage"
                    src="../../assets/Settings_v1.svg"
                    class="rounded-full w-5 h-5 object-cover"
                  />
                </div>
                <span class="text-normal font-medium">Setting</span>
              </div>
            </a>
          </div>
          <div
            class="grid grid-cols-1 gap-3 p-1 items-center"
            v-if="!getter_isUserLoggedIn"
          >
            <a class="" @click="jobIconClick()">
              <div
                class="nav-links-items flex items-center justify-start space-x-2 pl-3 py-1 w-full box-shadow rounded-[8px]"
                :class="isOnJobListPage ? 'active' : ''"
              >
                <div class="w-5 h-5">
                  <img
                    v-if="!isOnJobListPage"
                    src="../../assets/Jobs_v1.svg"
                    alt="jobs"
                  />
                  <img
                    v-if="isOnJobListPage"
                    src="../../assets/Jobs_blue.svg"
                    alt="jobsClick"
                  />
                </div>
                <span class="text-normal">Jobs</span>
              </div>
            </a>
            <a @click="searchIconClick()" class=""
              ><div
                class="flex items-center justify-start nav-links-items pl-3 py-1 space-x-2 w-full box-shadow rounded-[8px]"
                :class="isOnSearchPage ? 'active' : ''"
              >
                <div class="w-5 h-5">
                  <img
                    v-if="!isOnSearchPage"
                    src="../../assets/Search_v1.svg"
                    alt="search"
                  />
                  <img
                    v-if="isOnSearchPage"
                    src="../../assets/Search_blue.svg"
                    alt="search"
                  />
                </div>

                <span class="text-normal">Search</span>
              </div></a
            >
            <a class="" v-if="!getter_isUserLoggedIn && checkIsUnsubscribe()">
              <div
                class="flex items-center justify-start nav-links-items pl-3 py-1 space-x-2 w-full box-shadow rounded-[8px]"
                @click="signInPage()"
              >
                <div class="w-5 h-5">
                  <img src="../../assets/Profile_v1.svg" alt="" />
                </div>

                <span class="text-normal ml-2">Sign In</span>
              </div>
              <!-- <button
              class="text-xl px-4 lg:h-[2.6rem] md:h-[2.1rem] sm:h-[1.8rem] h-[1.8rem] cursor-pointer"
             
            >
              Sign In
            </button> -->
            </a>
          </div>
          <!-- <div class="grid grid-cols-2 gap-3"></div> -->
        </Sidebar>

        <div
          class="nav-links lg:space-x-1 md:space-x-1 space-x-0 lg:flex md:flex sm:hidden hidden"
        >
          <a
            class="lg:p-0 md:p-0 px-3 py-1"
            @click="timelineIconClick()"
            v-if="getter_isUserLoggedIn"
          >
            <div
              class="nav-links-items flex flex-col items-center"
              :class="isOnTimelinePage ? 'active' : ''"
            >
              <!-- <JobsIcon /> -->
              <div class="flex h-6 items-center justify-center w-6">
                <img
                  v-if="!isOnTimelinePage"
                  src="../../assets/timeline_v1.svg"
                  alt="jobs"
                />
                <img
                  v-if="isOnTimelinePage"
                  src="../../assets/Timeline_blue.svg"
                  alt="jobsClick"
                />
              </div>
              <span class="text-[12px]">Timeline</span>
            </div>
          </a>
          <a
            class="lg:p-0 md:p-0 px-3 py-1"
            @click="jobIconClick()"
            v-if="getter_isUserLoggedIn"
          >
            <div
              class="nav-links-items flex flex-col items-center"
              :class="isOnJobListPage ? 'active' : ''"
            >
              <div class="flex h-6 items-center justify-center w-6">
                <img
                  v-if="!isOnJobListPage"
                  src="../../assets/Jobs_v1.svg"
                  alt="jobs"
                />
                <img
                  v-if="isOnJobListPage"
                  src="../../assets/Jobs_blue.svg"
                  alt="jobsClick"
                />
              </div>
              <span class="text-[12px]">Jobs</span>
            </div>
          </a>
          <a
            @click="searchIconClick()"
            class="lg:p-0 md:p-0 p-3 px-3 py-1"
            v-if="getter_isUserLoggedIn"
            ><div
              class="nav-links-items flex flex-col items-center"
              :class="isOnSearchPage ? 'active' : ''"
            >
              <div class="flex h-6 items-center justify-center w-6">
                <img
                  v-if="!isOnSearchPage"
                  src="../../assets/Search_v1.svg"
                  alt="search"
                />
                <img
                  v-if="isOnSearchPage"
                  src="../../assets/Search_blue.svg"
                  alt="search"
                />
              </div>

              <span class="text-[12px]">Search</span>
            </div></a
          >
          <a
            @click="businessIconClick()"
            v-if="getter_isUserLoggedIn"
            class="lg:p-0 md:p-0 p-3 px-3 py-1"
          >
            <div
              class="nav-links-items flex flex-col items-center"
              :class="isOnBusinessListPage ? 'active' : ''"
            >
              <div class="flex h-6 items-center justify-center w-6">
                <img
                  v-if="!isOnBusinessListPage"
                  src="../../assets/Business_v1.svg"
                  alt="business"
                />
                <img
                  v-if="isOnBusinessListPage"
                  src="../../assets/Business_blue.svg"
                  alt="business"
                />
              </div>

              <span class="text-[12px]">Business</span>
            </div></a
          >
          <a
            @click="messagingIconClick()"
            v-if="getter_isUserLoggedIn"
            class="lg:p-0 md:p-0 p-3 px-3 py-1"
            ><div
              class="nav-links-items flex flex-col items-center"
              :class="isOnMessagingPage ? 'active' : ''"
            >
              <div class="flex h-6 items-center justify-center w-6">
                <img
                  v-if="!isOnMessagingPage"
                  src="../../assets/Message_v1.svg"
                  alt="message"
                />
                <img
                  v-if="isOnMessagingPage"
                  src="../../assets/Message_blue.svg"
                  alt="message"
                />
              </div>

              <span class="text-[12px]">Message</span>
            </div></a
          >
          <a class="lg:p-0 md:p-0 p-3 px-3 py-1" v-if="getter_isUserLoggedIn">
            <div
              :class="isOnViewProfilepage ? 'active' : ''"
              class="flex flex-col justify-center items-center nav-links-items profile"
              @mouseenter="display = block"
              @mouseleave="display = none"
            >
              <div class="navbar">
                <div class="dropdown">
                  <div
                    class="dropbtn rounded-full items-center w-6 h-6"
                    @mouseenter="display = block"
                    @mouseleave="display = none"
                  >
                    <img
                      v-if="hasProfileImage()"
                      :src="getProfileImage()"
                      class="rounded-full w-6 h-6 object-cover"
                    />
                    <div
                      class="rounded-full border border-white lg:h-6 lg:w-6 md:h-6 md:w-6 h-5 w-5 text-sm text-center flex justify-center items-center app-bg-color-primary app-text-on-bg-primary-color"
                      v-else
                      @mouseenter="display = block"
                      @mouseleave="display = none"
                    >
                      {{ getUserName() }}
                    </div>

                    <!-- <i class="fa fa-caret-down"></i> -->
                  </div>
                  <div
                    class="dropdown-content bg-white text-gray-900 rounded-lg divide-gray-400 divide-y"
                    :style="{ display: display }"
                  >
                    <CustomDropdown
                      :data="dropdownData"
                      @selected_dropdown_item="checkClickEvent"
                    />
                  </div>
                </div>
              </div>
              <span class="text-[12px]">Profile</span>
            </div>
            <!-- <div
              v-if="isOnViewProfilepage"
              class="bg-[#000] rounded-full mt-1 w-2 h-2"
            ></div> -->
          </a>

          <a
            class="lg:p-0 md:p-0 px-3 py-1"
            @click="jobIconClick()"
            v-if="!getter_isUserLoggedIn"
          >
            <div
              class="nav-links-items flex flex-col items-center"
              :class="isOnJobListPage ? 'active' : ''"
            >
              <div class="w-5 h-5">
                <img
                  v-if="!isOnJobListPage"
                  src="../../assets/Jobs_v1.svg"
                  alt="jobs"
                />
                <img
                  v-if="isOnJobListPage"
                  src="../../assets/Jobs_blue.svg"
                  alt="jobsClick"
                />
              </div>
              <span class="text-[12px]">Jobs</span>
            </div>
          </a>
          <a
            @click="searchIconClick()"
            class="lg:p-0 md:p-0 p-3 px-3 py-1"
            v-if="!getter_isUserLoggedIn"
            ><div
              class="nav-links-items flex flex-col items-center"
              :class="isOnSearchPage ? 'active' : ''"
            >
              <div class="w-5 h-5">
                <img
                  v-if="!isOnSearchPage"
                  src="../../assets/Search_v1.svg"
                  alt="search"
                />
                <img
                  v-if="isOnSearchPage"
                  src="../../assets/Search_blue.svg"
                  alt="search"
                />
              </div>

              <span class="text-[12px]">Search</span>
            </div></a
          >

          <a
            class="lg:p-0 md:p-0 p-3 px-3 py-1"
            v-if="!getter_isUserLoggedIn && checkIsUnsubscribe()"
          >
            <div
              class="nav-links-items flex flex-col items-center"
              @click="signInPage()"
            >
              <div class="w-5 h-5">
                <img src="../../assets/Profile_v1.svg" alt="" />
              </div>

              <span class="text-[12px]">Sign In</span>
            </div>
            <!-- <button
              class="text-xl px-4 lg:h-[2.6rem] md:h-[2.1rem] sm:h-[1.8rem] h-[1.8rem] cursor-pointer"
             
            >
              Sign In
            </button> -->
          </a>
          <!-- <div class="flex flex-row justify-end nav-items">
            <ul class=""></ul>
          </div> -->
          <!-- <a href="#">Learning</a>
          <a @click="signInPage()">Sign In</a> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import appConstants from "/src/appConstants.js";
import { mapActions, mapGetters, mapMutations } from "vuex";
import InputText from "primevue/inputtext";
import { getUserNameInitials } from "../../common/js/commonFunctions.js";
import CustomDropdown from "../common/CustomDropdown.vue";
import { encodeUUID } from "../../common/js/UUIDtoBase64.js";
import Badge from "primevue/badge";
import {
  createSignInPageURL,
  getCurrentHostName,
} from "../../common/js/webUrls.js";
import Sidebar from "primevue/sidebar";
import JobsIcon from "./JobsIcon.vue";
import Button from "primevue/button";

export default {
  name: "Nav",
  components: {
    InputText,
    CustomDropdown,
    Badge,
    JobsIcon,
    Sidebar,
    Button,
  },
  data() {
    return {
      dropdownData: [
        { display_name: "View Profile", id: "view_profile" },
        //{ display_name: "Logout", id: "logout" },
        { display_name: "Setting", id: "setting" },
      ],
      user: {},
      searchFor: "",
      display: "none",
      isSearchVisible: false,
      isSearchIconVisible: false,
      isHomePage: false,
      isOnTimelinePage: false,
      isOnJobListPage: false,
      isOnBusinessListPage: false,
      isOnBoardPage: false,
      isOnSearchPage: false,
      isOnMessagingPage: false,
      polling: null,
      soundurl:
        "http://soundbible.com/mp3/analog-watch-alarm_daniel-simion.mp3",
      IsNotify: false,
      navActive: false,
      isShowDot: false,
      isOnViewProfilepage: false,
      isShowSignIn: false,
      visibleRight: false,
      isOnSettingPage: false,
    };
  },
  computed: {
    ...mapGetters("login", [
      "getter_user",
      "getter_isUserLoggedIn",
      // "getter_showNav",
    ]),
    ...mapGetters("search", ["getter_searchString"]),
    ...mapGetters("messaging", ["getter_unread_msg_count"]),

    isHeaderVisible() {
      // console.log("getter_showNav =>", this.getter_showNav);
      // if (this.getter_showNav == false) {
      //   return false;
      // } else {

      if (
        this.$route.name == appConstants.routes.MOBILE ||
        this.$route.name == appConstants.routes.MOBILENEW_CONVERSATION ||
        this.$route.name == appConstants.routes.MOBILECONVERSATION ||
        this.$route.name == appConstants.routes.MOBILEMESSAGING ||
        this.$route.name == appConstants.routes.LOGINWITHPARAM ||
        this.$route.name == appConstants.routes.JOBEXTERNAL ||
        this.$route.name == appConstants.routes.EDUCATION ||
        this.$route.name == appConstants.routes.EXPERIENCE
      ) {
        return false;
      }
      if (
        this.$route.name == appConstants.routes.CONVERSATION ||
        this.$route.name == appConstants.routes.LOGIN ||
        this.$route.name == appConstants.routes.FORGOTPASSWORD ||
        this.$route.name == appConstants.routes.SIGNUP ||
        this.$route.name == appConstants.routes.NEW_CONVERSATION
      ) {
        if (
          this.$route.meta.hideHeader == appConstants.hideHeader.ALL ||
          this.$route.meta.hideHeader == appConstants.hideHeader.LAPTOP ||
          this.$route.meta.hideHeader == undefined
        ) {
          if (window.innerWidth > appConstants.css_breakpoints.MD) {
            // console.log("if");
            return true;
          } else {
            // console.log("else");
            return false;
          }
        } else {
        }
      } else {
        if (this.$route.name == appConstants.routes.ONBOARD) {
          return false;
        } else {
          return true;
        }
      }
      // }
    },
    getBackgroundColor() {
      if (this.$route.name == appConstants.routes.HOME) {
        return "background-color: #fff;";
      } else {
        return "background-color: #fff;";
      }
    },
  },
  watch: {
    getter_user(val) {
      this.user = val;
    },
    $route(to, from) {
      //Set search bar visibility
      if (
        to.name == appConstants.routes.SEARCH_CONTENT ||
        to.name == appConstants.routes.SEARCH_HEADLINES ||
        to.name == appConstants.routes.SEARCH_DOCUMENTS ||
        to.name == appConstants.routes.SEARCH_BUSINESS ||
        to.name == appConstants.routes.SEARCH_PROFILE ||
        to.name == appConstants.routes.DEFAULT_SEARCH_CONTENT ||
        to.name == appConstants.routes.DEFAULT_SEARCH_HEADLINES ||
        to.name == appConstants.routes.DEFAULT_SEARCH_DOCUMENTS ||
        to.name == appConstants.routes.DEFAULT_SEARCH_BUSINESS ||
        to.name == appConstants.routes.DEFAULT_SEARCH_PROFILE ||
        to.name == appConstants.routes.LOGIN
      ) {
        this.searchFor = this.$route.params.searchFor;
        this.isSearchVisible = true;
        this.isSearchIconVisible = false;
      } else {
        this.searchFor = "";
        this.isSearchVisible = false;
        this.isSearchIconVisible = true;
      }

      //check is home page
      if (this.$route.name == appConstants.routes.HOME) {
        this.isHomePage = true;
      } else {
        this.isHomePage = false;
      }

      if (this.$route.name == appConstants.routes.TIMELINE) {
        this.isOnTimelinePage = true;
      } else {
        this.isOnTimelinePage = false;
      }

      if (this.$route.name == appConstants.routes.JOBS) {
        this.isOnJobListPage = true;
      } else {
        this.isOnJobListPage = false;
      }

      if (this.$route.name == appConstants.routes.BUSINESSLIST) {
        this.isOnBusinessListPage = true;
      } else {
        this.isOnBusinessListPage = false;
      }
      if (this.$route.name == appConstants.routes.BOARDLIST) {
        this.isOnBoardPage = true;
      } else {
        this.isOnBoardPage = false;
      }
      if (this.$route.name == appConstants.routes.VIEWPROFILE) {
        this.isOnViewProfilepage = true;
      } else {
        this.isOnViewProfilepage = false;
      }

      if (
        this.$route.matched[1].name == appConstants.display_route_Name.MESSAGING
      ) {
        this.isOnMessagingPage = true;
      } else {
        this.isOnMessagingPage = false;
      }

      if (this.$route.name == appConstants.display_route_Name.SETTINGS) {
        this.isOnSettingPage = true;
      } else {
        this.isOnSettingPage = false;
      }
      //Set search icon visibility
      if (
        to.name == appConstants.routes.SEARCH_CONTENT ||
        to.name == appConstants.routes.SEARCH_HEADLINES ||
        to.name == appConstants.routes.SEARCH_DOCUMENTS ||
        to.name == appConstants.routes.SEARCH_BUSINESS ||
        to.name == appConstants.routes.SEARCH_PROFILE ||
        to.name == appConstants.routes.DEFAULT_SEARCH_CONTENT ||
        to.name == appConstants.routes.DEFAULT_SEARCH_HEADLINES ||
        to.name == appConstants.routes.DEFAULT_SEARCH_DOCUMENTS ||
        to.name == appConstants.routes.DEFAULT_SEARCH_BUSINESS ||
        to.name == appConstants.routes.DEFAULT_SEARCH_PROFILE
      ) {
        this.isSearchIconVisible = false;
        this.isOnSearchPage = true;
      } else {
        this.isSearchIconVisible = true;
        this.isOnSearchPage = false;
      }
    },
  },

  methods: {
    ...mapActions("login", ["logout"]),
    ...mapMutations("jobs", ["commit_currentJobType"]),

    // signUpRoute() {
    //   return `/${appConstants.routes.SIGNUP}`;
    // },
    timelineIconClick() {
      if (this.visibleRight == true) {
        this.visibleRight = false;
      }
      this.isTimeline = true;
      if (
        this.$router.currentRoute._value.name == appConstants.routes.TIMELINE
      ) {
        this.$router.go();
      } else {
        this.$router.push({ name: appConstants.routes.TIMELINE });
      }
    },
    jobIconClick() {
      if (this.visibleRight == true) {
        this.visibleRight = false;
      }
      if (this.$router.currentRoute._value.name == appConstants.routes.JOBS) {
        this.commit_currentJobType(appConstants.jobType.ALL);
        // store.commit("jobs/commit_currentJobType", appConstants.jobType.ALL);
        this.$router.go();
      } else {
        //store.commit("jobs/commit_currentJobType", appConstants.jobType.ALL);
        this.commit_currentJobType(appConstants.jobType.ALL);
        this.$router.push({ name: appConstants.routes.JOBS });
      }
    },

    businessIconClick() {
      if (this.visibleRight == true) {
        this.visibleRight = false;
      }
      if (
        this.$router.currentRoute._value.name ==
        appConstants.routes.BUSINESSLIST
      ) {
        this.$router.go();
      } else {
        this.$router.push({ name: appConstants.routes.BUSINESSLIST });
      }
    },

    boardIconClick() {
      if (
        this.$router.currentRoute._value.name == appConstants.routes.BOARDLIST
      ) {
        this.$router.go();
      } else {
        this.$router.push({ name: appConstants.routes.BOARDLIST });
      }
    },

    messagingIconClick() {
      if (this.visibleRight == true) {
        this.visibleRight = false;
      }
      if (
        this.$router.currentRoute._value.name == appConstants.routes.MESSAGING
      ) {
        // this.$router.go();
        // this.emitter.emit("messaging_icon_click");
      } else {
        this.$router.push({ name: appConstants.routes.MESSAGING }).then(() => {
          // this.emitter.emit("messaging_icon_click");
        });
      }
    },

    getBagdeValue(value) {
      let returnValue = "10+";
      if (value > 10) {
        return returnValue;
      } else {
        return value;
      }
    },

    checkClickEvent(val) {
      //console.log(val);
      if (val == "view_profile") {
        this.clickViewProfile();
        // } else if (val == "logout") {
        //   this.logoutUser();
      } else if (val == "setting") {
        this.emitter.emit("close_all_popup");
        this.$router.push({ name: appConstants.display_route_Name.SETTINGS });
        this.display = "none";
      }
    },
    openSetting() {
      this.$router.push({ name: appConstants.display_route_Name.SETTINGS });
      this.visibleRight = false;
    },
    clear() {
      this.searchFor = "";
      this.$refs.search.focus();
    },
    // loginRoute() {
    //   return `/${appConstants.routes.LOGIN}`;
    // },
    logoutUser() {
      this.stopTimerAPIFetch();
      this.logout().then(() => {
        // console.log("after logout");
        this.$router.push({ name: appConstants.routes.HOME });
        // if (
        //   this.$router.currentRoute._value.name ==
        //   appConstants.routes.HOME
        // ) {
        //   //if user on sane URl viewing other users profile
        //   this.$router.go();
        // } else {
        //   this.$router.push({ name: appConstants.routes.HOME });
        // }
      });
      this.display = "none";
    },
    clickViewProfile() {
      // if (
      //   this.$router.currentRoute._value.name == appConstants.routes.VIEWPROFILE
      // ) {
      //   //if user on sane URl viewing other users profile
      //   this.$router.go();
      // } else {
      //   this.$router.push({ name: appConstants.routes.VIEWPROFILE });
      // }
      if (this.visibleRight == true) {
        this.visibleRight = false;
      }
      //let encodedStr = encodeUUID(this.getter_user.id);
      let userSlug = this.getter_user.slug;
      // this.$store.commit("timeline/commit_scrollBarPosition", 0);
      this.$router.push({
        name: appConstants.routes.VIEWPROFILE,
        params: { user_slug: userSlug },
      });
      this.display = "none";
    },
    searchClick() {
      this.searchFor = this.searchFor.trim();
      if (this.searchFor) {
        // this.action_setSearchString(this.searchFor).then(() => {
        switch (this.$route.name) {
          case appConstants.routes.SEARCH_CONTENT:
          case appConstants.routes.DEFAULT_SEARCH_CONTENT:
            this.$router.push({
              name: appConstants.routes.SEARCH_CONTENT,
              params: { searchFor: this.searchFor },
            });
            break;

          case appConstants.routes.SEARCH_HEADLINES:
          case appConstants.routes.DEFAULT_SEARCH_HEADLINES:
            this.$router.push({
              name: appConstants.routes.SEARCH_HEADLINES,
              params: { searchFor: this.searchFor },
            });
            break;

          case appConstants.routes.SEARCH_DOCUMENTS:
          case appConstants.routes.DEFAULT_SEARCH_DOCUMENTS:
            this.$router.push({
              name: appConstants.routes.SEARCH_DOCUMENTS,
              params: { searchFor: this.searchFor },
            });
            break;

          case appConstants.routes.SEARCH_BUSINESS:
          case appConstants.routes.DEFAULT_SEARCH_BUSINESS:
            this.$router.push({
              name: appConstants.routes.SEARCH_BUSINESS,
              params: { searchFor: this.searchFor },
            });
            break;

          case appConstants.routes.SEARCH_PROFILE:
          case appConstants.routes.DEFAULT_SEARCH_PROFILE:
            this.$router.push({
              name: appConstants.routes.SEARCH_PROFILE,
              params: { searchFor: this.searchFor },
            });
            break;
        }
        // });
      } else {
        this.$refs.search.focus();
        // return false;
      }
    },
    searchIconClick() {
      if (this.visibleRight == true) {
        this.visibleRight = false;
      }
      this.$router.push({
        name: appConstants.routes.DEFAULT_SEARCH_BUSINESS,
      });
    },
    emitSearchButtonEvent(eventName) {
      // this.$emit(eventName, { searchText: this.searchFor });
      // this.emitter.emit("toggle-sidebar", this.sidebarOpen);
      // console.log("before emit =>", this.searchFor);
      // this.emitter.emit(eventName, this.searchFor);
      // this.searchFor = "";
    },
    // isSearchVisible() {
    //   if (
    //     this.$route.name == appConstants.routes.SEARCH_CONTENT ||
    //     this.$route.name == appConstants.routes.SEARCH_HEADLINES ||
    //     this.$route.name == appConstants.routes.SEARCH_DOCUMENTS ||
    //     this.$route.name == appConstants.routes.SEARCH_BUSINESS ||
    //     this.$route.name == appConstants.routes.SEARCH_PROFILE
    //   ) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // },
    homePage() {
      this.$router.push({ name: appConstants.routes.HOME });
    },
    // isHomePage() {
    //   if (this.$route.name == appConstants.routes.HOME) {
    //     return false;
    //   } else {
    //     return true;
    //   }
    // },
    signInPage() {
      // let host = getCurrentHostName();
      // let url = createSignInPageURL(host)
      // return url
      // if (this.$route.name == appConstants.routes.HOME ) {
      this.$router.push({ name: appConstants.routes.LOGIN });
      //}
      // else{

      // }
    },
    // bridgeClick() {
    //   this.$router.push({ name: appConstants.routes.JSBRIDGE });
    // },
    hasProfileImage() {
      if (this.getter_isUserLoggedIn && this.getter_user != "") {
        if (this.getter_user.profile_image != "") {
          return true;
        }
      }

      return false;
    },
    getProfileImage() {
      if (this.getter_isUserLoggedIn && this.getter_user != "") {
        if (this.getter_user.profile_image != "") {
          return this.getter_user.profile_image;
        } else {
          return "";
        }
      }
    },
    getUserName() {
      if (this.getter_isUserLoggedIn && this.getter_user != "") {
        var nameInitials = getUserNameInitials(
          this.getter_user.first_name,
          this.getter_user.last_name
        );
        return nameInitials;
      } else {
        return "";
      }
    },

    getUnreadMessageCount() {
      if (this.polling == null) {
        if (this.getter_isUserLoggedIn) {
          this.polling = setInterval(() => {
            if (this.getter_isUserLoggedIn) {
              this.$store.dispatch(
                "messaging/action_fetchUserTotalUnreadMessageCount"
              );
            } else {
              clearInterval(this.polling);
              this.polling = null;
            }
          }, 5000);
        } else {
          return;
        }
      }
    },
    checkIsUnsubscribe() {
      if (this.$route.name == appConstants.display_route_Name.UNSUBSCRIBE) {
        return false;
      } else {
        return true;
      }
    },
    // notify() {
    //   var audio = new Audio(this.soundurl);
    //   audio.loop = false;

    //   audio.load();
    //   audio.play();
    //   let timer = setInterval(function () {
    //     // audio.play();
    //     // audio.stop();
    //     audio.pause();
    //     this.IsNotify = false;
    //   }, 500);
    //   // console.log(timer);
    //   // audio.pause();
    // },

    stopTimerAPIFetch() {
      if (this.polling != null) {
        clearInterval(this.polling);
        this.polling = null;
      }
    },
  },
  mounted() {
    this.getUnreadMessageCount();
    // this.checkIsUnsubscribe();
  },
  unmounted() {
    this.stopTimerAPIFetch();
  },
  created() {
    // this.checkIsUnsubscribe();
    this.user = this.getter_user;
  },
};
</script>
<style>
nav {
  height: 50px;
  width: 100%;
  background-color: #4d4d4d;
  position: relative;
}

.nav > .nav-header {
  display: inline;
}

.nav > .nav-header > .nav-title {
  display: inline-block;
  font-size: 22px;
  color: #fff;
  padding: 10px 0px 10px 0px;
}

.nav > .nav-btn {
  display: none;
}

.nav > .nav-links {
  display: inline;
  float: right;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
}
.nav-links-items {
  height: 51px;
  width: 70px;
  background-color: #fff;
  /* color: #000 !important ; */
  justify-content: center;
  font-weight: 500;
  /* box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16); */
}

.sidebar-item .nav-links-items {
  justify-content: left;
  padding-left: 1rem;
  padding-right: 1rem;
}
.nav-links-items:hover {
  height: 51px;
  width: 70px;
  background-color: transparent;
  border-radius: 8px;
  color: #000 !important;
  font-weight: 500;
  border: none;
  box-shadow: none;
}

.sidebar-item .nav-links-items:hover {
  background: var(--app-bg-gradient);
  border: 1px solid var(--app-primary-color);
}

.nav-links-items.active {
  height: 51px;
  width: 70px;
  background-color: transparent;
  border-radius: 8px;
  color: var(--app-primary-color) !important;
  font-weight: 800;
  box-shadow: none;
}

.sidebar-item .nav-links-items.active {
  /* height: 51px;
  width: 70px;
  border-radius: 8px; */
  color: var(--app-primary-color) !important;
  background: var(--app-bg-gradient);
  font-weight: 800;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  border: 1px solid var(--app-primary-color);
}

svg:hover {
  fill: #fff !important;
  stroke: #fff !important;
}
.nav > .nav-links > a {
  display: inline-block;
  /* padding: 13px 10px 13px 10px; */
  text-decoration: none;
  color: #000;
}

.nav > .nav-links > a:hover {
  background-color: #fff;
  color: var(--app-primary-color);
  font-weight: 700;
}

.nav > #nav-check {
  display: none;
}
.box-shadow {
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
}
@media (max-width: 600px) {
  .nav > .nav-btn {
    display: inline-block;
    position: absolute;
    right: 0%;
    top: 0px;
  }
  .nav > .nav-btn > label {
    display: inline-block;
    width: 46px;
    height: 46px;
    padding: 11px;
    /* color: #000;
    background-color: #000; */
  }
  .nav > .nav-btn > label:hover,
  .nav #nav-check:checked ~ .nav-btn > label {
    background-color: #f4efe9;
  }
  .nav > .nav-btn > label > span {
    display: block;
    width: 25px;
    height: 10px;
    border-top: 2px solid #000;
  }
  .nav > .nav-links {
    position: absolute;
    display: block;
    width: 100%;
    background-color: transparent;
    height: auto;
    transition: all 0.3s ease-in;
    overflow-y: hidden;
    top: 100%;
    right: 0%;
    text-align: right;
    overflow: hidden;
  }
  .nav > .nav-links > a {
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }
  .nav > #nav-check:not(:checked) ~ .nav-links {
    height: 0px;
  }
  .nav > #nav-check:checked ~ .nav-links {
    height: auto;
    overflow-y: auto;
  }
  .nav-links-items {
    width: 100%;
    height: 51px;
    border-radius: 8px;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  }

  .nav-links-items:hover {
    height: 51px;
    width: 100%;
    /* background-color: #964b00; */
    border-radius: 8px;
    color: #000;
    font-weight: 500;
    border: 0.5px solid #964b00;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  }

  .sidebar-item .nav-links-items:hover {
    /* height: 51px;
    width: 100%;
    border-radius: 8px;
    color: #000;
    font-weight: 500;
    border: 0.5px solid #964b00;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16); */
    background: var(--app-bg-gradient);
    border: 1px solid var(--app-primary-color);
  }

  .nav-links-items.active {
    height: 51px;
    width: 100%;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    background-color: #fff;
    border-radius: 8px;
    color: var(--app-primary-color) !important;
    font-weight: 700;
  }

  .sidebar-item .nav-links-items.active {
    /* height: 51px;
    width: 100%;
    border-radius: 8px; */
    color: var(--app-primary-color) !important;
    background: var(--app-bg-gradient);
    font-weight: 700;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    border: 1px solid var(--app-primary-color);
  }
}
</style>
