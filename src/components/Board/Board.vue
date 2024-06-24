<template>
  <div class="md:mx-auto bg-[#1C1C1C] text-[#F2F2F2] w-full h-full">
    <div class="mt-6 flex flex-col">
      <div class="grid grid-cols-5 gap-3">
        <div class="col-span-4">
          <span
            class="text-[#f2f2f2] lg:text-lg text-sm font-medium capitalize"
            >{{ data.name }}</span
          >
          <p
            class="text-[#d9d9d9] text-xs mb-2 truncate capitalize"
            v-if="data.description"
          >
            {{ data.description }}
          </p>
          <p v-else class="invisible text-sm mb-1">empty space</p>
        </div>
        <!-- <div class="flex justify-end w-full">
          <img
            v-if="!data.is_private"
            :src="getStaticImage('Board-Share.svg')"
            alt="ShareBoard"
            class="cursor-pointer p-1 w-7"
            @click="clickShare()"
          />
        </div> -->
      </div>

      <a :href="postUrl" target="_blank">
        <div class="bg-[#f2f2f2] rounded-lg px-3 py-2 cursor-pointer">
          <div class="flex items-center mb-2">
            <div class="flex items-center w-full">
              <img
                v-if="data.author.profile_image"
                class="lg:w-6 lg:h-6 w-5 h-5 rounded-full object-cover"
                :src="data.author.profile_image"
                alt=""
              />
              <div
                v-else
                class="flex self-center lg:w-6 lg:h-6 w-5 h-5 rounded-full object-cover text-[#333] justify-center items-center relative bg-[#f2f2f2]"
              >
                <span
                  class="lg:text-[0.75rem] text-[0.65rem] rounded-full flex lg:w-6 lg:h-6 w-5 h-5 justify-center items-center bg-[#d8d8d8] cursor-pointer"
                  >{{
                    shortForm(data.author.first_name, data.author.last_name)
                  }}
                </span>
              </div>
              <div class="ml-2">
                <p class="lg:text-sm text-xs text-[#333]">
                  {{ data.author.first_name }}
                  {{ data.author.last_name }}
                </p>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-5 gap-3">
            <div class="col-span-4">
              <div class="grid grid-cols-2 gap-3">
                <div class="relative">
                  <img
                    src="../../assets/Dummy-Image-board.svg"
                    alt=""
                    class="rounded-lg lg:h-36 h-20 w-full absolute z-0 object-cover"
                  />
                  <img
                    v-if="data.cover_images[0]"
                    :src="setImageUrl(data.cover_images[0])"
                    alt=""
                    class="rounded-lg lg:h-36 h-20 w-full absolute object-cover"
                  />
                </div>
                <div class="relative">
                  <img
                    src="../../assets/Dummy-Image-board.svg"
                    alt=""
                    class="rounded-lg lg:h-36 h-20 w-full absolute object-cover"
                  />
                  <img
                    v-if="data.cover_images[1]"
                    :src="setImageUrl(data.cover_images[1])"
                    alt=""
                    class="rounded-lg lg:h-36 h-20 w-full absolute object-cover"
                  />
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 gap-3">
              <div class="bg-[#c9c9c9] rounded-lg lg:lg:h-16 h-8 w-full">
                <img
                  v-if="data.cover_images[2]"
                  :src="setImageUrl(data.cover_images[2])"
                  alt=""
                  class="rounded-lg lg:lg:h-16 h-8 w-full object-cover"
                />
                <img
                  v-else
                  src="../../assets/Dummy-Image-board.svg"
                  alt=""
                  class="rounded-lg lg:h-16 h-8 w-full object-cover"
                />
              </div>
              <div class="bg-[#c9c9c9] rounded-lg lg:lg:h-16 h-8 w-full">
                <img
                  v-if="data.cover_images[3]"
                  :src="setImageUrl(data.cover_images[3])"
                  alt=""
                  class="rounded-lg lg:h-16 h-8 w-full object-cover"
                />
                <img
                  v-else
                  src="../../assets/Dummy-Image-board.svg"
                  alt=""
                  class="rounded-lg lg:h-16 h-8 w-full object-cover"
                />
              </div>
            </div>
          </div>
          <div class="flex items-center justify-between mt-1">
            <span
              class="text-[10px] lg:text-[12px] text-black inline-flex items-center"
            >
              <img
                v-if="data.is_private"
                src="../../assets/Lock.svg"
                alt=""
                class="mr-1 w-[12px] h-[14px]"
              />
              <img
                v-if="!data.is_private"
                src="../../assets/Unlock.svg"
                alt=""
                class="mr-1 w-[12px] h-[14px]"
              />
              {{ data.clip_count }} Clips
            </span>
            <div class="items-center">
              <p class="text-[10px] lg:text-[12px] text-black">
                {{ data.visits }} Visits
              </p>
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>
<script>
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import SelectButton from "primevue/selectbutton";
import appConstants from "../../appConstants.js";
import { useStore } from "vuex";
import {
  getCurrentHostName,
  createBoardPageUrl,
} from "../../common/js/webUrls.js";
import { getUUIDtoEncodedString } from "/src/common/js/UUIDtoBase64.js";
import { ref } from "vue";
import { getParamsForBoards } from "/src/common/js/ReadPostData.js";
import { data } from "autoprefixer";
import { copyTextToClipboard } from "../../common/js/commonFunctions.js";
import { useToast } from "primevue/usetoast";

export default {
  name: "board",
  components: {
    TabView,
    TabPanel,
    SelectButton,
  },
  props: {
    boardData: {
      type: Object,
      default: {},
    },
  },
  async setup(props, context) {
    let data = ref(props.boardData);
    const toast = useToast();
    let postUrl = ref();

    postUrl.value = await showBoardDetails(data.value);

    function setImageUrl(name) {
      let url = `${import.meta.env.VITE_APP_MEDIA_IMGURL}${name}`;
      return url;
    }

    function shortForm(fName, lName) {
      let initialLetters =
        fName.charAt(0).toUpperCase() + lName.charAt(0).toUpperCase();
      return initialLetters;
    }

    async function showBoardDetails(data) {
      // console.log("details", data);
      // let prefix = appConstants.shape_page_postfix.POST;
      // let encode_str = getUUIDtoEncodedString(data.id) + prefix;
      let encode_str = getUUIDtoEncodedString(data.id);
      let res = await getParamsForBoards(data);
      // let slug = data.author.slug;
      //let boardId = data._id;
      let host = getCurrentHostName(data);
      // console.log(res);
      let url = createBoardPageUrl(host, encode_str, res.user_slur, res.title);
      // console.log(url);
      return url;
    }
    async function clickShare() {
      let data1 = data.value;
      let encode_str = getUUIDtoEncodedString(data1.id);
      let res = await getParamsForBoards(data1);
      let host = getCurrentHostName(data1);
      let url = createBoardPageUrl(host, encode_str, res.user_slur, res.title);
      let result = copyTextToClipboard(url);
      if (result) {
        toast.add({
          severity: appConstants.toast_severity.INFO,
          summary: appConstants.toast_summary.INFO,
          detail: "Link copied to clipboard",
          life: 3000,
        });
      }
      //console.log("url", url);
    }

    return {
      postUrl,
      data,
      setImageUrl,
      shortForm,
      showBoardDetails,
      clickShare,
    };
  },
};
</script>
<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  border: 1px solid #333;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #333;
}

input:focus + .slider {
  box-shadow: 0 0 1px #333;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
