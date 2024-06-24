<template lang="">
  <div v-if="details" class="">
    <div class="grid gap-3 pb-4">
      <div class="">
        <div
          class="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
        >
          <!--  @click="redirectToViewProfile(detail._source.slug)" -->

          <div
            v-for="detail in details"
            class="rounded-lg cursor-pointer py-7 px-5 box-shadow user-card"
            :key="getUUIDAsKey()"
          >
            <a :href="redirectToViewProfile(detail._source.slug)">
              <div class="flex flex-col justify-center">
                <div class="flex justify-center">
                  <div v-if="detail._source.profile_image">
                    <VLazyImage
                      class="rounded-full h-[5.313rem] w-[5.313rem] mx-5 my-1"
                      :src="detail._source.profile_image"
                      alt=""
                    />
                  </div>
                  <div v-else>
                    <div
                      class="rounded-full h-20 w-20 mx-5 my-1 text-[#000000] p-5 app-bg-color-secondary text-3xl flex items-center justify-center"
                    >
                      {{ shortForm(detail._source) }}
                    </div>
                  </div>
                </div>

                <div class="flex pt-2 w-full justify-center">
                  <div class="grid grid-cols-1 items-center justify-center">
                    <div class="">
                      <div
                        class="capitalize text-base font-weight-700 text-center leading-6"
                      >
                        {{ capitalize(detail._source.first_name) }}
                        {{ capitalize(detail._source.last_name) }}
                      </div>
                    </div>
                    <div class="mt-1">
                      <p
                        v-if="
                          detail._source.designation || detail._source.about
                        "
                        class="break-word lg:text-sm md:text-sm text-xs font-medium text-center leading-normal"
                      >
                        {{ setDesignationOrTagline(detail._source) }}
                      </p>
                      <p
                        class="font-medium mt-2 text-xs text-center leading-normal"
                      >
                        {{ detail._source.city }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Please wait loading</p>
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
  name: "Users",
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
      let host = getCurrentHostName();
      let url = createUSerProfileURL(host, slug);
      // router.push({
      //   name: appConstants.routes.VIEWPROFILE,
      //   params: { user_slug: slug },
      // });
      return url;
    }
    function setDesignationOrTagline(data) {
      let about = "";
      if (data.hasOwnProperty("designation") && data.designation != "") {
        return data.designation;
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

    return {
      userDetails,
      getUUIDAsKey,
      getCompanyImage,
      redirectToViewProfile,
      shortForm,
      capitalize,
      setDesignationOrTagline,
    };
  },
};
</script>
<style scoped>
.user-card:hover {
  background: linear-gradient(to bottom, #1987e5, rgba(0, 0, 0, 0.96) 172%);
  color: #ffffff;
}

.box-shadow {
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.16);
}
</style>
