<template>
  <!-- when margin-top(mt-6) changes then height of viewport is also changes in index.css -->
  <div
    v-if="setFooter()"
    class="bg-black mt-2 lg:max-h-[7.60rem] max-h-[12.40rem]"
  >
    <div class="left-right-page-padding app-width">
      <div class="p-2">
        <div class="grid lg:grid-cols-2 grid-cols-1 content-center gap-4">
          <div
            class="flex w-full flex-col lg:flex-row lg:justify-start lg:items-center justify-center items-center"
          >
            <!-- <a :href="linkHome">
              <img
                :src="getStaticImage('Footer-Olous-Logo.svg')"
                alt="Olous_Logo"
                class="lg:w-36 w-32 cursor-pointer"
              />
            </a> -->
            <div>
              <a
                :href="linkAbout"
                target="_blank"
                class="text-gray-100 text-[0.75rem]"
                >About Us</a
              >
              <span class="text-gray-100 text-[0.75rem] mx-2">|</span>
              <a
                :href="linkPrivacy"
                target="_blank"
                class="text-gray-100 text-[0.75rem]"
                >Privacy Policy</a
              >
              <span class="text-gray-100 text-[0.75rem] mx-2">|</span>
              <a
                :href="linkTermsOfUse"
                target="_blank"
                class="text-gray-100 text-[0.75rem] cursor-pointer"
                >Terms of Use</a
              >
              <span class="text-gray-100 text-[0.75rem] mx-2">|</span>
            </div>
            <div>
              <a
                :href="linkTermsOfService"
                target="_blank"
                class="text-gray-100 text-[0.75rem]"
                >Terms of Service</a
              >
              <span class="text-gray-100 text-[0.75rem] mx-2">|</span>
              <a
                href="mailto:support@olous.app"
                class="text-gray-100 text-[0.75rem]"
                >Support</a
              >
            </div>
          </div>
          <div
            class="flex w-full lg:justify-end lg:items-end justify-center items-center"
          >
            <div class="grid grid-cols-1 content-center">
              <div
                class="flex lg:justify-end lg:items-end justify-center items-center"
              >
                <a
                  href="https://www.facebook.com/OlousApp"
                  target="_blank"
                  class="m-1"
                  ><img
                    :src="getStaticImage('Facebook.svg')"
                    alt="Facebook_Olous"
                /></a>
                <a
                  href="https://www.instagram.com/olous_app/"
                  target="_blank"
                  class="m-1"
                  ><img
                    :src="getStaticImage('Instagram.svg')"
                    alt="Instagram_Olous"
                /></a>
                <a
                  href="https://www.youtube.com/channel/UC0I96ZlTBPYAjoq_da4XzDQ"
                  target="_blank"
                  class="m-1"
                  ><img
                    :src="getStaticImage('Youtube.svg')"
                    alt="Youtube_Olous"
                /></a>
                <a
                  href="https://www.linkedin.com/company/olous-app"
                  target="_blank"
                  class="m-1"
                  ><img
                    :src="getStaticImage('Linkedin.svg')"
                    alt="Linkedin_Olous"
                /></a>
                <a
                  href="https://twitter.com/app_olous"
                  target="_blank"
                  class="m-1"
                  ><img
                    :src="getStaticImage('Twitter.svg')"
                    alt="Twitter_Olous"
                /></a>
              </div>
            </div>
            <!-- <div class="grid lg:grid-cols-1 content-center">
              <div
                class="flex flex-col lg:flex-row lg:justify-end lg:items-end justify-center items-center"
              >
                <div>
                  <a
                    :href="linkAbout"
                    target="_blank"
                    class="text-gray-100 text-[0.75rem]"
                    >About Us</a
                  >
                  <span class="text-gray-100 text-[0.75rem] mx-2">|</span>
                  <a
                    :href="linkPrivacy"
                    target="_blank"
                    class="text-gray-100 text-[0.75rem]"
                    >Privacy Policy</a
                  >
                  <span class="text-gray-100 text-[0.75rem] mx-2">|</span>
                  <a
                    :href="linkTermsOfUse"
                    target="_blank"
                    class="text-gray-100 text-[0.75rem] cursor-pointer"
                    >Terms of Use</a
                  >
                  <span class="text-gray-100 text-[0.75rem] mx-2">|</span>
                </div>
                <div>
                  <a
                    :href="linkTermsOfService"
                    target="_blank"
                    class="text-gray-100 text-[0.75rem]"
                    >Terms of Service</a
                  >
                  <span class="text-gray-100 text-[0.75rem] mx-2">|</span>
                  <a
                    href="mailto:support@olous.app"
                    class="text-gray-100 text-[0.75rem]"
                    >Support</a
                  >
                </div>
              </div>
            </div> -->
            <br />
          </div>
        </div>
      </div>
      <!-- Fooster changed12 -->
    </div>
  </div>
</template>

<script>
import appConstants from "../../appConstants.js";
export default {
  name: "Footer",
  data() {
    return {
      linkAbout: "",
      linkPrivacy: "",
      linkTermsOfUse: "",
      linkTermsOfService: "",
      linkHome: "",
    };
  },
  // watch: {
  //   setFooter() {
  //     if (
  //       route.name == appConstants.routes.MESSAGING ||
  //       route.name == appConstants.routes.CONVERSATION
  //     ) {
  //       console.log("in if")
  //       let footer = document.querySelector(".footer");
  //       footer.style.display = "none";
  //     } else {
  //       console.log("in else")
  //       let footer = document.querySelector(".footer");
  //       footer.style.display = "block";
  //     }
  //   },
  // },
  methods: {
    setFooter() {
      if (
        this.$route.name == appConstants.routes.MOBILE ||
        this.$route.name == appConstants.routes.MOBILENEW_CONVERSATION ||
        this.$route.name == appConstants.routes.MOBILECONVERSATION ||
        this.$route.name == appConstants.routes.MOBILEMESSAGING ||
        this.$route.name == appConstants.routes.JOBEXTERNAL
      ) {
        return false;
      }
      // console.log("name =>", this.$route.name);
      let token = this.$route.query.token;
      if (token) {
        this.$store.commit("login/commit_showNav", false);
        // return false;
      } else {
        if (
          this.$route.name == appConstants.routes.MOBILE ||
          this.$route.name == appConstants.routes.JSBRIDGE ||
          this.$route.name == appConstants.routes.MESSAGING ||
          this.$route.name == appConstants.routes.CONVERSATION ||
          this.$route.name == appConstants.routes.NEW_CONVERSATION ||
          this.$route.name == undefined
        ) {
          // console.log("in if");
          return false;
        } else {
          // console.log(" else", this.$route.name);
          return true;
        }
      }
    },
    createFooterLink() {
      this.linkAbout = appConstants.current_URL + appConstants.routes.ABOUT;
      this.linkTermsOfUse =
        appConstants.current_URL + appConstants.routes.TERMS;
      this.linkPrivacy =
        appConstants.current_URL + appConstants.routes.PRIVACYPOLICY;
      this.linkTermsOfService =
        appConstants.current_URL + appConstants.routes.TERMSOFSERVICE;
      this.linkHome = appConstants.current_URL;
    },
    // clickTerms() {
    //   let route = this.$router.resolve({ name: appConstants.routes.TERMS });
    //   window.open(route.href, "_blank");
    // },

    // clickPrivacy() {
    //   let route = this.$router.resolve({
    //     name: appConstants.routes.PRIVACYPOLICY,
    //   });
    //   window.open(route.href, "_blank");
    // },
    clickHome() {
      this.$router.push({ name: appConstants.routes.HOME });
    },
    // clickTermsofUse() {
    //   let route = this.$router.resolve({
    //     name: appConstants.routes.TERMSOFSERVICE,
    //   });
    //   window.open(route.href, "_blank");
    // },
    // clickAbout() {
    //   let route = this.$router.resolve({
    //     name: appConstants.routes.ABOUT,
    //   });
    //   window.open(route.href, "_blank");
    // },
  },
  created() {
    this.createFooterLink();
  },
};
</script>

<style></style>
