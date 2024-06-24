<template>
  <div
    class="overflow-hidden business-card rounded-xl cursor-pointer app app-bg-color-gradient app-bg-hover-gradient"
  >
    <div @click="reditectToCompanyPortfolio(details.slug)">
      <div>
        <div class="h-[11.188rem]">
          <div
            class="grid grid-cols-1 rounded-t-lg"
            v-if="details.banner_image != null && details.banner_image != ''"
          >
            <v-lazy-image
              class="rounded-t-xl w-full h-[11.188rem] object-cover"
              :src="getCompanyImage(details.banner_image)"
            />
          </div>
          <div
            v-else
            class="flex items-center justify-center rounded-t-lg h-full"
          >
            <v-lazy-image
              class="rounded-t-xl items-center"
              :src="getStaticImage('image-icon-blue.svg')"
              alt=""
            />
          </div>
        </div>
        <div
          v-if="!(details.banner_image != null && details.banner_image != '')"
        >
          <hr class="bg-[#e4e4d6] h-[0.1px] mt-[0px] border-t-0" />
          <!-- bg-[#707070] -->
        </div>

        <div class="relative h-[15.406rem] pl-5 pr-4">
          <div class="mt-[-2.094rem]">
            <div v-if="details.logo">
              <img
                class="w-[4.188rem] h-[4.188rem] rounded-lg bg-[#fff] object-contain app-comp-box-shadow"
                :src="setCompanyLogoImage(details.logo)"
                alt=""
              />
            </div>
            <div v-else>
              <div
                class="bg-[#fff] flex w-[4.188rem] h-[4.188rem] items-center justify-center object-contain rounded-lg app-comp-box-shadow"
              >
                <span class="font-semibold text-lg text-[#6c757d]">{{
                  setShortFormCompany(details.name)
                }}</span>
              </div>
            </div>
          </div>
          <div>
            <div class="">
              <div class="text-base font-bold leading-5 mt-[1rem]">
                {{ details.name }}
              </div>

              <div class="text-small mt-2.5 font-bold">
                {{ details.location }}
              </div>

              <div class="text-small mt-2.5 h-[5.313rem] overflow-hidden">
                {{ setDescriptionText(details.short_desrciption) }}
              </div>
            </div>
          </div>
          <div class="absolute w-full bottom-4 pr-4">
            <div class="pr-4">
              <div
                class="text-[#000] rounded-[0.313rem] app-bg-color-secondary h-[1.688rem] text-small font-bold flex items-center justify-center"
              >
                Contact
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
    <div class="" v-for="(company, index) in companyData" :key="index">
      <div
        class="box-shadow rounded-lg p-3 grid grid-cols-4 items-center cursor-pointer"
        @click="reditectToCompanyPortfolio(company.slug)"
      >
        <div
          v-if="company.logo"
          class="company-image flex justify-center items-center"
        >
          <img :src="setCompanyLogoImage(company.logo)" alt="company" />
        </div>
        <div v-else class="company-image flex justify-center items-center">
          <div
            class="app-bg-color-secondary flex h-14 items-center justify-center rounded w-14"
          >
            <span class="font-semibold text-lg text-[#6c757d]">{{
              setShortFormCompany(company.name)
            }}</span>
          </div>
        </div>
        <div class="h-full col-span-3 flex">
          <div class="border-right"></div>
          <div class="flex flex-col ml-4">
            <p class="app-text-color-secondary text-[14px] font-bold h-10">
              {{ company.name }}
            </p>
            <span
              class="app-text-color-secondary text-[12px] font-weight-600 leading-4"
            >
              {{ company.address }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div> -->
</template>
<script>
import appConstants from "../../appConstants.js";
import Card from "primevue/card";
import VLazyImage from "v-lazy-image";
import { useRouter, useRoute } from "vue-router";
import Olous_Block_img from "../../assets/Company-Dummy-Icon.svg";
import { getUserNameInitials } from "../../common/js/commonFunctions";
import {
  createCompanyProfileURL,
  getCurrentHostName,
} from "../../common/js/webUrls.js";

export default {
  name: "BusinessCard",
  components: {
    Card,
    VLazyImage,
  },
  props: {
    details: {
      type: Object,
      default: {},
    },
  },

  setup() {
    const router = useRouter();
    const route = useRoute();

    function setCompanyLogoImage(logo) {
      if (logo != null && logo.trim() != "") {
        return logo;
      } else {
        return Olous_Block_img;
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
        //console.log("url", url);
        window.open(url, "_self");
      } else {
        return "";
      }
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

    function setDescriptionText(description_text) {
      if (description_text.length > 60)
        description_text = description_text.substring(0, 60);
      description_text = `${description_text}...`;

      return description_text;
    }

    return {
      setCompanyLogoImage,
      setShortFormCompany,
      reditectToCompanyPortfolio,
      getCompanyImage,
      setDescriptionText,
    };
  },
};
</script>

<style>
/* .company-image {
  width: 74px;
  height: 74px;
  border-radius: 6px;
  background: #fff;
}
.border-right {
  border-right: 1px solid #964b00;
}
.box-shadow {
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.16);
}
.cls-businesscard .companies-list-header {
  display: grid;
  grid-template-columns: 48px 1fr;
} */
</style>

<style>
.business-card {
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  color: #000000;
}

/* .business-card:hover {
  background: linear-gradient(to bottom, #1987e5, rgba(0, 0, 0, 0.96) 172%);
  color: #ffffff;
} */
</style>
