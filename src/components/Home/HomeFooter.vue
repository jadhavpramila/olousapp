<template>
  <!-- <div class="flex flex-col cls-home-footer padding-left-right-home py-10 py-4">
    <div class="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-1 w-full">
      <div class="lg:col-span-2 md:col-span-2 flex flex-col justify-between">
        <img
          @click="homePage()"
          :src="getStaticImage('Olous_logo_with_text.svg')"
          alt=""
          class="cursor-pointer lg:w-40 md:w-40 w-24"
        />
        <div class="flex w-full lg:mt-0 md:mt-0 mt-5">
          <div class="grid grid-cols-1 content-center">
            <div
              class="flex lg:justify-end lg:items-end justify-center items-center"
            >
              <a
                href="https://www.facebook.com/OlousApp"
                target="_blank"
                class="mr-1"
                ><img
                  :src="getStaticImage('Facebook.svg')"
                  alt="Facebook_Olous"
              /></a>
              <a
                href="https://www.instagram.com/olous_app/"
                target="_blank"
                class="mr-1"
                ><img
                  :src="getStaticImage('Instagram.svg')"
                  alt="Instagram_Olous"
              /></a>
              <a
                href="https://www.youtube.com/channel/UC0I96ZlTBPYAjoq_da4XzDQ"
                target="_blank"
                class="mr-1"
                ><img :src="getStaticImage('Youtube.svg')" alt="Youtube_Olous"
              /></a>
              <a
                href="https://www.linkedin.com/company/olous-app"
                target="_blank"
                class="mr-1"
                ><img
                  :src="getStaticImage('Linkedin.svg')"
                  alt="Linkedin_Olous"
              /></a>
              <a
                href="https://twitter.com/app_olous"
                target="_blank"
                class="mr-1"
                ><img :src="getStaticImage('Twitter.svg')" alt="Twitter_Olous"
              /></a>
            </div>
          </div>
        </div>
      </div>
      <div class="lg:col-span-2 md:col-span-2 flex w-full lg:pt-0 md:pt-0 pt-5">
        <div class="grid grid-cols-2 gap-2 w-full">
          <div class="flex w-full lg:justify-end md:justify-end">
            <ul>
              <li class="font-weight-700 text-lg">General</li>
              <li class="home-text">
                <a :href="linkAbout" target="_blank"> What is Olous?</a>
              </li>
              <li class="cursor-pointer home-text">
                <a :href="linkFAQ" target="_blank"> FAQs</a>
              </li>
              <li class="home-text cursor-pointer">
                <a :href="linkPrivacy" target="_blank">Privacy Policy</a>
              </li>
              <li class="home-text cursor-pointer">
                <a :href="linkTermsOfService" target="_blank"
                  >Terms of Service</a
                >
              </li>
              <li class="home-text cursor-pointer">
                <a :href="linkTermsOfUse" target="_blank">Terms of Use</a>
              </li>
            </ul>
          </div>
          <div class="flex w-full lg:justify-end md:justify-end">
            <ul>
              <li class="font-weight-700 text-lg">Features</li>
              <li class="home-text cursor-pointer" @click="clickNetwork">
                Network
              </li>
              <li class="home-text cursor-pointer" @click="clickBusiness">
                Business
              </li>

              <li class="home-text cursor-pointer" @click="clickLibrary">
                Library
              </li>
              <li class="home-text cursor-pointer" @click="clickArticles">
                Articles
              </li>
              <li class="home-text cursor-pointer" @click="clickJobs">Jobs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div> -->
  <div class="lg:py-7 md:py-6 py-6" style="background-color: #292929">
    <div class="content-max-width px-4">
      <div class="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1">
        <!-- Download our App Section -->
        <div class="flex flex-col justify-between">
          <div class="">
            <p class="footer-download-txt lg:mb-2.5 md:mb-2.5 mb-2.5">
              Download our App
            </p>
            <!-- App Store Button -->
            <div class="flex">
              <a
                href="https://play.google.com/store/apps/details?id=com.vadcore.olous"
                target="_blank"
              >
                <button class="">
                  <img
                    :src="getStaticImage('playstore_v1.svg')"
                    alt="App Store"
                  />
                </button>
              </a>
            </div>
          </div>
          <!-- <div class="lg:mt-0 md:mt-0 mt-5">
            <div class="flex items-center">
              <p class="newsletter-box mb-2">Subscribed for Newsletter</p>
            </div>
            <div class="flex items-center relative w-full">
              <input
                type="email"
                class="newsletter-input w-full"
                placeholder="Your Email Address"
                required
              />
              <span class="newsletter-button absolute p-3">
                <img
                  src="../../assets/newsletter_send.svg"
                  alt="Subscribe Image"
                />
              </span>
            </div>
          </div> -->
        </div>

        <!-- General and Features Section -->
        <div class="col-span-2 grid grid-cols-2 lg:mt-0 md:mt-0 mt-5">
          <!-- General Section -->
          <div
            class="flex flex-col lg:items-center md:items-center items-start"
          >
            <ul class="">
              <li class="footer-head-title pb-2 app-text-color-primary">
                General
              </li>
              <li class="footer-head-subtitle">
                <a href="mailto:support@olous.app">Support</a>
              </li>
              <li class="footer-head-subtitle cursor-pointer">
                <a :href="linkAbout" target="_blank"> What is Olous?</a>
              </li>
              <li class="footer-head-subtitle cursor-pointer">
                <a :href="linkTermsOfService" target="_blank"
                  >Terms of Service</a
                >
              </li>
              <li class="footer-head-subtitle cursor-pointer">
                <a :href="linkPrivacy" target="_blank">Privacy Policy</a>
              </li>
              <!-- <li class="footer-head-subtitle cursor-pointer">Career</li> -->
              <li class="footer-head-subtitle cursor-pointer">
                <a :href="linkFAQ" target="_blank"> FAQs</a>
              </li>
              <li class="footer-head-subtitle cursor-pointer">
                <a :href="linkTermsOfUse" target="_blank">Terms of Use</a>
              </li>
            </ul>
          </div>

          <!-- Features Section -->
          <div
            class="flex flex-col lg:items-center md:items-center items-start"
          >
            <ul class="">
              <li class="footer-head-title pb-2 app-text-color-primary">
                Features
              </li>
              <li
                class="footer-head-subtitle cursor-pointer"
                @click="clickBusiness"
              >
                Business
              </li>
              <li
                class="footer-head-subtitle cursor-pointer"
                @click="clickJobs"
              >
                Jobs
              </li>
              <!-- <li class="footer-head-subtitle cursor-pointer">Leads</li> -->
              <!-- <li
                class="footer-head-subtitle cursor-pointer"
                @click="clickArticles"
              >
                Articles
              </li> -->
              <li
                class="footer-head-subtitle cursor-pointer"
                @click="clickNetwork"
              >
                Network
              </li>
              <!-- 
              <li
                class="footer-head-subtitle cursor-pointer"
                @click="clickLibrary"
              >
                Learning
              </li> -->
            </ul>
          </div>
        </div>

        <div
          class="flex lg:ustify-end md:justify-end justify-start items-end pt-2 lg:mt-0 md:mt-5 mt-5"
        >
          <div class="social-links flex justify-center">
            <a
              href="https://www.linkedin.com/company/olous-app/"
              class="social-links mr-3"
              target="_blank"
            >
              <img
                class="slink pt-2.5 pb-2.5 pl-2 pr-2"
                :src="getStaticImage('linkedIn_v1.svg')"
                alt="linkdein Image"
              />
            </a>
            <a
              href="https://www.facebook.com/OlousApp"
              class="mr-3 social-links"
              target="_blank"
            >
              <img
                class="slink pt-2.5 pb-2.5 pl-2 pr-2"
                :src="getStaticImage('facebook_v1.svg')"
                alt="Facebook Image"
              />
            </a>
            <a
              href="https://www.instagram.com/olous_app/"
              class="mr-3 social-links"
              target="_blank"
            >
              <img
                class="slink pt-2.5 pb-2.5 pl-2 pr-2"
                :src="getStaticImage('youtube_v1.svg')"
                alt="youtube Image"
              />
            </a>
            <a
              href="https://www.youtube.com/channel/UC0I96ZlTBPYAjoq_da4XzDQ"
              class="mr-3 social-links"
              target="_blank"
            >
              <img
                class="slink pt-2.5 pb-2.5 pl-2 pr-2"
                :src="getStaticImage('instagram_v1.svg')"
                alt="insta"
              />
            </a>
            <a
              href="https://twitter.com/app_olous"
              class="mr-3 social-links"
              target="_blank"
            >
              <img
                class="slink pt-2.5 pb-2.5 pl-2 pr-2"
                :src="getStaticImage('twitter_newicon_2xx.png')"
                alt="twitter"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="">
    <div class="bg-black py-2 px-6 text-center">
      <div class="copyrght container-fluid mx-auto text-white text-left">
        Copyright© 2023 OLOUS | All Rights Reserved
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import appConstants from "../../appConstants.js";
import { useStore } from "vuex";
import { onMounted } from "@vue/runtime-core";
import { ref, computed } from "vue";
import "../../assets/css/landingpage.css";
export default {
  name: "HomeFooter",
  setup() {
    const store = useStore();
    const router = useRouter();
    let linkPrivacy = ref("");
    let linkAbout = ref("");
    let linkTermsOfUse = ref("");
    let linkTermsOfService = ref("");
    let linkHome = ref("");
    let linkFAQ = ref("");
    // let linkNetwork = ref("");
    // let linkBusiness = ref("");
    // let linkLibrary = ref("");
    // let linkArticles = ref("");

    function createFooterLink() {
      linkFAQ.value = appConstants.current_URL + appConstants.routes.FAQ;
      linkAbout.value = appConstants.current_URL + appConstants.routes.ABOUT;
      linkTermsOfUse.value =
        appConstants.current_URL + appConstants.routes.TERMS;
      linkPrivacy.value =
        appConstants.current_URL + appConstants.routes.PRIVACYPOLICY;
      linkTermsOfService.value =
        appConstants.current_URL + appConstants.routes.TERMSOFSERVICE;
      linkHome.value = appConstants.current_URL;
      // linkNetwork.value =
      //   appConstants.current_URL + appConstants.routes.DEFAULT_SEARCH_PROFILE;
      // linkBusiness.value =
      //   appConstants.current_URL + appConstants.routes.DEFAULT_SEARCH_BUSINESS;
      // linkLibrary.value =
      //   appConstants.current_URL + appConstants.routes.DEFAULT_SEARCH_DOCUMENTS;
      // linkArticles.value =
      //   appConstants.current_URL + appConstants.routes.DEFAULT_SEARCH_HEADLINES;
    }
    function clickNetwork() {
      router.push({
        name: appConstants.routes.LOGIN,
      });
    }
    function clickBusiness() {
      router.push({
        name: appConstants.routes.DEFAULT_SEARCH_BUSINESS,
      });
    }
    function clickLibrary() {
      router.push({
        name: appConstants.routes.DEFAULT_SEARCH_DOCUMENTS,
      });
    }
    function clickArticles() {
      router.push({
        name: appConstants.routes.DEFAULT_SEARCH_HEADLINES,
      });
    }
    function clickJobs() {
      router.push({ name: appConstants.routes.JOBS });
    }
    onMounted(() => {
      createFooterLink();
    });
    return {
      linkPrivacy,
      linkAbout,
      linkTermsOfUse,
      linkTermsOfService,
      linkHome,
      linkFAQ,
      // linkNetwork,
      // linkBusiness,
      // linkLibrary,
      // linkArticles,
      createFooterLink,
      clickNetwork,
      clickBusiness,
      clickLibrary,
      clickArticles,
      clickJobs,
    };
  },
};
</script>

<style>
.cls-home-footer {
  background-image: url("../../assets/Backgound-HomeMain.png");
  background-position: center;
  width: 100%;
  height: auto;
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;
}
.home-text {
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: normal;
  text-align: left;
  color: #c9c9c9;
}
.newsletter-button {
  border-radius: 0px 8px 8px 0px;
  background: var(--app-primary-color);
  height: 44px;
  right: 0;
}
</style>
