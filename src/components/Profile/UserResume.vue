<template>
  <div class="form-container cls-unsubscribe">
    <div class="grid grid-cols-6">
      <div class="lg:block hidden"></div>
      <div class="lg:col-span-4 col-span-4">
        <div
          class="flex flex-col lg:col-span-3 col-span-5 p-5 bg-[#f2f2f2] rounded-2xl"
        >
          <div
            class="flex flex-row justify-end mb-2 space-x-4"
            v-if="
              getter_userApplicantsData.application_status ==
              application_status.ACCEPTED
            "
          >
            <span
              class="fontSize14 font-weight-700 cursor-pointer"
              @click="downloadCVPDF(getter_userApplicantsData)"
            >
              <img
                :src="getStaticImage('Download-Job.svg')"
                alt="Download"
                title="Download CV"
              />
            </span>
            <span
              v-if="getter_userApplicantsData.attachment_file"
              class="fontSize14 font-weight-700 cursor-pointer"
              @click="downloadAttachmentPDF(getter_userApplicantsData)"
            >
              <img
                :src="getStaticImage('Attachement-Job.svg')"
                alt="Download"
                title="Download Attachment"
              />
            </span>
            <span
              class="fontSize14 font-weight-700 cursor-pointer"
              @click="openContact()"
            >
              <img
                :src="getStaticImage('Contact-Job.svg')"
                alt=""
                title="View Conatct"
              />
            </span>
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

      <div class="lg:block hidden"></div>
    </div>
    <Dialog
      :showHeader="false"
      v-model:visible="isShowContactInfo"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '30vw' }"
      :modal="true"
    >
      <div class="form-bg-w p-6">
        <span class="text-base text-[#964b00]">User Contact</span>
        <a
          :href="`tel:${setFullContactNo(getter_userApplicantsData)}`"
          class="flex items-center rounded-full pb-2 w-auto text-sm cursor-pointer"
        >
          <img :src="getStaticImage('call-company.svg')" />
          {{ setFullContactNo(getter_userApplicantsData) }}
        </a>
        <a
          :href="`mailto:${getter_userApplicantsData.email}`"
          class="flex items-center rounded-full pb-2 w-auto text-sm cursor-pointer"
          ><img src="../../assets/Email-Company.svg" />
          {{ getter_userApplicantsData.applicant_email }}</a
        >
        <div class="flex justify-end space-x-4 mt-4">
          <button class="btn w-24" @click="closeConatct" autofocus>
            Close
          </button>
        </div>
      </div>
    </Dialog>
  </div>
</template>
<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import appConstants from "../../appConstants.js";
import { useToast } from "primevue/usetoast";
import { getRandomString } from "../../common/js/commonFunctions.js";
import Dialog from "primevue/dialog";
import Button from "primevue/button";

export default {
  name: "UserResume",
  components: {
    Dialog,
    Button,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const toast = useToast();
    let isShowCvErrorMessage = ref(false);
    let cvImageFolder = ref();
    let cvImageList = ref([]);
    let resumeKey = ref();
    let application_status = appConstants.Application_Status;
    let isShowContactInfo = ref(false);

    let encodedStr = ref();

    let getter_userApplicantsData = computed(
      () => store.getters["resume/getter_userApplicantsData"]
    );

    let getter_CVImageList = computed(
      () => store.getters["resume/getter_CVImageList"]
    );
    async function getUserData() {
      await store
        .dispatch("resume/action_fetchUserData", encodedStr.value)
        .then((res) => {
          getCvImages();
        });
    }

    function openContact() {
      isShowContactInfo.value = true;
    }
    function closeConatct() {
      isShowContactInfo.value = false;
    }
    function setFullContactNo(contact) {
      let phoneNumber = "+" + contact.country_code + contact.applicant_mobile;
      return phoneNumber;
    }
    function getImages(image) {
      let imageUrl = `${import.meta.env.VITE_APP_CV_URL}${
        cvImageFolder.value
      }/${image}`;
      return imageUrl;
    }
    async function getCvImages() {
      if (getter_userApplicantsData.value) {
        if (
          getter_userApplicantsData.value.cv_images_folder == null ||
          getter_userApplicantsData.value.cv_images.length == 0
        ) {
          if (getter_userApplicantsData.value.applicant_resume) {
            let obj = {
              cvFile: getter_userApplicantsData.value.applicant_resume,
              application_id: getter_userApplicantsData.value.id,
            };
            await store
              .dispatch("resume/action_fetchCvImages", obj)
              .then(() => {
                cvImageList.value = getter_CVImageList.value.cv_images;
                cvImageFolder.value = getter_CVImageList.value.cv_images_folder;
                resumeKey.value = getRandomString();
              });
          } else {
            isShowCvErrorMessage.value = true;
          }
        } else {
          cvImageList.value = getter_userApplicantsData.value.cv_images;
          cvImageFolder.value =
            getter_userApplicantsData.value.cv_images_folder;
        }
      }
    }
    function downloadCVPDF(app) {
      downloadPDF(getPDFURL(app), true, app);
    }
    function downloadAttachmentPDF(app) {
      downloadPDF(getAttachmentURL(app), false, app);
    }
    function downloadPDF(fileURL, isCvFile, app) {
      let data = {
        cv_url: fileURL,
      };
      store
        .dispatch("resume/action_fetchPDFFile", data)
        .then((result_pdfFile) => {
          var fileURL = window.URL.createObjectURL(result_pdfFile);
          var fURL = document.createElement("a");

          fURL.href = fileURL;
          var download_cv_name = getDownloadCVName(isCvFile, app);
          fURL.download = download_cv_name;
          document.body.appendChild(fURL);
          fURL.click();
          document.body.removeChild(fURL);
        })
        .catch(() => {
          toast.add({
            severity: appConstants.toast_severity.ERROR,
            summary: appConstants.toast_summary.ERROR,
            detail:
              "Facing an issue while downloading file,  please try again after some time",
            life: 3000,
          });
        });
    }
    function getPDFURL(app) {
      var url = "";
      url = `${import.meta.env.VITE_APP_CV_URL}${app.applicant_resume}`;
      return url;
    }
    function getAttachmentURL(app) {
      var url = "";
      url = `${import.meta.env.VITE_APP_JOBATTACHMENTURL}${
        app.attcahment_file
      }`;
      return url;
    }
    function getDownloadCVName(isCvFile, app) {
      //var file_name = setApplicantName(app.user_details[0]).replace(" ", "");

      if (isCvFile) {
        var file_name = app.applicant_resume;
        return `Olous_${file_name}`;
      } else {
        var file_name = app.attcahment_file;
        return `Olous_${file_name}`;
      }
    }
    // function setApplicantName(userDetails) {
    //   let fullName = userDetails.first_name + " " + userDetails.last_name;
    //   return fullName;
    // }
    onMounted(() => {
      encodedStr.value = route.params.encoded_str;
      getUserData();
    });
    return {
      isShowCvErrorMessage,
      getter_CVImageList,
      cvImageFolder,
      cvImageList,
      getter_userApplicantsData,
      application_status,
      isShowContactInfo,
      getImages,
      getCvImages,
      getUserData,
      downloadCVPDF,
      downloadAttachmentPDF,
      openContact,
      closeConatct,
      setFullContactNo,
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
