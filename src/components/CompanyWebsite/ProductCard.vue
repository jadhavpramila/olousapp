<template>
  <div
    class="overflow-hidden company-product-card rounded-xl cursor-pointer app app-bg-color-gradient text-[#000000]"
  >
    <a :href="clickEnquire(product.id)" target="_blank">
      <div>
        <div class="h-[11.188rem]">
          <div
            class="grid grid-cols-1 rounded-t-lg"
            v-if="product.medias.length > 0"
          >
            <v-lazy-image
              class="rounded-t-xl w-full h-[11.188rem] object-cover"
              :src="setProductImage(product)"
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
        <div v-if="product.medias.length == 0">
          <hr class="bg-[#e4e4d6] h-[0.1px] mt-[0px] border-t-0" />
          <!-- bg-[#707070] -->
        </div>
        <!-- <hr class="bg-[#707070] h-[0.5px] mt-[0px] border-t-0" /> -->
        <div class="relative h-[11.125rem] pl-5 pr-4">
          <div>
            <div class="">
              <div class="text-base font-bold leading-5 mt-[1rem]">
                {{ product.name }}
              </div>

              <!-- <div class="text-small mt-2.5 font-bold">
                {{ details.location }}
              </div> -->

              <div class="text-small mt-2.5 h-[5.313rem] overflow-hidden">
                {{ setDescriptionText(product.description) }}
              </div>
            </div>
          </div>
          <div class="absolute w-full bottom-4 pr-4">
            <div class="pr-4">
              <div
                class="text-[#000] rounded-[0.313rem] app-bg-color-secondary h-[1.688rem] text-small font-bold flex items-center justify-center"
              >
                Enquiry
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>
  </div>
</template>
<script>
import VLazyImage from "v-lazy-image";
import { getUUIDtoEncodedString } from "/src/common/js/UUIDtoBase64.js";
import {
  createCompanyProductURL,
  getCurrentHostName,
  getCurrentEncodedURL,
} from "../../common/js/webUrls.js";

export default {
  name: "ProductCard",
  components: { VLazyImage },
  props: {
    product: {
      type: Object,
      default: {},
    },
    company_slug: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    function clickEnquire(index) {
      //console.log("product index id", index);
      let productId = getUUIDtoEncodedString(index);
      //  console.log('product id',productId)
      let host = getCurrentHostName();
      //console.log(props);
      let product_details = props.product;
      let company_slug_value = props.company_slug;
      let url = createCompanyProductURL(host, props.company_slug, productId);

      return url;
    }

    function setProductImage(product) {
      //console.log(product);
      for (let j = 0; j < product.medias.length; j++) {
        if (product.medias[j].is_primary == true) {
          // let productImageURL = `${import.meta.env.VITE_APP_COMPANY_IMGURL}${
          //   product.medias[j].name
          // }`;

          return product.medias[j].name;
        }
      }
    }

    function setDescriptionText(description_text) {
      if (description_text.length > 100)
        description_text = description_text.substring(0, 100);
      description_text = `${description_text}...`;

      return description_text;
    }

    return {
      clickEnquire,
      setProductImage,
      setDescriptionText,
    };
  },
};
</script>

<style>
.company-product-card {
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
}

.company-product-card:hover {
  background: linear-gradient(to bottom, #1987e5, rgba(0, 0, 0, 0.96) 172%);
  color: #ffffff !important;
}
</style>
