<template>
  <div class="form-container">
    <div class="max-w-full">
      <!-- <Nav /> -->
      <div class="flex justify-center relative" style="">
        <img
          src="/src/assets/Block.png"
          alt=""
          style="width: auto"
          :style="{ height: setImageHeight() }"
        />
        <div class="absolute top-1/3 ml-6">
          <h1
            class="lg:text-[7rem] md:text-[4.5rem] text-[3rem] font-medium lg:mb-10 app-text-color-primary text-center"
          >
            404
          </h1>
          <br />
          <h1
            class="lg:text-[2rem] md:text-[1.5rem] lg:mt-0 md:mt-2 mt-0 text-[1rem] font-medium app-text-color-secondary text-center"
          >
            The Page Not Found :(
          </h1>
          <br />
          <div class="justify-center flex lg:mt-5 md:mt-5 mt-3">
            <button
              @click="goToHome()"
              class="btn text-xs lg:text-lg md:text-lg font-light lg:w-40 md:w-40 py-1 px-3 rounded-lg"
            >
              Back To Home
            </button>
          </div>
        </div>

        <!-- <h1 class="text-center m-auto text-[3rem]">Page Not Found</h1> -->
      </div>
    </div>
  </div>
</template>

<script>
import appConstants from "../../appConstants.js";
import { useRouter } from "vue-router";
// import Nav from "/src/components/Layout/Nav.vue";
export default {
  name: "NotFound",
  // components: {
  //   Nav,
  // },
  setup() {
    const router = useRouter();

    function setImageHeight() {
      let width = 640;
      if (window.innerWidth > width) {
        let window_height = window.innerHeight;
        let imageHeight = window_height - 254 + "px";
        return imageHeight;
      } else {
        return "auto";
      }
    }
    function goToHome() {
      router.push({ name: appConstants.routes.HOME });
    }

    return {
      setImageHeight,
      goToHome,
    };
  },
};
</script>

<style></style>
