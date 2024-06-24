<template>
  <!-- If Cover Note -->
  <!-- <div class="flex justify-center"> -->
  <!-- <div class="bg-[#f2f2f2] p-4 rounded-3xl w-[40rem]">
      <div class="flex w-full items-center">
        <h1 class="text-base app-text-color-secondary font-medium w-full justify-center">Cover Note</h1>
        <div class="flex justify-end w-full cursor-pointer">
          <img src="/src/assets/Close-Black.svg" alt="" @click="clickClose()"/>
        </div>
        
      </div> -->
  <div class="flex w-full items-center">
    <label class="form-label-bg-w">Cover Note</label>
  </div>
  <div class="flex w-full flex-col mb-5">
    <textarea
      name="covernote"
      id="covernote"
      cols="10"
      rows="10"
      autofocus
      v-model="coverNoteText"
      class="rounded-2xl focus-visible:outline-none app-text-color-secondary p-4 form-control"
    ></textarea>
  </div>

  <!-- attachment -->
  <div class="grid grid-cols-2">
    <div class="flex flex-col w-full">
      <label class="form-label-bg-w mb-[5px]">Upload Your CV</label>

      <div class="flex bg-white rounded-lg items-center">
        <InMemoryLoadAndPreviewSingleFile
          ref="ref_InMemoryLoadAndPreviewSingleFile"
          id="1"
          :key="uploadComponentKeyValue"
          upload_button_height="90"
          seleted_image_height="90"
          is_logo_image="false"
          is_object_fit_contain="false"
          upload_button_text="Click to upload your CV file"
          :file_type="zip_file_type"
          :save_image_path_value="path_s3_save_file"
          @media_uploaded="mediaUploadedToS3"
          @inMemoryFile_changed="file_changed"
        ></InMemoryLoadAndPreviewSingleFile>
        <!-- <input
          type="file"
          id="fileUpload"
          ref="fileUpload"
          name="cv"
          class="p-4 bg-white"
          style="display: none"
          @change="previewResume"
          required
        />
        <img
          :src="getStaticImage('Upload.svg')"
          class="mr-2 cursor-pointer"
          alt=""
          @click="openDialog()"
        /> -->
        <span class="app-text-color-secondary">{{ resumeFile }}</span>
      </div>
    </div>
    <!-- <div
      class="flex flex-col w-full"
      v-if="singleJobData.attachment_required == true"
    >
      <p class="app-text-color-secondary text-base mb-2">
        {{ singleJobData.attachment_description }}
      </p>

      <div class="flex bg-white p-3 rounded-lg items-center">
        <input
          type="file"
          id="fileUpload"
          ref="fileUpload"
          name="cv"
          class="p-4 bg-white"
          style="display: none"
          @change="previewFiles"
          required
        />
        <img
          :src="getStaticImage('Upload.svg')"
          class="mr-2 cursor-pointer"
          alt=""
          @click="openDialog()"
        />
        <span class="app-text-color-secondary">{{ fileName }}</span>
      </div>
    </div> -->
  </div>

  <div class="text-[#000000] form-group md:flex gap-4">
    <div class="flex-1">
      <label class="form-label-bg-w">Highest education level</label>
      <div>
        <Dropdown
          v-model="application_data.higher_education_level"
          :options="levelofStudy_options"
          optionLabel="name"
          optionValue="id"
          class="form-control primevue-dropdown border-0"
        />
        <div
          class="invalid-feedback"
          v-for="error of v$.higher_education_level.$errors"
          :key="error.$uid"
        >
          {{ error.$message }}
        </div>
      </div>
    </div>
  </div>

  <div class="text-[#000000]">
    <div class="md:flex gap-4">
      <div class="flex-1" v-if="isShowCurrentCTC()">
        <label class="form-label-bg-w">Current CTC</label>
        <div class="flex flex-row">
          <div class="flex-grow">
            <Dropdown
              v-model="application_data.current_ctc"
              :options="dropDownIntValue"
              optionLabel="name"
              optionValue="id"
              class="form-control primevue-dropdown border-0"
            />
            <div
              class="invalid-feedback"
              v-for="error of v$.current_ctc.$errors"
              :key="error.$uid"
            >
              {{ error.$message }}
            </div>
          </div>
          <!-- <div
            class="ml-1 w-1/6 flex-shrink-0 flex items-center justify-center"
          >
            <span>{{ application_data.CTC_unit_str }}</span>
          </div> -->
        </div>
      </div>

      <div class="flex-1">
        <label class="form-label-bg-w">Expected CTC</label>
        <div class="flex flex-row">
          <div class="flex-grow">
            <Dropdown
              v-model="application_data.expected_ctc"
              :options="dropDownIntValue"
              optionLabel="name"
              optionValue="id"
              class="form-control primevue-dropdown"
            />
            <div
              class="invalid-feedback"
              v-for="error of v$.expected_ctc.$errors"
              :key="error.$uid"
            >
              {{ error.$message }}
            </div>
          </div>
          <!-- <div
            class="ml-1 w-1/6 flex-shrink-0 flex items-center justify-center"
          >
            <span>{{ application_data.CTC_unit_str }}</span>
          </div> -->
        </div>
      </div>

      <div class="flex-1">
        <label class="form-label-bg-w">Notice Period</label>
        <div>
          <Dropdown
            v-model="application_data.notice_period"
            :options="notice_period_options"
            optionLabel="name"
            optionValue="id"
            class="form-control primevue-dropdown border-0"
          />
          <div
            class="invalid-feedback"
            v-for="error of v$.notice_period.$errors"
            :key="error.$uid"
          >
            {{ error.$message }}
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="text-[#000000] form-group md:grid md:grid-cols-3 gap-4" style="">
    <div class="col-span-3">
      <!-- <div>Current City</div> -->
      <div class="mt-2">
        <CountryStateCity
          ref="country_state_city"
          :isEdit="true"
          :locationData="locationData"
          countryIso="IN"
        ></CountryStateCity>
        <!-- <div
          class="invalid-feedback"
          v-for="error of v$.current_city.$errors"
          :key="error.$uid"
        >
          {{ error.$message }}
        </div> -->
      </div>
    </div>
    <div class="" v-if="isShowReadyToRelocate()">
      <div>Ready to relocate</div>
      <div>
        <Dropdown
          v-model="application_data.is_readyToRelocate"
          :options="readyTorelocate_options"
          optionLabel="name"
          optionValue="id"
          class="form-control primevue-dropdown border-0"
        />
        <!-- <div
          class="invalid-feedback"
          v-for="error of v$.is_readyToRelocate.$errors"
          :key="error.$uid"
        >
          {{ error.$message }}
        </div> -->
      </div>
    </div>
  </div>

  <div class="flex justify-end mt-3 w-auto">
    <button class="btn w-1/6" @click="submitCoverNote()">Apply</button>
  </div>
  <!-- </div>
  </div> -->
</template>
<script>
import { ref, onMounted, onBeforeMount, reactive, onUnmounted } from "vue";
import appConstants from "../../appConstants.js";
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import { uuid } from "vue3-uuid";
import { useToast } from "primevue/usetoast";
import { uploadFileOnS3 } from "../../mixins/uploadFileOnS3.js";
import Dropdown from "primevue/dropdown";
import useVuelidate from "@vuelidate/core";
import { requiredIf, required, helpers } from "@vuelidate/validators";
import CountryStateCity from "../common/CountryStateCity.vue";
import { getCurrentInstance } from "vue";
import { getRandomString } from "../../common/js/commonFunctions.js";
import InMemoryLoadAndPreviewSingleFile from "../common/InMemoryLoadAndPreviewSingleFile.vue";

export default {
  name: "CoverNote",
  emits: ["emitApplyJob"],
  components: {
    Button,
    Dialog,
    Dropdown,
    CountryStateCity,
    InMemoryLoadAndPreviewSingleFile,
  },
  props: {
    job_id: String,
    singleJobData: {
      type: Object,
      default: {},
    },
    userProfileStatus: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {};
  },
  setup(props, { emit }) {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const toast = useToast();

    const app = getCurrentInstance();
    const $emitter = app.appContext.config.globalProperties.emitter;

    let displayConfirmation = ref(false);
    let displayConfirmationForExternalUrl = ref(false);
    let isCoverNote = ref(false);
    let fileUpload = ref(null);
    let displayConfirmationForBuildCv = ref(false);
    let uploadIcon = "	pi pi-upload";
    let id = "postImage";
    let fileName = ref();
    let resumeFile = ref();
    let acceptableFileType = appConstants.ACCEPT_FILE_TYPE;
    let path_s3_save_file = appConstants.PATH_SAVE_JOB_ATTACHMENT_ON_S3;
    let fileObj = ref([]);
    let resumeObj = ref([]);
    let s3SavedFilePath = ref();
    let s3SavedFileName = ref();
    let dropDownIntValue = [];
    let country_state_city = ref({});
    let locationData = ref({
      country: "",
      state: "",
      city: "",
      state_iso: "",
      country_code: "",
      country_iso: "",
    });

    let application_data = reactive({
      notice_period: "",
      higher_education_level: "",
      current_ctc: "",
      expected_ctc: "",
      current_city: "",
      state_code: "",
      current_state: "",
      current_country: "",
      current_country_iso: "",
      CTC_unit: 1,
      CTC_unit_str: "LPA",
      is_readyToRelocate: false,
    });

    store.dispatch("login/action_fetchUserDetails");
    let userData = computed(() => store.getters["login/getter_user"]);

    const rules = {
      notice_period: {
        required: helpers.withMessage("Notice period is required", required),
      },
      higher_education_level: {
        required: helpers.withMessage(
          "Higher education level is required",
          required
        ),
      },
      current_ctc: {
        required: helpers.withMessage(
          "Current CTC is required",
          requiredIf(userData.value.total_exp > 0)
        ),
      },
      expected_ctc: {
        required: helpers.withMessage("Expected CTC is required", required),
      },
      // current_city: {
      //   required: helpers.withMessage("Current City is required", required),
      // },
      // is_readyToRelocate: {
      //   required: helpers.withMessage(
      //     "Ready to relocate is required",
      //     required
      //   ),
      // },
    };
    const v$ = useVuelidate(rules, application_data);

    let test = ref("");
    // let isUploadS3 = ref();
    let coverNoteText = ref(`Dear Sir/ Madam,

In reference to job position posted by you, I hereby submit my application for the post of 'job_title'.

Please do review my application and I look forward towards hearing from you.

Should you wish to know or discuss anything further, then please contact me on my mobile or email as mentioned in my CV.`);

    coverNoteText.value = coverNoteText.value.replace(
      "job_title",
      props.singleJobData.job_title
    );

    let readyTorelocate_options = [
      {
        id: true,
        name: "Yes",
      },

      {
        id: false,
        name: "No",
      },
    ];

    let suitabilityStatus = computed(
      () => store.getters["jobs/getter_suitabilityStatus"]
    );

    let levelofStudy_options = computed(
      () => store.getters["dropdown/getter_levelOfStudy"]
    );
    const zip_file_type = appConstants.upload_file_type.PDF;

    let notice_period_options = appConstants.job_notice_period_list;
    let uploadComponentKeyValue = ref("");
    let total_uploaded_file = ref(0);
    let errorMessage = ref("");
    let ref_InMemoryLoadAndPreviewSingleFile = ref();

    store.dispatch("dropdown/action_getLevelOfStudy");

    getIntNumber(1, 100);

    function getIntNumber(start_number, end_number) {
      let number_list = [];
      for (let i = start_number; i <= end_number; i++) {
        number_list.push({
          id: i,
          name: `${i} ${application_data.CTC_unit_str}`,
        });
      }

      dropDownIntValue = number_list;
    }
    function applyJob() {
      let url = props.singleJobData.job_application_url;
      //console.log(url)
      window.open(url, "_blank");
      displayConfirmationForExternalUrl.value = true;
    }
    function checkProfileStatus() {
      store.dispatch("jobs/action_getUserProfileStatus").then((res) => {
        //console.log("Profile", userProfileStatus.value);
        if (props.userProfileStatus.shareable == true) {
          redirectCoverNote();
        } else {
          displayConfirmationForBuildCv.value = true;
          //confirmationMessage.value = "Your CV is not completed. Please go to Build CV to complete it and enable sharing";
        }
      });
    }
    function redirectCoverNote() {
      isCoverNote.value = true;
    }
    function clickCancel() {
      displayConfirmation.value = false;
    }
    function clickForContinue() {
      displayConfirmation.value = false;
      checkProfileStatus();
      isCoverNote.value = true;
    }
    function clickNo() {
      displayConfirmationForExternalUrl.value = false;
    }
    function clickYes() {
      displayConfirmationForExternalUrl.value = false;
    }
    function openDialog() {
      fileUpload.value.click();
    }
    function previewFiles(event) {
      fileName.value = event.target.files[0].name;
      fileObj.value = event.target.files;
      //console.log("fileObj", fileObj.value);
      let resultFileType = checkFileTypeValid(
        acceptableFileType,
        fileName.value
      );
      if (resultFileType) {
        fileName.value = event.target.files[0].name;
      } else {
        toast.add({
          severity: appConstants.toast_severity.WARN,
          summary: appConstants.toast_summary.WARN,
          detail: "Please select only pdf files",
          life: 3000,
        });
        event.target.value = null;
        fileName.value = "";
        fileObj.value = "";
        // fileUpload.value = "";
        s3SavedFileName.value = "";
        s3SavedFilePath.value = "";
      }
    }
    function previewResume(event) {
      resumeFile.value = event.target.files[0].name;
      resumeObj.value = event.target.files;
      //console.log("resumeObj", resumeObj.value);
      let resultFileType = checkFileTypeValid(
        acceptableFileType,
        resumeFile.value
      );
      if (resultFileType) {
        resumeFile.value = event.target.files[0].name;
      } else {
        toast.add({
          severity: appConstants.toast_severity.WARN,
          summary: appConstants.toast_summary.WARN,
          detail: "Please select only pdf files",
          life: 3000,
        });
        event.target.value = null;
        resumeFile.value = "";
        resumeObj.value = "";
        // fileUpload.value = "";
        s3SavedFileName.value = "";
        s3SavedFilePath.value = "";
      }
    }
    function checkFileTypeValid(acceptableFileType, attachmentName) {
      var result = false;
      let fileExt = attachmentName.substr(attachmentName.lastIndexOf("."));
      if (acceptableFileType == fileExt) {
        result = true;
      }
      return result;
    }
    function setRandomStr() {
      uploadComponentKeyValue.value = getRandomString();
    }
    function file_changed(value) {
      total_uploaded_file.value = value.file_count;
    }

    function mediaUploadedToS3(value) {
      // console.log("mediaUploadedToS3");
      // console.log(value);
      s3SavedFileName.value = value["image_name"];
      if (s3SavedFileName.value != "" && s3SavedFilePath.value != "") {
        let data = getDataToSave(s3SavedFileName.value);
        //console.log("cover note data =>", data);
        store
          .dispatch("jobs/action_appliedJobWithCoverNote", data)
          .then((res) => {
            emit("emitApplyJob", true);
            toast.add({
              severity: appConstants.toast_severity.SUCCESS,
              summary: appConstants.toast_summary.SUCCESS,
              detail: "Successfully applied",
              life: 3000,
            });
          });
      } else {
        toast.add({
          severity: appConstants.toast_severity.ERROR,
          summary: appConstants.toast_summary.ERROR,
          detail: "Please upload your CV",
          life: 3000,
        });
      }
      // let payload = {
      //   zip_file_name: value["image_name"],
      //   job_id: "",
      //   user_id: "  ",
      // };
    }
    // async function uploadZipFile() {
    //   //if (this.allCompanies.length > 0) {
    //   ref_InMemoryLoadAndPreviewSingleFile.value.btnUploadFile();
    //   // } else {
    //   //   this.showUploadZipFileErrorModal = true;
    //   //   this.errorMessage =
    //   //     "You don't have company, please create company first";
    //   // }
    // }

    async function submitCoverNote() {
      //await uploadZipFile();

      if (country_state_city.value) {
        let data = country_state_city.value.location;
        application_data.current_country = data.country;
        application_data.current_state = data.state;
        application_data.current_city = data.city;
        application_data.country_code = data.country_code;
        application_data.current_country_iso = data.country_iso;
        application_data.state_code = data.state_iso;
      }
      v$.value.$touch();
      if (v$.value.$invalid) {
        // alert("validation required");
        return false;
      }
      let length =
        ref_InMemoryLoadAndPreviewSingleFile.value.uploaded_files.length;
      if (length > 0) {
        await ref_InMemoryLoadAndPreviewSingleFile.value.btnUploadFile();
      } else {
        toast.add({
          severity: appConstants.toast_severity.ERROR,
          summary: appConstants.toast_summary.ERROR,
          detail: "Please upload your CV",
          life: 3000,
        });
      }
      // if (resumeObj.value == "") {
      //   toast.add({
      //     severity: appConstants.toast_severity.ERROR,
      //     summary: appConstants.toast_summary.ERROR,
      //     detail: "Please upload your CV",
      //     life: 3000,
      //   });
      //   return;
      // }

      //if (props.singleJobData.attachment_required == true) {
      //await uploadAttachmentOnS3(resumeObj.value);
      // if (s3SavedFileName.value != "" && s3SavedFilePath.value != "") {
      //   // let data = {
      //   //   applicant_resume: props.userProfileStatus.cv,
      //   //   attachment_file: s3SavedFileName.value,
      //   //   cover_note: coverNoteText.value,
      //   //   job_id: props.singleJobData.id,
      //   // };

      //   let data = getDataToSave(s3SavedFileName.value);
      //   console.log("cover note data =>", data);
      //   // store
      //   //   .dispatch("jobs/action_appliedJobWithCoverNote", data)
      //   //   .then((res) => {
      //   //     emit("emitApplyJob", true);
      //   //     toast.add({
      //   //       severity: appConstants.toast_severity.SUCCESS,
      //   //       summary: appConstants.toast_summary.SUCCESS,
      //   //       detail: "Successfully applied",
      //   //       life: 3000,
      //   //     });
      //   //   });
      // } else {
      //   toast.add({
      //     severity: appConstants.toast_severity.ERROR,
      //     summary: appConstants.toast_summary.ERROR,
      //     detail: "Unable to upload file, Please try again later",
      //     life: 3000,
      //   });
      // }
      // } else {
      //   // let data = {
      //   //   applicant_resume: props.userProfileStatus.cv,
      //   //   attachment_file: "",
      //   //   cover_note: coverNoteText.value,
      //   //   job_id: props.singleJobData.id,
      //   // };
      //   let data = getDataToSave("");
      //   console.log("data to be save", data);
      //   // store
      //   //   .dispatch("jobs/action_appliedJobWithCoverNote", data)
      //   //   .then((res) => {
      //   //     emit("emitApplyJob", true);
      //   //     toast.add({
      //   //       severity: appConstants.toast_severity.SUCCESS,
      //   //       summary: appConstants.toast_summary.SUCCESS,
      //   //       detail: "You have successfully applied for a job",
      //   //       life: 3000,
      //   //     });
      //   //   });
      //   // }
      // }

      //uploadAttachmentOnS3(fileObj.value);
    }

    function getDataToSave(uploaded_file_name) {
      let data = {
        applicant_resume: props.userProfileStatus.cv,
        attachment_file: uploaded_file_name,
        cover_note: coverNoteText.value,
        job_id: props.singleJobData.id,

        current_city: application_data.current_city,
        state_code: application_data.state_code,
        current_state: application_data.current_state,
        current_country: application_data.current_country,
        country_code: application_data.current_country_iso,
        current_ctc:
          application_data.current_ctc == ""
            ? null
            : application_data.current_ctc,
        expected_ctc:
          application_data.expected_ctc == ""
            ? null
            : application_data.expected_ctc,
        ctc_unit: application_data.CTC_unit,
        notice_period: application_data.notice_period,
        highest_education_level: application_data.higher_education_level,
        is_readyToRelocate: application_data.is_readyToRelocate,
      };

      return data;
    }
    async function uploadAttachmentOnS3(attachmentObj) {
      //console.log("attachment",attachment);

      let attachment = attachmentObj[0];
      if (attachmentObj) {
        //let result = false;
        let fileExt = attachmentObj[0].name.substr(
          attachmentObj[0].name.lastIndexOf(".")
        );
        let fileName = uuid.v1() + fileExt;
        //console.log("attachment", attachment);
        await uploadFileOnS3(
          fileName,
          path_s3_save_file,
          attachment,
          appConstants.PDF_CONTENT_TYPE
        )
          .then((data) => {
            (s3SavedFileName.value = data.savedFileName),
              (s3SavedFilePath.value = data.serverFilePath);
            //isUploadS3.value = true;
            // console.log("result", isUploadS3.value);

            //return isUploadS3.value;
          })
          .catch((err) => {
            console.log("err", err);
            //isUploadS3 = false;
            //return isUploadS3.value;
          });
      }
      //
    }

    function selectedCurrentCity(location) {
      if (location != null) {
        application_data.current_city = location.city;
        application_data.state_code = location.state_iso;
        application_data.current_state = location.state;
        application_data.current_country = location.country;
        application_data.current_country_iso = location.country_iso;
      } else {
        application_data.current_city = "";
        application_data.state_code = "";
        application_data.current_state = "";
        application_data.current_country = "";
        application_data.current_country_iso = "";
      }

      application_data.is_readyToRelocate = false;
      isShowReadyToRelocate();
    }

    function isShowReadyToRelocate() {
      // if (userData.value.city != props.singleJobData.city) {
      //   return true;
      // }
      // if (userData.value.state_iso != props.singleJobData.state_iso) {
      //   return true;
      // } else {
      //   return false;
      // }

      if (props.singleJobData.mandatory_location) {
        if (application_data.current_city == "") {
          return false;
        }

        if (application_data.current_city != props.singleJobData.city) {
          return true;
        }

        if (application_data.state_code != props.singleJobData.state_iso) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }

    function isShowCurrentCTC() {
      if (userData.value.total_exp > 0) {
        return true;
      } else {
        return false;
      }
    }

    function currentLocationChanged(location_obj) {
      //console.log("location changed");
    }

    onMounted(() => {
      $emitter.on("country_city_updated", (location_obj) => {
        selectedCurrentCity(location_obj);
      });
    });

    onUnmounted(() => {
      $emitter.off("country_city_updated");
    });

    return {
      v$,
      suitabilityStatus,
      displayConfirmation,
      clickCancel,
      clickForContinue,
      clickNo,
      clickYes,
      displayConfirmationForExternalUrl,
      isCoverNote,
      //userProfileStatus,
      locationData,
      displayConfirmationForBuildCv,
      uploadIcon,
      openDialog,
      fileUpload,
      previewFiles,
      previewResume,
      fileName,
      resumeFile,
      coverNoteText,
      submitCoverNote,
      path_s3_save_file,
      fileObj,
      resumeObj,
      s3SavedFilePath,
      s3SavedFileName,
      //isUploadS3,
      notice_period_options,
      application_data,
      levelofStudy_options,
      dropDownIntValue,
      selectedCurrentCity,
      readyTorelocate_options,
      isShowReadyToRelocate,
      isShowCurrentCTC,
      country_state_city,
      currentLocationChanged,
      uploadComponentKeyValue,
      zip_file_type,
      total_uploaded_file,
      errorMessage,
      ref_InMemoryLoadAndPreviewSingleFile,
      mediaUploadedToS3,
      setRandomStr,
      file_changed,
      //uploadZipFile,
    };
  },
};
</script>
>
<style scoped></style>
