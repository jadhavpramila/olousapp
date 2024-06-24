<template>
  <div>
    <!-- <div>
      <Nav />
    </div> -->
    <div
      v-if="!checkIsHome()"
      class="app-width"
      :class="[getData() ? 'left-right-page-padding-layout' : '']"
    >
      <router-view></router-view>
    </div>
    <div v-if="checkIsHome()">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// import Nav from "/src/components/Layout/Nav.vue";

import appConstants from "../../appConstants.js";
import { useRoute } from "vue-router";
import store from "../../store/index.js";
import { onBeforeMount } from "@vue/runtime-core";

export default {
  name: "DefaultLayout",

  setup() {
    const route = useRoute();
    function getData() {
      if (route.name == appConstants.routes.MOBILE) {
        return false;
      } else {
        return true;
      }
    }
    function checkIsHome() {
      if (
        route.name == appConstants.routes.HOME ||
        route.name == appConstants.routes.BUSINESS_EXPLORE ||
        route.name == appConstants.routes.JOB_EXPLORE
      ) {
        //store.commit("login/commit_showNav", false);
        return true;
      } else {
        //store.commit("login/commit_showNav", true);
        return false;
      }
    }
    onBeforeMount(() => {
      //checkIsHome();
    });
    return {
      getData,
      checkIsHome,
    };
  },
};
</script>

<style></style>
