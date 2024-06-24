<template>
  <div>
    <div class="form-container cls-productdetails">
      <div class="">
        <div class="">
          <!-- <CompanyHeader :allCompanyData="getter_CompanyProductData" /> -->

          <div class="" v-if="getter_CompanyProductData.products">
            <div
              class=""
              v-for="(products, index) in getter_CompanyProductData.products"
              :key="index"
            >
              <!-- <div
                class="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-8 p-4 app-bg-color-gradient"
              > -->
              <div
                class="sm:flex sm:flex-cols sm:gap-[4.375rem] px-6 pt-6 pb-8 app-bg-color-gradient"
              >
                <div class="relative flex items-end">
                  <!-- <img
                    :src="setProductImage(products.medias)"
                    alt=""
                    class="h-[15rem] w-full object-cover rounded-2xl"
                  /> -->
                  <Image
                    :src="setProductImage(products.medias)"
                    alt="Image"
                    imageClass="max-h-[15.644rem] max-w-[23.106rem] w-full object-cover rounded-2xl app-comp-box-shadow"
                    preview
                  />
                  <!-- <div class="absolute flex justify-end container p-4">
                  
                    <img
                      src="../../assets/Link-Product.svg"
                      class="cursor-pointer"
                      alt=""
                      data-bs-toggle="tooltip"
                      title="Copy Link"
                      @click="copyLink(products.id)"
                    />
                  </div> -->
                </div>

                <div
                  class="max-w-[12.5rem] flex sm:justify-center items-center mt-6 sm:mt-0"
                >
                  <div>
                    <h1 class="mb-2 text-subtitle font-bold">
                      {{ products.name }}
                    </h1>
                    <!-- <div class="mb-4" v-if="products.price">
                    <span class="text-xs app-text-color-secondary font-medium"
                      >Price &nbsp; &#8377; &nbsp;&nbsp;
                      <span class="font-extralight"
                        >{{ products.price }} Sq.Ft</span
                      ></span
                    >
                  </div> -->
                    <div>
                      <p
                        @click="clickCompany(getter_CompanyProductData.slug)"
                        class="font-bold text-small leading-[1.17] cursor-pointer"
                      >
                        {{ getter_CompanyProductData.name }}
                      </p>
                    </div>
                    <div class="mt-3 sm:mt-10 grid grid-cols-2 gap-1">
                      <div>
                        <button class="btn" @click="copyLink(products.id)">
                          Share
                          <!-- <img src="../../assets/NextArrow-Product.svg" alt="" /> -->
                        </button>
                      </div>
                      <div>
                        <!--<button @click="openForm()" class="btn">
                        Enquiry
                        
                      </button>-->
                        <!-- <img src="../../assets/NextArrow-Product.svg" alt="" />  -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <hr class="h-[0.5px]" />
              </div>
              <div class="grid grid-col-1 sm:px-6 px-3">
                <div class="mt-7">
                  <div class="font-subtitle font-bold">About Product</div>
                  <div class="mt-4">
                    <p
                      class="text-sm text-normal leading-[1.43] font-extralight"
                      :innerHTML="setProductDescription(products)"
                    >
                      <!-- {{ products.description }} -->
                    </p>
                  </div>

                  <!-- <div class="mb-4" v-if="products.price">
                    <span class="text-xs app-text-color-secondary font-medium"
                      >Price &nbsp; &#8377; &nbsp;&nbsp;
                      <span class="font-extralight"
                        >{{ products.price }} Sq.Ft</span
                      ></span
                    >
                  </div> -->
                </div>
              </div>
              <div class="mt-6 sm:px-6 px-3">
                <div class="text-subtitle font-bold">Media</div>
                <div
                  class="grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-4 mt-5"
                >
                  <div
                    class="rounded-lg"
                    v-for="(media, index) in imageArray"
                    :key="index"
                  >
                    <div>
                      <Image
                        :src="media"
                        alt="Image"
                        imageClass="rounded-[0.875rem] h-[13.125rem] w-full object-cover app-comp-box-shadow"
                        preview
                      />
                      <!-- <img
                      :src="media"
                      alt=""
                      class="rounded-lg h-[9rem] w-full object-cover"
                    /> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="enquiry-overlay" :style="{ display: display }">
      <div class="mb-4 flex justify-end">
        <button class="m-4" type="submit" @click="closeForm()">
          <img src="../../assets/close.svg" alt="" />
        </button>
      </div>
      <div class="flex justify-center p-5 w-1/2">
        <div class="flex w-full justify-center">
          <SendEnquiry />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import appConstants from "../../appConstants.js";
import CompanyHeader from "../CompanyWebsite/CompanyHeader.vue";
import SendEnquiry from "../CompanyWebsite/SendEnquiry.vue";
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { useToast } from "primevue/usetoast";
import Image from "primevue/image";
import { useMeta } from "vue-meta";
import { createCompanyProductURL } from "../../common/js/webUrls.js";
import { createImageUrlForOgTags } from "../../common/js/getCompressedImageURL.js";
import { copyTextToClipboard } from "../../common/js/commonFunctions.js";

export default {
  name: "ProductDetailsChild",
  components: {
    CompanyHeader,
    SendEnquiry,
    Image,
  },
  props: {
    product_id: String,
  },
  async setup(props) {
    const route = useRoute();
    const store = useStore();
    const router = useRouter();
    const toast = useToast();
    let imageArray = ref([]);
    let display = ref(null);
    display.value = "none";
    let getter_CompanyProductData = computed(
      () => store.getters["companyData/getter_CompanyProductData"]
    );

    let metaTitle = ref(appConstants.metaData.TITLE);
    let metaDescription = ref(appConstants.metaData.DESCRIPTION);
    let metaImage = ref(appConstants.metaData.IMAGE);
    let metaURL = ref(appConstants.metaData.URL);
    let metaImageAlt = ref(appConstants.metaData.META_IMAGE_ALT);
    let metaSiteName = ref(appConstants.metaData.SITE_NAME);
    let metaKeywords = ref("");

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
        ],
      }))
    );

    await getCompanyAndProductId();
    async function getCompanyAndProductId() {
      let slug_value = route.params.slug;
      //console.log("slug value", slug_value);

      // let productId = route.params.product_id;

      //console.log("product id", productId);

      let productData = {
        slug: slug_value,
        product_id: props.product_id,
      };

      await store.dispatch(
        "companyData/action_getCompanyProductData",
        productData
      );
      getMetaData();
      imageArray.value = [];

      for (
        let i = 0;
        i < getter_CompanyProductData.value.products[0].medias.length;
        i++
      ) {
        //console.log(media[i]);
        // if (
        //   getter_CompanyProductData.value.products[0].medias[i].is_primary !=
        //   true
        // ) {
        // let productImageURL = `${import.meta.env.VITE_APP_COMPANY_IMGURL}${
        //   getter_CompanyProductData.value.products[0].medias[i].name
        // }`;
        imageArray.value.push(
          getter_CompanyProductData.value.products[0].medias[i].name
        );
        // console.log(imageArray.value);
        // return imageArray.value;
        //}
      }
      //console.log("Company Data", getter_CompanyProductData.value);
    }
    function setProductImage(media) {
      //console.log("media", media);
      for (let i = 0; i < media.length; i++) {
        if (media[i].is_primary == true) {
          // let productImageURL = `${import.meta.env.VITE_APP_COMPANY_IMGURL}${
          //   media[i].name
          // }`;

          return media[i].name;
        }
      }
    }
    // function setMultipleProductImage(media) {
    //   let imageArray = [];
    //   //console.log(media);
    //   for (let i = 0; i < media.length; i++) {
    //     //console.log(media[i]);
    //     if (media[i].is_primary == true) {
    //       return "";
    //     } else {
    //       let productImageURL = `${import.meta.env.VITE_APP_COMPANY_IMGURL}${
    //         media[i].name
    //       }`;
    //       imageArray.push(productImageURL);
    //       console.log(imageArray);
    //       return imageArray;
    //     }
    //   }
    // }
    function copyLink(productId) {
      //let encode_str = getUUIDtoEncodedString(productId);
      let host = window.location.origin;
      let path = window.location.pathname;
      let url = host + path;
      //console.log(url);
      // let dummy = document.createElement("input"),
      //   text = url;

      // document.body.appendChild(dummy);
      // dummy.value = text;
      // dummy.select();
      // document.execCommand("copy");
      // document.body.removeChild(dummy);
      let result = copyTextToClipboard(url);
      if (result) {
        toast.add({
          severity: appConstants.toast_severity.INFO,
          summary: appConstants.toast_summary.INFO,
          detail: "Link copied to clipboard",
          life: 3000,
        });
      }
    }
    function closeForm() {
      display.value = "none";
    }
    function openForm() {
      display.value = "block";
    }
    function clickCompany(companySlug) {
      if (companySlug != "") {
        let routeData = router.resolve({
          name: appConstants.routes.PORTFOLIO_URL,
          params: { slug: companySlug },
        });
        window.open(routeData.href, "_blank");
      } else {
        return "";
      }
    }

    function setProductDescription(product) {
      if (product.hasOwnProperty("description") && product.description != "") {
        return product.description.replace(/\n/g, "<br />");
      }
      return "";
    }

    function getMetaData() {
      if (getter_CompanyProductData.value.products.length > 0) {
        //Set keywords
        // metaKeywords.value = [Tiles,Paints,Wood,Plywood,"Steel Fabrication",Hardware,"Bathroom fittings",Furniture,"Plumbing fixtures",cladding,"Electrical Fittings",Doors,Adhesives,Ceilings,Flooring]

        let data = getter_CompanyProductData.value.products[0];
        let company = getter_CompanyProductData.value;

        //set title
        metaTitle.value = `${data.name} - ${getter_CompanyProductData.value.name} | Olous`;

        // //set description
        // let description = data.description
        // if( description.length > appConstants.MetaLength.DESCRIPTION){
        //     description = `${description.substring(0, appConstants.MetaLength.DESCRIPTION)}...`
        // }
        // metaDescription.value = description

        //set description
        let location = "";
        let description = "";
        if (
          company.city != undefined &&
          company.city != null &&
          company.city != "" &&
          company.country != undefined &&
          company.country != null &&
          company.country != ""
        ) {
          location = `${company.city}, ${company.country}`;
          description = `${location} - ${data.description}`;
        } else {
          description = data.description;
        }

        if (description.length > appConstants.MetaLength.DESCRIPTION) {
          description = `${description.substring(
            0,
            appConstants.MetaLength.DESCRIPTION
          )}...`;
        }
        metaDescription.value = description;

        //set Image
        let primaryImageAt = 0;
        let imageURL = "";
        if (data.medias.length > 0) {
          for (let i = 0; i < data.medias.length; i++) {
            if (data.medias[i].is_primary) {
              primaryImageAt = i;
            }
          }

          //if primary image not set
          if (data.medias[primaryImageAt].social_url) {
            metaImage.value = data.medias[primaryImageAt].social_url;
          } else {
            imageURL = data.medias[primaryImageAt].name;
            metaImage.value = createImageUrlForOgTags(imageURL, true);
          }

          // metaImage.value =  createImageUrlForOgTags(imageURL, true)
        }

        //set URL
        let URL = createCompanyProductURL(
          appConstants.current_URL,
          route.params.slug,
          route.params.product_id
        );
        metaURL.value = URL;

        //set Alt text
        metaImageAlt.value = data.name;
      }
    }

    // onMounted(() => {
    //   getCompanyAndProductId();
    // });
    return {
      imageArray,
      getCompanyAndProductId,
      getter_CompanyProductData,
      setProductImage,
      //setMultipleProductImage,
      copyLink,
      closeForm,
      openForm,
      display,
      clickCompany,
      setProductDescription,
    };
  },
};
</script>
<style scoped>
.enquiry-overlay {
  position: fixed;
  display: none;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(112, 112, 112, 0.5);
  z-index: 10;
  cursor: pointer;
}
.p-image-preview-indicator {
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 14px !important;
}

.btn {
  height: 27px !important;
  padding: 3px !important;
  border-radius: 5px !important;
  font-size: 12px !important;
}
</style>
