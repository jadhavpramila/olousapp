<template>
  <div class="form-container cls-previewcv">
    <div class="grid grid-cols-6">
      <div class="lg:col-span-6 col-span-6">
        <div
          class="flex flex-col lg:col-span-3 col-span-5 p-5 bg-[#f2f2f2] rounded-2xl"
        >
          <div class="flex mb-4 justify-between">
            <img
              :src="getStaticImage('back_icon.svg')"
              alt="Back"
              class="cursor-pointer border border-2 rounded-full border-[#d96f20]"
              @click="backToBildCV"
            />
            <img
              :src="getStaticImage('download_cv.svg')"
              alt="download cv"
              class="cursor-pointer w-12"
              @click="clickDownloadCv()"
            />
          </div>
          <div class="row applicant-cv-div">
            <div
              class="col-md-12"
              v-for="(image, index) in cvImageList"
              :key="index"
            >
              <img
                :src="getImages(image)"
                alt="cvimage"
                width="100%"
                height="100%"
                class="cv-image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Dialog
      :showHeader="false"
      :visible="isCompleteFields"
      :style="{ width: '350px' }"
      :modal="true"
      :draggable="false"
    >
      <div class="form-bg-w p-6">
        <p>
          "Your CV is not completed. Please complete your cv and then try to
          Download"
        </p>
        <div class="flex justify-end space-x-4 mt-4">
          <button @click="closePopup()" class="btn w-24">Ok</button>
          <button @click="backToBildCV()" class="btn w-24">Build CV</button>
        </div>
      </div>
    </Dialog>
  </div>
</template>
<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { useToast } from "primevue/usetoast";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import appConstants from "../../appConstants.js";

export default {
  name: "PreviewCV",
  components: {
    Dialog,
    Button,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const toast = useToast();
    let cvImageFolder = ref();
    let cvImageList = ref([]);
    let isCompleteFields = ref(false);

    let getter_CVImagesData = computed(
      () => store.getters["UserProfile/getter_CVImagesData"]
    );
    let getter_incompleteFields = computed(
      () => store.getters["UserProfile/getter_incompleteFields"]
    );
    let getter_user = computed(() => store.getters["login/getter_user"]);
    function getImages(image) {
      let imageUrl = `${import.meta.env.VITE_APP_CV_PREVIEW_URL}${
        cvImageFolder.value
      }/${image}`;
      return imageUrl;
    }
    async function getCvImages() {
      if (getter_CVImagesData.value) {
        if (
          getter_CVImagesData.value.cv_images_folder != null ||
          getter_CVImagesData.value.cv_images.length != 0
        ) {
          cvImageList.value = getter_CVImagesData.value.cv_images.reverse();
          cvImageFolder.value = getter_CVImagesData.value.cv_images_folder;
        } else {
          return;
        }
      }
    }
    function clickDownloadCv() {
      // console.log(getter_incompleteFields.value);
      if (getter_incompleteFields.value.length == 0) {
        store
          .dispatch("UserProfile/action_sendCvToMail")
          .then(() => {
            toast.add({
              severity: appConstants.toast_severity.SUCCESS,
              summary: "Your CV has been sent to your email ID.",
              life: 3000,
            });
          })
          .catch((error) => {
            // cosnole.log("error.response.status");
          });
      } else {
        isCompleteFields.value = true;
        // toast.add({
        //   // severity: appConstants.toast_severity.INFO,
        //   // summary: appConstants.toast_summary.INFO,
        //   detail: "Your CV is not completed. Please complete your cv and then try to Download",
        //   life: 3000,
        // });
      }
    }
    function closePopup() {
      isCompleteFields.value = false;
    }
    function backToBildCV(e) {
      if (e != null) {
        e.preventDefault();
      }
      let userSlug = getter_user.value.slug;
      router.push({
        name: appConstants.routes.VIEWPROFILE,
        params: { user_slug: userSlug },
      });
    }
    onMounted(() => {
      getCvImages();
    });
    return {
      cvImageFolder,
      cvImageList,
      getter_CVImagesData,
      isCompleteFields,
      getter_user,
      closePopup,
      getImages,
      getCvImages,
      clickDownloadCv,
      backToBildCV,
    };
  },
};
</script>
<style>
.cv-image {
  max-height: 100%;
  width: 100%;
  border-radius: 10px;
  margin-bottom: 10px;
}
.alert {
  padding: 10px;
  background-color: #2aff0059;
  color: #000;
  border-radius: 10px;
  border: 1px solid #2bff00;
  font-size: 14px;
  text-align: center;
}

.closebtn {
  margin-left: 15px;
  color: white;
  font-weight: bold;
  float: right;
  font-size: 22px;
  line-height: 20px;
  cursor: pointer;
  transition: 0.3s;
}

.closebtn:hover {
  color: black;
}
</style>
