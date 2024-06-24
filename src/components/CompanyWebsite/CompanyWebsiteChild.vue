<template>
  <div class="cls-companywebsite form-container">
    <div class="lg:grid lg:grid-cols-1 grid-col-12 gap-3">
      <div class="bg-[#fff] rounded-3xl">
        <div class="app-bg-color-gradient">
          <div class="w-full h-auto px-4 pt-4">
            <CompanyHeader
              :allCompanyData="getter_CompanyData"
              :isUserLogin="getter_isUserLoggedIn"
            />
          </div>
        </div>

        <div class="w-full h-auto sm:px-9">
          <CompanyWithLogin
            :allCompanyData="getter_CompanyData"
            :isUserLogin="getter_isUserLoggedIn"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import CompanyWithLogin from "/src/components/CompanyWebsite/CompanyWithLogin.vue";
import CompanyHeader from "/src/components/CompanyWebsite/CompanyHeader.vue";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { computed } from "vue";
import { useStore } from "vuex";
import appConstants from "../../appConstants.js";
import { useMeta } from "vue-meta";
import { createCompanyProfileURL } from "../../common/js/webUrls.js";
import {
  getCategoryValues,
  getSubCategoryValues,
} from "../../common/js/getValuesFromIds.js";
import { createImageUrlForOgTags } from "../../common/js/getCompressedImageURL.js";
import { getCurrentInstance } from "vue";

export default {
  name: "CompanyWebsiteChild",
  inheritAttrs: false,
  components: {
    TabView,
    TabPanel,
    CompanyWithLogin,
    CompanyHeader,
  },
  props: {
    slug: String,
  },
  async setup(props, context) {
    const route = useRoute();
    const store = useStore();
    let slug_value = ref(null);
    const app = getCurrentInstance();
    const $getStaticImage =
      app.appContext.config.globalProperties.getStaticImage;
    //let allActivityData = ref({});

    let getter_CompanyData = computed(
      () => store.getters["companyData/getter_CompanyData"]
    );
    let getter_isUserLoggedIn = computed(
      () => store.getters["login/getter_isUserLoggedIn"]
    );
    // let getter_ActivityData = computed(
    //   () => store.getters["companyData/getter_ActivityData"]
    // );

    let metaTitle = ref(appConstants.metaData.TITLE);
    let metaDescription = ref(appConstants.metaData.DESCRIPTION);
    let metaImage = ref(appConstants.metaData.IMAGE);
    let metaURL = ref(appConstants.metaData.URL);
    let metaImageAlt = ref(appConstants.metaData.META_IMAGE_ALT);
    let metaSiteName = ref(appConstants.metaData.SITE_NAME);
    let metaKeywords = ref(appConstants.metaData.KEYWORDS);
    let metaLocality = ref("");
    let metaCountry = ref("");
    let metaRegion = ref("");

    useMeta(
      computed(() => ({
        title: metaTitle.value ?? "Olous",
        description: metaDescription.value ?? "",
        meta: [
          { property: "keywords", content: metaKeywords.value },
          // google
          { property: "og:title", content: metaTitle.value },
          { property: "og:description", content: metaDescription.value },
          { property: "og:image", content: metaImage.value },
          { property: "og:url", content: metaURL.value },
          { property: "og:site_name", content: metaSiteName.value },
          { property: "og:type", content: "website" },
          { property: "og:image:alt", content: metaImageAlt.value },
          //  Schema.org markup for Google+
          { itemprop: "name", content: metaTitle.value },
          { itemprop: "description", content: metaDescription.value },
          { itemprop: "image", content: metaImage.value },
          //  Location
          { property: "og:locality", content: metaLocality.value },
          { property: "og:region", content: metaRegion.value },
          { property: "og:country-name", content: metaCountry.value },
        ],
      }))
    );

    // watchEffect(() => {
    //   if (getter_CompanyData.value == "") {
    //     return;
    //   }
    //   // getMetaData();
    // });

    await getData();

    async function getData() {
      slug_value.value = props.slug;
      await getCompany();

      //console.log("slug value",slug_value.value);
    }

    async function getCompany() {
      await store.dispatch(
        "companyData/action_getCompanyData",
        slug_value.value
      );

      await getMetaData();
      // await getActivity();
      // console.log('Company', getter_CompanyData.value);
    }

    // async function getActivity() {
    //   //console.log("in getAct fun");
    //   await store
    //     .dispatch(
    //       "companyData/action_getActivityData",
    //       getter_CompanyData.value.company_user_id
    //     )
    //     .then(() => {
    //      // console.log("get", getter_ActivityData);
    //       allActivityData.value = getter_ActivityData.value.results;
    //     });
    //    //console.log("Activities", allActivityData);
    // }

    // onMounted(() => {
    //   getCompanyId();
    //   getCompany();
    //   //getActivity();
    // });
    //console.log(slug_value.value);

    async function getMetaData() {
      let data = getter_CompanyData.value;

      //set title
      await getCategoryValues([data.category]).then((category) => {
        metaTitle.value = `${data.name} - ${category} | Olous`;
      });

      //setKeyWords
      await getSubCategoryValues(data.category, data.sub_categories).then(
        (subCategory) => {
          metaKeywords.value = subCategory;
        }
      );

      //set description
      let location = "";
      let description = "";
      if (
        data.city != undefined &&
        data.city != null &&
        data.city != "" &&
        data.country != undefined &&
        data.country != null &&
        data.country != ""
      ) {
        location = `${data.city}, ${data.country}`;
        description = `${location} - ${data.short_desrciption}`;
      } else {
        description = data.short_desrciption;
      }

      if (description.length > appConstants.MetaLength.DESCRIPTION) {
        description = `${description.substring(
          0,
          appConstants.MetaLength.DESCRIPTION
        )}...`;
      }

      metaDescription.value = description;

      //set image
      if (data.social_url) {
        metaImage.value = data.social_url;
      } else {
        //it do not have social_url means it do nt have processed URL
        if (data.logo != "") {
          // let logoURL = `${import.meta.env.VITE_APP_COMPANY_IMGURL}${data.logo}`;
          let logoURL = data.logo;
          metaImage.value = createImageUrlForOgTags(logoURL, false);
        } else {
          //if (data.banner_image != "") {
          // let bannerImageURL = `${import.meta.env.VITE_APP_COMPANY_IMGURL}${
          //   data.banner_image
          // }`;
          let bannerImageURL = $getStaticImage("Company_og_tag.jpg");
          metaImage.value = createImageUrlForOgTags(bannerImageURL, true);
          // }
        }
      }
      // if (data.processed_logo != "") {
      //   metaImage.value = data.processed_logo;
      // } else if (data.logo != "") {
      //   let logoURL = `${import.meta.env.VITE_APP_COMPANY_IMGURL}${data.logo}`;
      //   metaImage.value = createImageUrlForOgTags(logoURL, false);
      // } else if (data.processed_banner_image != "") {
      //   metaImage.value = data.processed_banner_image;
      // } else {
      //   let bannerImageURL = `${import.meta.env.VITE_APP_COMPANY_IMGURL}${
      //     data.banner_image
      //   }`;
      //   metaImage.value = createImageUrlForOgTags(bannerImageURL, true);
      // }

      //set URL
      let URL = createCompanyProfileURL(appConstants.current_URL, data.slug);
      metaURL.value = URL;

      //set Image Alt text
      metaImageAlt.value = data.name;

      //setLocation
      metaLocality.value = data.city;
      metaRegion.value = data.state;
      metaCountry.value = data.country;
    }

    return {
      getData,
      slug_value,
      getCompany,
      //getActivity,
      //allActivityData,
      getter_CompanyData,
      // getter_ActivityData,
      getter_isUserLoggedIn,
    };
  },
};
</script>
