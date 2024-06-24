<template lang="">
  <div v-if="details" class="cls-companieslist">
    <div class="grid lg:grid-cols-4 grid-cols-12 gap-3 pb-4">
      <div class="col-span-12">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3"
        >
          <!-- @click="reditectToCompanyPortfolio(detail.slug)" -->
          <!-- <div
            v-for="detail in details"
            class="w-full bg-[#343434] rounded text-[#333333] cursor-pointer"
            @click="reditectToCompanyPortfolio(detail.slug)"
            :key="getUUIDAsKey()"
          >
            <div class="flex flex-col">
              <v-lazy-image
                class="rounded-t h-40 w-auto object-cover"
                :src="getCompanyImage(detail.banner_image)"
                alt=""
              />

              <div class="flex flex-col p-3 w-full">
                <div class="grid grid-cols-5 items-start">
                  <div class="col-span-4">
                    <h1 class="font-light text-base text-white leading-tight">
                      {{ detail.name }}
                    </h1>
                  </div>
                  <div class="flex ">
                    <img src="../../assets/Call.svg" alt="call" class="m-1" />
                  </div>
                  <small class="text-[#d3d3d3] font-light text-sm">{{
                    detail.location
                  }}</small>
                </div>
                <div class="grid grid-cols-1 items-center">
                  <div class="col-span-4 text-sm text-white mt-5">
                    <p>{{ detail.short_desrciption }}</p>
                  </div>
                </div>
              </div> 
            </div>
          </div>-->
          <div
            v-for="(detail, index) in details"
            :key="index"
            class="card-animation w-full rounded-xl app-bg-color-secondary app-bg-hover app-border-static cursor-pointer p-3"
          >
            <a :href="reditectToCompanyPortfolio(detail.slug)" target="_blank">
              <div class="mb-2 h-14 companies-list-header">
                <div v-if="detail.logo">
                  <img
                    class="w-[3rem] h-[3rem] rounded-lg bg-[#fff] object-contain"
                    :src="getCompanyLogo(detail.logo)"
                    alt=""
                  />
                </div>
                <div v-else>
                  <div
                    class="bg-[#fff] flex h-[3rem] items-center justify-center object-contain rounded-lg w-[3rem]"
                  >
                    <span class="font-semibold text-lg text-[#333]">{{
                      setShortFormCompany(detail.name)
                    }}</span>
                  </div>
                </div>

                <div class="ml-3">
                  <h1
                    class="font-semibold text-base app-text-color-secondary leading-5"
                  >
                    {{ detail.name }}
                  </h1>
                  <span class="app-text-color-secondary font-medium text-sm"
                    >{{ detail.city }}<span v-if="detail.city">, </span
                    >{{ detail.country }}</span
                  >
                </div>
              </div>
              <div class="grid grid-cols-1 rounded-lg">
                <v-lazy-image
                  class="rounded-xl h-40 w-full object-cover"
                  :src="getCompanyImage(detail.banner_image)"
                  alt=""
                />
              </div>
              <div class="grid grid-cols-4 items-center justify-between mt-2">
                <div class="col-span-3">
                  <p class="text-sm font-medium app-text-color-secondary">
                    {{ detail.short_desrciption }}
                  </p>
                </div>

                <div class="flex justify-end">
                  <img :src="getStaticImage('call-company.svg')" alt="call" />
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div class=""></div>
    </div>
  </div>
  <div v-else>
    <p>Please wait loading</p>
  </div>
</template>

<script>
import Olous_Block_img from "../../assets/Olous_Block.svg";
import appConstants from "../../appConstants.js";
import Card from "primevue/card";
import { getUUID } from "../../common/js/commonFunctions.js";
import VLazyImage from "v-lazy-image";
import { useRouter } from "vue-router";
import { getUserNameInitials } from "../../common/js/commonFunctions.js";
import {
  createCompanyProfileURL,
  getCurrentHostName,
} from "../../common/js/webUrls.js";

export default {
  name: "Companies",
  components: {
    Card,
    VLazyImage,
  },
  props: {
    details: Object,
  },
  setup(props, context) {
    const router = useRouter();
    function getUUIDAsKey() {
      var res = getUUID();
      return res;
    }

    function getCompanyImage(banerImage) {
      if (banerImage != null && banerImage.trim() != "") {
        // var imageURL = `${
        //   import.meta.env.VITE_APP_COMPANY_IMGURL
        // }${banerImage}`;
        return banerImage;
      } else {
        return Olous_Block_img;
      }
    }

    function getCompanyLogo(logo) {
      if (logo != null && logo.trim() != "") {
        //var imageURL = `${import.meta.env.VITE_APP_COMPANY_IMGURL}${logo}`;
        return logo;
      }
    }
    function setShortFormCompany(name) {
      let nameArray;
      let nameInitial;
      if (name != null) {
        nameArray = name.split(" ");
        if (nameArray.length >= 2) {
          nameInitial = getUserNameInitials(nameArray[0], nameArray[1]);
        } else {
          nameInitial =
            nameArray[0].trim().charAt(0).toUpperCase() +
            nameArray[0].trim().charAt(1).toUpperCase();
        }
      }
      return nameInitial;
    }
    function reditectToCompanyPortfolio(slug) {
      let host = getCurrentHostName();
      if (slug != "") {
        let url = createCompanyProfileURL(host, slug);
        // let routeData = router.resolve({
        //   name: appConstants.routes.PORTFOLIO_URL,
        //   params: { slug: slug },
        // });
        // window.open(routeData.href, "_blank");
        return url;
      } else {
        return "";
      }
      // var url = `${appConstants.PORTFOLIO_URL}${'vadsoft'}`;
      // window.open(url, "_blank");
      // router.push({name: appConstants.routes.PORTFOLIO_URL, params: {slug: "vadsoft"}})
      // let routeData = router.resolve({name: appConstants.routes.PORTFOLIO_URL, params: {slug: "vadcor"}});
      // window.open(routeData.href, "_blank");
    }

    return {
      getUUIDAsKey,
      getCompanyImage,
      getCompanyLogo,
      setShortFormCompany,
      reditectToCompanyPortfolio,
    };
  },
};
</script>
<style scoped></style>
