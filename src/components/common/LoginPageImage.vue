<template>
  <div class="max-w-[80rem] md:mx-auto antialiased pb-[2rem] h-full">
    <div class="flex flex-col items-center space-y-[4.375rem]">
      <div class="w-full">
        <div class="grid grid-cols-12 gap-4">
          <div
            class="col-span-12 md:col-span-6 order-last md:order-first md:mr-10"
          >
            <div
              class="md:max-w-[37rem] img-div rounded-xl bg-no-repeat bg-cover"
              :style="setBackgroundImage()"
            >
              <div
                class="app-text-color-for-dark-bg ml-4 pt-4 sm:ml-16 sm:pt-16 pb-[2.469rem]"
              >
                <div class="text-[3.75rem] font-extrabold leading-none">
                  Hello <br />world
                </div>
                <div class="text-[1rem] mt-[3.563rem]">Welcome To</div>
                <div
                  class="text-[1.875rem] leading-9 font-bold hidden sm:block mt-3"
                >
                  Top Digital Platform <br />For Construction &amp;<br />Real
                  Estate <br />Industry
                </div>
                <div class="text-[2.188rem] leading-none sm:hidden">
                  Top Digital Platform For Construction &amp;Real Estate
                  Industry
                </div>
                <div class="text-base font-bold mt-[3.563rem] mb-[3.563rem]">
                  It Is One Stop Platform For <br />Jobs, Network, Business &
                  Learning
                </div>
              </div>
            </div>
          </div>

          <div class="col-span-12 md:col-span-6">
            <slot name="child-component"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance } from "vue";

export default {
  name: "LoginPageImage",
  components: {},
  setup() {
    const app = getCurrentInstance();
    const $getStaticImage =
      app.appContext.config.globalProperties.getStaticImage;

    function setBackgroundImage() {
      let image = $getStaticImage("login_with_gradient.png");
      return `background-image: url(${image})`;
    }

    return {
      setBackgroundImage,
    };
  },
};
</script>

<style></style>
