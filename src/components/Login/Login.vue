<template>
  <div class="form-container cls-login page-without-header">
    <LoginPageImage>
      <template v-slot:child-component>
        <div class="w-full flex">
          <div class="w-full">
            <img :src="getStaticImagesUrl('olous_logo.svg')" />
          </div>
          <div class="w-full flex items-center justify-end">
            <div class="flex items-center">
              <button class="" type="submit" @click="hasHistory()">
                <img src="../../assets/close.svg" alt="" />
              </button>
            </div>
          </div>
        </div>
        <div class="w-full mt-10 sm:mt-16">
          <div class="text-4xl app-text-color-primary font-bold leading-4">
            Sign In
          </div>
        </div>
        <div class="mt-10">
          <LoginWPhone :data="data" />
        </div>
        <div class="mt-5 mb-12 flex justify-end">
          <p class="text-sm">
            Don't have an account?
            <span @click="signUp" class="cursor-pointer app-text-color-primary"
              ><b> Sign Up</b></span
            >
          </p>
        </div>
      </template>
    </LoginPageImage>
    <!-- <div class="max-w-[80rem] md:mx-auto antialiased pb-[2rem] h-full">
      <div class="flex flex-col items-center space-y-[4.375rem]">
        <div class="w-full">
          <div class="grid grid-cols-12 gap-4">
            <div
              class="col-span-12 md:col-span-6 order-last md:order-first md:mr-10"
            >
              <LoginPageImage></LoginPageImage>
            </div>

            <div class="col-span-12 md:col-span-6">
              <div class="w-full flex">
                <div class="w-full">
                  <img :src="getStaticImagesUrl('olous_logo.svg')" />
                </div>
                <div class="w-full flex items-center justify-end">
                  <div class="flex items-center">
                    <button class="" type="submit" @click="hasHistory()">
                      <img src="../../assets/close.svg" alt="" />
                    </button>
                  </div>
                </div>
              </div>
              <div class="w-full mt-10 sm:mt-16">
                <div
                  class="text-4xl app-text-color-primary font-bold leading-4"
                >
                  Sign In
                </div>
              </div>
              <div class="mt-10">
                <LoginWPhone :data="data" />
              </div>
              <div class="mt-5 mb-12 flex justify-end">
                <p class="text-sm">
                  Don't have an account?
                  <span
                    @click="signUp"
                    class="cursor-pointer app-text-color-primary text-[1.031rem]"
                    ><b> Sign Up</b></span
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
       
      </div>
    </div> -->
  </div>
</template>

<script>
import LoginWPhone from "./LoginWPhone.vue";
import appConstants from "../../appConstants.js";
import { mapGetters } from "vuex";
import { setCurrentDecodeURL } from "../../common/js/webUrls.js";
import LoginPageImage from "../common/LoginPageImage.vue";

export default {
  name: "login",
  components: {
    LoginWPhone,
    LoginPageImage,
  },
  data() {
    return {
      lastPath: null,
      data: "email",
    };
  },
  computed: {
    ...mapGetters("login", ["getter_user", "getter_isUserLoggedIn"]),
    // prevRoutePatch() {
    //   console.log(this.lastPath);
    //   return this.lastPath ? this.lastPath : "/";
    // },
  },
  methods: {
    hasHistory() {
      // let back = window.history.length > 1;
      // if (back) {
      //   this.$router.back();
      // } else {
      //   this.$router.replace({ name: appConstants.routes.HOME });
      // }
      // if (this.$route.query.isFromBookMark) {
      //   // const url = window.location.href;
      //   // let newurl = url.split("?")[0];
      //   // window.history.pushState({}, "", newurl);
      //   let back = window.history.length > 1;
      //   if (back) {
      //     this.$router.back();
      //   }
      //   //setCurrentDecodeURL(this.$route);
      // } else {
      setCurrentDecodeURL(this.$route);
      //}
    },
    enableEmail() {
      this.data = "email";
    },
    enablePhone() {
      this.data = "phone";
    },
    signUp() {
      this.$router.push({ name: appConstants.routes.SIGNUP });
    },
    clickClose() {
      this.prevRoutePatch;
      //console.log("lastpath =>", this.lastPath);
      // this.$router.push({ name: appConstants.routes.HOME });
    },

    getStaticImagesUrl(imageName) {
      let url = this.getStaticImage(imageName);
      return url;
    },
    setBackgroundImage() {
      let image = this.getStaticImagesUrl("login_with_gradient.png");
      return `background-image: url(${image})`;
    },
  },
  created() {
    // console.log("**Created**")
    // console.log(this.getter_user)
    // console.log(this.getter_isUserLoggedIn)
    // this.lastPath = this.$router.options.history.state.back;
    // console.log(this.$router);
    if (this.getter_isUserLoggedIn) {
      this.$router.push({ name: appConstants.routes.HOME });
    }
  },
};
</script>

<style>
.textWhite {
  color: #fff !important;
}

/* .img-div {
  background-image: url("https://amymhaddad.s3.amazonaws.com/morocco-blue.png");
  height: 100%;
  width: 100%;
} */
</style>
