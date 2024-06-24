<template lang="">
  <div
    v-for="detail in details"
    class="rounded-lg cursor-pointer py-4 px-5 user-card"
    :class="getBackgroundColor()"
    :key="getUUIDAsKey()"
  >
    <div>
      <div @click="redirectToViewProfile(detail.slug)">
        <div class="flex flex-col justify-center">
          <div class="flex justify-center">
            <div v-if="detail.profile_image">
              <VLazyImage
                class="rounded-full h-[4.313rem] w-[4.313rem] mx-5 my-1"
                :src="detail.profile_image"
                alt=""
              />
            </div>
            <div v-else>
              <div
                class="rounded-full h-20 w-20 mx-5 my-1 p-5 text-[#000000] app-bg-color-secondary text-3xl flex items-center justify-center"
              >
                {{ shortForm(detail) }}
              </div>
            </div>
          </div>

          <div class="flex pt-2 w-full justify-center">
            <div class="grid grid-cols-1 items-center justify-center">
              <div class="">
                <div
                  class="capitalize text-sm font-weight-700 text-center leading-6"
                >
                  {{ capitalize(detail.first_name) }}
                  {{ capitalize(detail.last_name) }}
                </div>
              </div>
              <div class="mt-1">
                <p
                  v-if="detail.designation || detail.about"
                  class="break-word lg:text-xs md:text-xs text-xs font-medium text-center leading-normal"
                >
                  {{ setDesignationOrTagline(detail) }}
                </p>
                <!-- <p
                  class=" font-medium mt-2 text-xs text-center leading-normal"
                >
                  {{ detail.city }}
                </p> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Olous_Block_img from "../../assets/Dummy_Image.svg";
import appConstants from "../../appConstants.js";
import Card from "primevue/card";
import { getUUID } from "../../common/js/commonFunctions.js";
import { getUserNameInitials } from "../../common/js/commonFunctions.js";
import VLazyImage from "v-lazy-image";
import { useRouter, useRoute } from "vue-router";
import { encodeUUID } from "../../common/js/UUIDtoBase64.js";
import {
  createUSerProfileURL,
  getCurrentHostName,
} from "../../common/js/webUrls.js";

export default {
  name: "UsersCard",
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
  data() {
    return {
      userDetails: this.details,
    };
  },
  setup(props, context) {
    let userDetails = props.details;
    const router = useRouter();
    const route = useRoute();
    let maxLength = 50;

    function getUUIDAsKey() {
      var res = getUUID();
      return res;
    }
    function getCompanyImage(banerImage) {
      if (banerImage != null && banerImage.trim() != "") {
        var imageURL = `${
          import.meta.env.VITE_APP_COMPANY_IMGURL
        }${banerImage}`;
        return imageURL;
      } else {
        return Olous_Block_img;
      }
    }
    function redirectToViewProfile(slug) {
      // let encodedStr = encodeUUID(slug)

      // router.push({
      //   name: appConstants.routes.VIEWPROFILE,
      //   params: { user_id: encodedStr },
      // });
      // slug = "kanavanand7a935";
      let host = getCurrentHostName();
      let url = createUSerProfileURL(host, slug);
      // router.push({
      //   name: appConstants.routes.VIEWPROFILE,
      //   params: { user_slug: slug },
      // });
      window.open(url, "_self");
      //return url;
    }
    function setDesignationOrTagline(data) {
      let about = "";
      let designation = "";
      if (data.hasOwnProperty("designation") && data.designation != "") {
        if (data.designation.length > maxLength) {
          designation = data.designation.slice(0, maxLength) + "...";
          return designation;
        } else {
          return data.designation;
        }
        //return data.designation;
      } else if (data.hasOwnProperty("about") && data.about != "") {
        if (data.about.length > maxLength) {
          about = data.about.slice(0, maxLength) + "...";
          return about;
        } else {
          return data.about;
        }
      }

      return "";
    }
    function shortForm(data) {
      if (data != null && data != undefined) {
        let res = getUserNameInitials(data.first_name, data.last_name);
        return res;
      } else {
        return "";
      }
    }
    function capitalize(word) {
      let str = word;
      const lower = str.toLowerCase();
      return str.charAt(0).toUpperCase() + lower.slice(1);
    }

    function getBackgroundColor() {
      if (route.name == appConstants.routes.DEFAULT_SEARCH_PROFILE) {
        return "app-bg-color-secondary card-animation app-border-static";
      } else {
        return "app-bg-white box-shadow ";
      }
    }

    return {
      userDetails,
      getUUIDAsKey,
      getCompanyImage,
      redirectToViewProfile,
      shortForm,
      capitalize,
      setDesignationOrTagline,
      getBackgroundColor,
    };
  },
};
</script>
<style>
.box-shadow {
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.16);
}
.border05 {
  border: 0.3px solid var(--app-primary-color);
}

.user-card:hover {
  background: linear-gradient(to bottom, #1987e5, rgba(0, 0, 0, 0.96) 172%);
  color: #ffffff;
}
</style>
