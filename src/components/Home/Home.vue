<template>
  <div class="bg-white form-container">
    <!-- <HomeMain class="home-main"></HomeMain>
    <HomeStaticData></HomeStaticData>
    <HomeFooter></HomeFooter> 
    <Business></Business>
    <LandingPage></LandingPage-->
    <LandingPageNew></LandingPageNew>
  </div>
</template>

<script>
import HomeMain from "./HomeMain.vue";
import HomeStaticData from "./HomeStaticData.vue";
import HomeFooter from "./HomeFooter.vue";
//import LandingPage from "./LandingPage.vue";
import JobsPage from "./JobsPage.vue";
import LandingPageNew from "./LandingPageNew.vue";

export default {
  name: "Home",
  components: {
    HomeMain,
    HomeStaticData,
    HomeFooter,
    LandingPageNew,
  },
};
</script>

<style></style>
