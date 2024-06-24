import { reactive } from "@vue/reactivity";
import { createStore } from "vuex";
// import VueLoading from 'vue-loading-overlay';
// import 'vue-loading-overlay/dist/vue-loading.css';

import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
const ls = new SecureLS({ isCompression: false });

import test from "../store/modules/test.js";
import login from "./modules/login/login.js";
import achievements from "./modules/buildCv/achievements.js";
import certificationDetails from "./modules/buildCv/certification.js";
import keySkills from "./modules/buildCv/keySkills.js";
import softSkills from "./modules/buildCv/softSkills.js";
import org from "./modules/buildCv/org.js";
import dropdown from "./modules/common/dropdown.js";
import post from "./modules/post/post.js";
import search from "./modules/search/search.js";
import UserProfile from "./modules/buildCv/userProfile.js";
import timeline from "./modules/timeline/timeline.js";
import board from "./modules/board/board.js";
import companyData from "./modules/companyWebsite/companyWebsite.js";
import jobs from "./modules/jobs/jobs.js";
import business from "./modules/business/business.js";
import article from "./modules/article/article.js";
import messaging from "./modules/messaging/messaging.js";
import unsubscribe from "./modules/Unsubscribe/unsubscribe.js";
import topnews from "./modules/topnews/topnews.js";
import setting from "./modules/Setting/setting.js";
import eventregister from "./modules/eventregister/eventregister.js";
import resume from "./modules/buildCv/resume.js"
import order from "./modules/pricing/order.js";
import otp from "./modules/otp/otp.js";
import lead from "./modules/lead/lead.js";
import getURL from "./modules/common/getURL.js";

// user store
export const userStore = reactive({
  user: null,
  updatedUser: null,
});

// signup flow -store
export const signUpStore = reactive({
  onBoard: false,
  choseInterest: false,
});

// Create a new store instance.
const store = createStore({
  plugins: [
    createPersistedState({
      key: "olous_app_vuexdata", //This key is referred on logout
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ],
  modules: {
    test,
    achievements,
    certificationDetails,
    login,
    keySkills,
    dropdown,
    org,
    softSkills,
    post,
    search,
    UserProfile,
    timeline,
    board,
    companyData,
    jobs,
    business,
    article,
    messaging,
    unsubscribe,
    topnews,
    setting,
    eventregister,
    resume,
    order,
    otp,
    lead,
    getURL
  },
  actions: {
    resetAllStoreState({ commit }) {
      console.log("in reset in store");
      return new Promise((resolve) => {
        for (const currentModule in this._modules.root._children) {
          if (
            this._modules.root._children[
              currentModule
            ]._rawModule.mutations.hasOwnProperty("reset")
          ) {
            commit(`${currentModule}/reset`);
          }
          // console.log("reset to default value**************************");
        }
        resolve();
        // console.log(
        //   "after resetAllStoreState resolved ***********************"
        // );
      });
    },
  },
});

export default store;
