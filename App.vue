<template>
  <metainfo>
    <template v-slot:title="{ content }">{{
      content ? `${content}` : `Olous`
    }}</template>
  </metainfo>
  <Toast
    position="top-right"
    :breakpoints="{
      '1024px': { width: '100%' },
      '768px': { width: '90%' },
      '320px': { width: '90%' },
    }"
  />
  <!-- class="bg-[#1C1C1C]" -->
  <div class="app-container bg-[#fff]">
    <!-- <div v-if="!ifConnectionAvailable">
      :class="[getter_showNav ? '' : 'bg-[#fff]']"
      <InternetPopup />
    </div> -->
    <!-- <div>
      <Nav />
    </div> -->
    <div v-if="getter_showNav">
      <Nav />
    </div>

    <router-view />

    <div class="footer" v-if="!checkIsHome">
      <Footer />
    </div>
  </div>
  <!--<div v-if="checkIsHome" class="app-container bg-[#fff]">
    <router-view />

    <div class="footer">
      <Footer />
    </div> 
  </div>-->
</template>

<script>
import Footer from "/src/components/Layout/Footer.vue";
import Toast from "primevue/toast";
import InputText from "primevue/inputtext";
import appConstants from "./appConstants.js";
import Nav from "/src/components/Layout/Nav.vue";
import {
  updateUserTokenExpiryDate,
  readUserTokenCookie,
  createUserTokenCookie,
} from "../src/common/js/UserToken.js";
import { mapMutations, mapActions, mapGetters } from "vuex";
import store from "./store/index.js";

export default {
  name: "App",
  components: {
    Footer,
    Toast,
    Nav,
    InputText,
    // InternetPopup,
  },
  data() {
    return {
      toastGroup: appConstants.toast_severity,
      LandingPageEnum: appConstants.Landing_Page_Enum,
      ifConnectionAvailable: null,
      isShowFooter: false,
      isInitialLoad: true,
    };
  },
  watch: {
    $route(to, from) {
      if (this.isInitialLoad) {
        this.isInitialLoad = false;
        // Access the route name here when it changes
        const routeName = to.name;
        //console.log("Current route name:", routeName);

        if (this.$route.name != appConstants.routes.PRICING) {
          this.action_getLandingPage().then(() => {
            //console.log("getter_landingPage", this.getter_landingPage);
            this.setLandingPage();
          });
        }
      }
    },
  },
  computed: {
    ...mapGetters("login", [
      "getter_showNav",
      "getter_showNav",
      "getter_landingPage",
    ]),

    checkIsHome() {
      if (
        this.$route.name == appConstants.routes.HOME ||
        this.$route.name == appConstants.routes.BUSINESS_EXPLORE ||
        this.$route.name == appConstants.routes.JOB_EXPLORE
      ) {
        //store.commit("login/commit_showNav", false);
        return true;
      } else {
        //store.commit("login/commit_showNav", true);
        return false;
      }
    },
    // checkInternetConnection() {
    //   let ifConnected = window.navigator.onLine;
    //   if (ifConnected) {
    //     console.log("Connection available");
    //     this.ifConnectionAvailable = true;
    //   } else {
    //     console.log("Connection not available");
    //     this.ifConnectionAvailable = false;
    //   }
    // },
  },
  // watch: {
  //   setFooter() {
  //     console.log("name =>", this.$route.name);
  //     if (
  //       this.$route.name == appConstants.routes.JSBRIDGE ||
  //       this.$route.name == appConstants.routes.MESSAGING ||
  //       this.$route.name == appConstants.routes.CONVERSATION ||
  //       this.$route.name == appConstants.routes.NEW_CONVERSATION
  //     ) {
  //       console.log("in if", this.$route.name);
  //       this.isShowFooter = false;
  //     } else {
  //       console.log(" else =>", this.$route.name);
  //       this.isShowFooter = true;
  //     }
  //   },
  // },

  metaInfo() {
    return {
      title: appConstants.metaData.TITLE,
      description: appConstants.metaData.DESCRIPTION,
      meta: [
        { property: "keywords", content: appConstants.metaData.KEYWORDS },
        // google
        { property: "og:title", content: appConstants.metaData.TITLE },
        {
          property: "og:description",
          content: appConstants.metaData.DESCRIPTION,
        },
        { property: "og:image", content: appConstants.metaData.IMAGE },
        { property: "og:url", content: appConstants.metaData.URL },
        { property: "og:site_name", content: appConstants.metaData.SITE_NAME },
        { property: "og:type", content: "website" },
        {
          property: "og:image:alt",
          content: appConstants.metaData.META_IMAGE_ALT,
        },
        //  Schema.org markup for Google+
        { itemprop: "name", content: appConstants.metaData.TITLE },
        { itemprop: "description", content: appConstants.metaData.DESCRIPTION },
        { itemprop: "image", content: appConstants.metaData.IMAGE },

        //thumnail
        { property: "thumbnail", content: appConstants.metaData.IMAGE },
      ],
    };
  },

  methods: {
    ...mapMutations("timeline", [
      "commit_scrollBarPosition",
      "commit_PostData",
    ]),
    ...mapMutations("board", ["commit_publicBoardData"]),
    ...mapActions("login", [
      "logout",
      "action_fetchUserDetails",
      "action_getLandingPage",
    ]),

    // setFooter() {
    //   console.log("name =>", this.$route);
    //   if (
    //     this.$route.name == appConstants.routes.JSBRIDGE ||
    //     this.$route.name == appConstants.routes.MESSAGING ||
    //     this.$route.name == appConstants.routes.CONVERSATION ||
    //     this.$route.name == appConstants.routes.NEW_CONVERSATION
    //   ) {
    //     console.log("in if");
    //     this.isShowFooter = false;
    //   } else {
    //     console.log(" else", this.$route.name);
    //     this.isShowFooter = true;
    //   }
    // },
    setLandingPage() {
      if (
        this.getter_landingPage.landingPage == this.LandingPageEnum.EXPERIENCE
      ) {
        this.$router.push({
          name: appConstants.routes.EXPERIENCE,
          query: { isFromSignUp: true },
        });
      }
      if (
        this.getter_landingPage.landingPage == this.LandingPageEnum.EDUCATION
      ) {
        this.$router.push({
          name: appConstants.routes.EDUCATION,
          query: { isFromSignUp: true },
        });
      }
      // else {
      //   this.$router.push({ name: appConstants.routes.HOME });
      // }
    },
  },

  created() {
    // if (this.$route.name != appConstants.routes.PRICING) {
    //   this.action_getLandingPage().then(() => {
    //     //console.log("getter_landingPage", this.getter_landingPage);
    //     this.setLandingPage();
    //   });
    // }

    // let main = document.querySelector(".app-container");
    // this.setFooter();
    // if (
    //   this.$route.name == appConstants.routes.JSBRIDGE ||
    //   this.$route.name == appConstants.routes.MESSAGING ||
    //   this.$route.name == appConstants.routes.CONVERSATION ||
    //   this.$route.name == appConstants.routes.NEW_CONVERSATION
    // ) {
    //   if (window.innerWidth < appConstants.css_breakpoints.MD && main) {
    //     // console.log("in if app.vue");
    //     main.style.background = "#fff";
    //   }
    // } else {
    //   if (main) {
    //     // console.log("in else app.vue");
    //     main.style.background = "#1C1C1C";
    //   }
    // }

    //on new session started update expiry date of

    let tokenValue = readUserTokenCookie();

    //if token has expired remove all data
    if (tokenValue == "") {
      // console.log("app.vue tokenvalue== ''");
      this.logout();
    } else {
      // store.dispatch("login/action_fetchUserDetails");
      this.action_fetchUserDetails();
      updateUserTokenExpiryDate();
    }

    //Set timeline scrollber position to 0(zero)
    //Empty timeline post store so that it will fetch new feeds.
    // console.log("loaded APP.VUE")
    // this.commit_scrollBarPosition(0);
    let obj = {
      page: 1,
      postData: null,
    };
    this.commit_PostData(obj);

    let boradsArgs = {
      page: 1,
      data: null,
    };
    this.commit_publicBoardData(boradsArgs);

    // var browser = detect.parse(navigator.userAgent);

    // console.log(browser.browser);
  },
  beforeMount() {},
};
</script>

<style>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.main-app-white {
  background-color: #fff;
}
</style>
