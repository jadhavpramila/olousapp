<template>
  <div class="cls-jobdetails form-container" v-if="!isJobFound">
    <div
      class="job-profile-container bg-[#333] lg:p-4 md:p-4 p-3 rounded-t-lg"
      v-if="!isCoverNote"
    >
      <div
        class="flex lg:items-center md:items-center items-start justify-between"
      >
        <img
          :src="setCompanyImage(singleJobData.company_logo)"
          alt=""
          class="object-contain lg:w-[8.125rem] md:w-[8.125rem] w-[3rem] bg-[#fff] lg:h-[8.125rem] md:h-[8.125rem] h-[3rem] rounded-lg"
        />
        <div class="lg:hidden md:hidden block" v-if="!isClosedJob">
          <button
            class="bg-white flex inline-flex items-center justify-center lg:px-4 md:px-4 px-3 lg:py-2 md:py-2 py-1 rounded-md"
            @click="clickShare()"
          >
            <img
              :src="getStaticImage('Job-Share.svg')"
              alt=""
              class="lg:w-full md:w-full w-2/5"
            />
            <span class="font-bold lg:ml-1 md:ml-1 ml-0.5 text-black text-xs">
              Share
            </span>
          </button>
        </div>
      </div>
      <div
        class="flex flex-col justify-between lg:ml-2 md:ml-2 ml-0 lg:mt-0 md:mt-0 mt-4"
      >
        <div>
          <h1 class="lg:text-lg md:text-lg text-base font-weight-700 job-title">
            {{ singleJobData.job_title }}
          </h1>
          <p class="text-sm text-white font-weight-700 tracking-wide mt-1">
            {{ singleJobData.company }}
          </p>
          <p
            class="lg:text-sm md:text-sm text-sm flex inline-flex items-center leading-3 lg:mt-2 md:mt-2 mt-6 text-white font-light"
          >
            <img :src="getStaticImage('Location-Job.svg')" alt="location" />
            <span class="ml-1"
              >{{ singleJobData.country }} -
              {{ getJobCities(singleJobData.location) }}</span
            >
          </p>
        </div>
        <div>
          <div class="mt-1.5 flex w-full inline-block h-auto">
            <ul
              class="lg:flex md:flex lg:inline-flex md:inline-flex lg:gap-4 md:gap-4 grid grid-cols-1 gap-2"
            >
              <li>
                <div class="flex inline-flex items-center">
                  <img
                    :src="getStaticImage('Experience-Job.svg')"
                    alt="Experience"
                    class=""
                  />
                  <p
                    class="lg:text-sm md:text-sm text-sm leading-3 text-white font-light lg:ml-1 md:ml-1 ml-1"
                  >
                    Min {{ singleJobData.min_exp }} yrs - Max
                    {{ singleJobData.max_exp }} yrs
                  </p>
                </div>
              </li>
              <li>
                <div class="flex inline-flex items-center">
                  <img
                    :src="getStaticImage('Employment-Job.svg')"
                    alt=""
                    class=""
                  />
                  <span v-if="singleJobData.employment">
                    <p
                      class="ml-1 lg:text-sm md:text-sm text-sm leading-3 text-white font-light lg:ml-1 md:ml-1 ml-1"
                    >
                      {{ setEmpoymentType(singleJobData.employment) }}
                    </p>
                  </span>
                  <span v-else>
                    <p
                      class="lg:text-sm md:text-sm text-sm text-white font-light lg:ml-1 md:ml-1 ml-1"
                    >
                      NA
                    </p>
                  </span>
                </div>
                <div class="flex inline-flex items-center lg:ml-4 md:ml-4 ml-4">
                  <img
                    :src="setImageForJobType(singleJobData)"
                    alt=""
                    class=""
                  />
                  <p
                    class="lg:text-sm md:text-sm text-sm leading-3 text-white font-light lg:ml-1 md:ml-1 ml-1"
                  >
                    {{ workLocationText }}
                  </p>
                </div>
              </li>
              <li>
                <div class="flex inline-flex items-center">
                  <img
                    :src="getStaticImage('Vacancy-Job.svg')"
                    alt=""
                    class=""
                  />
                  <p
                    v-if="singleJobData.vacancy <= 1"
                    class="lg:text-sm md:text-sm text-sm leading-3 text-white font-light lg:ml-1 md:ml-1 ml-1"
                  >
                    {{ singleJobData.vacancy }} Position
                  </p>
                  <p
                    v-if="singleJobData.vacancy > 1"
                    class="lg:text-sm md:text-sm text-sm leading-3 text-white font-light lg:ml-1 md:ml-1 ml-1"
                  >
                    {{ singleJobData.vacancy }} Positions
                  </p>
                </div>
              </li>
              <li v-if="singleJobData.ctc">
                <div class="flex inline-flex items-center">
                  <img :src="getStaticImage('CTC-Job.svg')" alt="CTC" />
                  <p
                    class="lg:text-sm md:text-sm text-sm leading-3 text-white font-light ml-1"
                  >
                    {{ singleJobData.ctc }}
                  </p>
                </div>
              </li>
              <li>
                <div
                  class="flex inline-flex items-center"
                  v-if="!singleJobData.job_application?.isApplied"
                >
                  <img
                    :src="setImageForJobStatus(singleJobData.expires_at)"
                    alt="call"
                    class="mr-1"
                  />
                  <p
                    class="text-white font-light lg:text-sm md:text-sm text-sm leading-3"
                  >
                    {{ setClosingStatus(singleJobData.expires_at) }}
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div class="lg:hidden md:hidden block">
            <div
              v-if="singleJobData.is_applied == false && !isClosedJob"
              class="w-full flex flex-col mt-2"
            >
              <button
                class="bg-white text-black text-xs font-bold lg:py-2 md:py-2 py-1.5 lg:px-7 md:px-7 px-2 rounded-md"
                @click="clickApply"
              >
                Apply
              </button>
            </div>
            <div v-if="singleJobData.is_applied == true && !isClosedJob">
              <span
                class="text-white inline-flex items-center lg:text-base md:text-base text-xs font-medium rounded-md px-2"
              >
                Applied
              </span>
            </div>
            <div v-if="isClosedJob" class="w-full flex flex-col mt-2">
              <button
                class="bg-white text-black text-xs font-bold lg:py-2 md:py-2 py-1.5 lg:px-7 md:px-7 px-2 rounded-md"
              >
                Closed
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex flex-col items-end lg:block md:block hidden"
        v-if="isClosedJob"
      >
        <div>
          <span
            class="text-white inline-flex items-center lg:text-base md:text-base text-xs font-medium rounded-md px-2"
          >
            Closed
          </span>
        </div>
      </div>
      <div class="flex flex-col items-end" v-if="!isClosedJob">
        <div v-if="singleJobData.is_applied == false">
          <button
            class="bg-white text-black text-xs font-bold lg:py-2 md:py-2 py-1 lg:px-7 md:px-7 px-2 rounded-md lg:block md:block hidden"
            @click="clickApply"
          >
            Apply
          </button>
        </div>
        <div v-if="singleJobData.is_applied == true">
          <span
            class="text-white inline-flex items-center lg:text-base md:text-base text-xs font-medium rounded-md px-2"
          >
            Applied
          </span>
        </div>
        <div
          class="flex justify-between items-end lg:mt-4 md:mt-4 mt-0 lg:block md:block hidden"
        >
          <div>
            <button
              class="bg-white flex inline-flex items-center justify-center lg:px-4 md:px-4 px-3 lg:py-2 md:py-2 py-1 rounded-md"
              @click="clickShare()"
            >
              <img
                :src="getStaticImage('Job-Share.svg')"
                alt=""
                class="lg:w-full md:w-full w-2/5"
              />
              <span class="font-bold lg:ml-1 md:ml-1 ml-0.5 text-black text-xs">
                Share
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-[#e0e0e0] p-5 rounded-b-lg" v-if="!isCoverNote">
      <div class="flex w-full flex-col">
        <h1 class="text-base text-black font-weight-700">
          <span class="text-base text-black">&bull;</span>Job Description:-
        </h1>
        <p
          class="text-sm text-black break-all ml-4 font-weight-500"
          :innerHTML="setJobDescription(singleJobData)"
        ></p>
      </div>
      <div class="flex w-full flex-col mt-4">
        <h1 class="text-base text-black font-weight-700">
          <span class="text-base text-black">&bull;</span>
          Profile Requirement:-
        </h1>
        <p
          class="text-sm text-black break-all ml-4 font-weight-500"
          :innerHTML="setProfileRequirement(singleJobData)"
        ></p>
      </div>
      <!-- <div
        class="flex w-full flex-col text-black mt-4"
        v-if="singleJobData.professional_categories?.length > 0"
      >
        <h1 class="text-base text-black font-weight-700 ml-4">
          Profession -
        </h1>
        <p class="text-sm ml-4 font-weight-500">{{ professions }}</p>
      </div>
      <div
        class="flex w-full flex-col text-black mt-4"
        v-if="singleJobData.sectors?.length > 0"
      >
        <h1 class="text-base text-black font-weight-700 ml-4">
          Sectors -
        </h1>
        <p class="text-sm ml-4 font-weight-500">{{ sectors }}</p>
      </div> -->
      <div
        class="flex w-full flex-col text-black mt-4"
        v-if="singleJobData.languages?.length > 0"
      >
        <h1 class="text-base text-black font-weight-700">
          <span class="text-base text-black">&bull;</span> Languages -
        </h1>
        <p
          class="text-sm ml-4"
          v-for="(language, index) in languages"
          :key="index"
        >
          {{ language }} - Fluent, Verbal and Written
        </p>
      </div>
      <div
        class="flex w-full flex-col text-black mt-4"
        v-if="singleJobData.company_info"
      >
        <h1 class="text-base text-black font-weight-700">
          <span class="text-base text-black">&bull;</span> About Company -
        </h1>
        <p
          class="text-sm ml-4"
          :innerHTML="setAboutCompanyDetails(singleJobData)"
        ></p>
      </div>
      <div
        class="flex w-full flex-col text-black mt-4"
        v-if="singleJobData.company_website"
      >
        <h1 class="text-base text-black font-weight-700">
          <span class="text-base text-black">&bull;</span> Website -
        </h1>
        <a :href="singleJobData.company_website" target="_blank"
          ><p class="text-sm ml-4">{{ singleJobData.company_website }}</p></a
        >
      </div>
    </div>
  </div>

  <!-- If Cover Note -->

  <div class="flex justify-center" v-if="isCoverNote">
    <div
      class="bg-[#f2f2f2] p-4 rounded-3xl lg:w-[40rem] md:lg:w-[40rem] w-[18rem]"
    >
      <div class="flex w-full items-center">
        <h1 class="text-base text-black font-medium w-full justify-center">
          Cover Note
        </h1>
        <div class="flex justify-end w-full cursor-pointer">
          <img
            :src="getStaticImage('Close-Black.svg')"
            alt=""
            @click="clickClose()"
          />
        </div>
      </div>
      <CoverNote
        :singleJobData="singleJobData"
        :userProfileStatus="userProfileStatus"
        @emitApplyJob="appliedJob"
      />
    </div>
  </div>
  <!-- If Not suitable -->
  <Dialog
    header="Confirmation"
    v-model:visible="displayConfirmationForSuitability"
    :style="{ width: '350px' }"
    :modal="true"
  >
    <div class="confirmation-content flex items-center">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 1rem" />
      <span class="lg:text-base md:text-base text-sm"
        >Your Profile is not suitable for this job. Do you still wish to
        continue?</span
      >
    </div>
    <template #footer>
      <Button
        label="Cancel"
        @click="NoToJobApply"
        class="p-button-text lg:text-base md:text-base text-sm w-24"
      />
      <Button
        label="Yes"
        @click="continueToJobApply"
        class="p-button-text lg:text-base md:text-base text-sm w-24"
        autofocus
      />
    </template>
  </Dialog>
  <!-- If external URL -->
  <Dialog
    header="Confirmation"
    v-model:visible="displayConfirmationForExternalUrl"
    :style="{ width: '350px' }"
    :modal="true"
  >
    <div class="confirmation-content flex items-center">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 1rem" />
      <span class="lg:text-base md:text-base text-sm"
        >Did you apply for the job?</span
      >
    </div>
    <template #footer>
      <Button
        label="No"
        @click="notApplyJob"
        class="p-button-text lg:text-base md:text-base text-sm w-24"
      />
      <Button
        label="Yes"
        @click="yesApplyJob"
        class="p-button-text lg:text-base md:text-base text-sm w-24"
        autofocus
      />
    </template>
  </Dialog>
  <Dialog
    header="Confirmation"
    v-model:visible="displayConfirmationForBuildCv"
    :style="{ width: '350px' }"
    :modal="true"
  >
    <div class="confirmation-content flex items-center">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 1rem" />
      <span class="lg:text-base md:text-base text-sm"
        >Your CV is not completed. Please go to "Build CV" to complete it and
        enable sharing.</span
      >
    </div>
    <template #footer>
      <Button
        label="Cancel"
        @click="clickBuildCvCancel"
        class="p-button-text lg:text-base md:text-base text-sm w-24"
      />
      <Button
        label="Build CV"
        @click="clickBuildCvOk"
        class="p-button-text lg:text-base md:text-base text-sm w-24"
        autofocus
      />
    </template>
  </Dialog>
  <div v-if="isJobFound" class="w-full flex flex-col h-full form-container">
    <div class="flex justify-center flex-col items-center">
      <img :src="getStaticImage('Dummy-Not-Found-icon.svg')" alt="" />
      <h1 class="text-white text-3xl mt-2 font-weight-700">
        This job is not available
      </h1>
    </div>
  </div>
</template>
<script>
import { ref, onMounted, onBeforeMount, reactive } from "vue";
import appConstants from "../../appConstants.js";
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import CoverNote from "./CoverNote.vue";
import { useToast } from "primevue/usetoast";
import NotFound from "../Layout/NotFound.vue";
import {
  getProfessionValues,
  getSectorValues,
  getLanguagesValues,
} from "../../common/js/getValuesFromIds.js";
import { copyTextToClipboard } from "../../common/js/commonFunctions.js";
import { getCurrentInstance } from "vue";
import { useMeta } from "vue-meta";
import { createImageUrlForOgTags } from "../../common/js/getCompressedImageURL.js";
import { getUUIDtoEncodedString } from "/src/common/js/UUIDtoBase64.js";
import { createJobURL, getCurrentEncodedURL } from "../../common/js/webUrls.js";
export default {
  name: "JobDetailsChild",
  components: { Button, Dialog, CoverNote, NotFound },
  props: {
    job_id: String,
  },
  data() {
    return {};
  },
  async setup(props) {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const toast = useToast();
    let displayConfirmationForSuitability = ref(false);
    let displayConfirmationForExternalUrl = ref(false);
    let isCoverNote = ref(false);
    let confirmationMessage = ref("");
    let fileUpload = ref(null);
    let displayConfirmationForBuildCv = ref(false);
    let uploadIcon = "	pi pi-upload";
    let id = "postImage";
    let isJobFound = ref(false);
    let professions = ref();
    let sectors = ref();
    let languages = ref();
    const app = getCurrentInstance();
    const $getStaticImage =
      app.appContext.config.globalProperties.getStaticImage;
    let workLocation = appConstants.WORK_LOCATION;
    let workLocationText = ref();
    let isClosedJob = ref(false);

    const JobsStatus = {
      ACTIVE: "Open",
      CLOSED: "Closed",
      CLOSINGSOON: "Closing Soon",
      APPLIED: "Applied",
    };

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

    // let jobId = route.params.job_id;
    let singleJobData = computed(
      () => store.getters["jobs/getter_singleJobData"]
    );
    let employmentTypes = computed(
      () => store.getters["dropdown/getter_empTypesData"]
    );

    let suitabilityStatus = computed(
      () => store.getters["jobs/getter_suitabilityStatus"]
    );

    let userProfileStatus = computed(
      () => store.getters["jobs/getter_userProfileStatus"]
    );

    let userData = computed(() => store.getters["login/getter_user"]);
    let getter_isUserLoggedIn = computed(
      () => store.getters["login/getter_isUserLoggedIn"]
    );

    await getSingleJobData();
    await getEmploymentType();

    async function getSingleJobData() {
      //const id = props.job_id.slice(0, 0);
      var splittedID = props.job_id.split(appConstants.url_separator_jobs);
      //console.log("id",splittedID[1])
      try {
        await store
          .dispatch("jobs/action_getSingleJobData", splittedID[1])
          .then((res) => {});
      } catch (error) {
        if (error.response?.status == appConstants.api_response.NOT_FOUNT) {
          // router.push({ name: appConstants.routes.HOME })
          isJobFound.value = true;
        }
      }
      if (singleJobData.value.professional_categories.length > 0) {
        await setProfession(singleJobData.value.professional_categories);
      }
      if (
        singleJobData.value.sectors.length > 0 ||
        singleJobData.value.languages.length > 0
      ) {
        await setSectors(singleJobData.value.sectors);
        setLanguages(singleJobData.value.languages);
      }
      getMetaData();
    }

    async function getEmploymentType() {
      await store.dispatch("dropdown/action_getEmploymentType").then((res) => {
        // console.log("daction_getEmploymentTypeata", res);
      });
    }
    function setCompanyImage(image) {
      // let imageUrl = `${import.meta.env.VITE_APP_COMPANY_IMGURL}${image}`;

      return image;
    }
    function setEmpoymentType(type) {
      let emptype = "";
      // console.log("type", type);
      for (let i = 0; i < employmentTypes.value.length; i++) {
        if (employmentTypes.value[i].id === type) {
          emptype = employmentTypes.value[i].employment_type;
          //console.log("type", emptype);
          return emptype;
        }
        //const element = array[index];
      }
    }
    function setProfileRequirement(data) {
      if (data.hasOwnProperty("profile_req")) {
        //console.log(data.profile_req.replace(/\n/g, "<br />"))
        return data.profile_req.replace(/\n/g, "<br />");
      } else {
        return "";
      }
    }
    function setJobDescription(data) {
      if (data.hasOwnProperty("job_description")) {
        //console.log(data.profile_req.replace(/\n/g, "<br />"))
        return data.job_description.replace(/\n/g, "<br />");
      } else {
        return "";
      }
    }
    function getJobCities(data) {
      let cities = [];
      for (let count = 0; count < data.length; count++) {
        cities.push(data[count].city);
      }

      let res = cities.join(", ");
      return res;
    }
    function clickApply() {
      if (getter_isUserLoggedIn.value) {
        // store
        //   .dispatch("jobs/action_getSuitabilityStatus", singleJobData.value.id)
        //   .then((res) => {
        //     if (suitabilityStatus.value.can_apply == true) {
        // displayConfirmationForSuitability.value = true;
        if (singleJobData.value.job_application_url) {
          applyJob();
        } else {
          checkProfileStatus();
        }
        // } else {
        //   displayConfirmationForSuitability.value = true;
        // }
        // });
      } else {
        // router.push({ name: appConstants.routes.LOGIN });
        getCurrentEncodedURL();
      }
    }
    function applyJob() {
      // router.push({
      //   name: appConstants.routes.JOBEXTERNAL,
      //   params: { job_id: singleJobData.value.id },
      // });
      let url = singleJobData.value.job_application_url;
      //console.log(url)
      window.open(url, "_blank");
      displayConfirmationForExternalUrl.value = true;
    }
    function checkProfileStatus() {
      store.dispatch("jobs/action_getUserProfileStatus").then((res) => {
        //console.log("Profile", userProfileStatus.value.cv);
        if (userProfileStatus.value.shareable == true) {
          redirectCoverNote();
        } else {
          displayConfirmationForBuildCv.value = true;
        }
      });
    }
    function redirectCoverNote() {
      isCoverNote.value = true;
    }
    function NoToJobApply() {
      displayConfirmationForSuitability.value = false;
    }
    function continueToJobApply() {
      displayConfirmationForSuitability.value = false;
      if (singleJobData.value.job_application_url) {
        applyJob();
      } else {
        checkProfileStatus();
      }
    }
    function notApplyJob() {
      displayConfirmationForExternalUrl.value = false;
    }
    function yesApplyJob() {
      displayConfirmationForExternalUrl.value = false;
      store
        .dispatch("jobs/action_applyExternalJobLink", singleJobData.value.id)
        .then((res) => {
          toast.add({
            severity: appConstants.toast_severity.SUCCESS,
            summary: appConstants.toast_summary.SUCCESS,
            detail: "Successfully applied ",
            life: 3000,
          });
        });
    }
    function clickBuildCvOk() {
      displayConfirmationForBuildCv.value = false;
      if (userData.value) {
        router.push({
          name: appConstants.routes.VIEWPROFILE,
          params: { user_slug: userData.value.slug },
        });
      }
    }
    function clickBuildCvCancel() {
      displayConfirmationForBuildCv.value = false;
    }
    function openDialog() {
      fileUpload.value.click();
    }
    async function setProfession(professionArray) {
      professions.value = await getProfessionValues(professionArray);
      //console.log(professions.value);
    }
    async function setSectors(sectorArray) {
      if (sectorArray.length > 0) {
        sectors.value = await getSectorValues(sectorArray);
      } else {
        sectors.value = "";
      }

      //console.log(sectors.value);
    }
    async function setLanguages(LanguageArray) {
      let languageArray = [];
      //console.log(LanguageArray);
      let newLang = await getLanguagesValues(LanguageArray);
      languages.value = newLang.split(", ");
    }
    function setAboutCompanyDetails(data) {
      if (data.hasOwnProperty("company_info")) {
        return data.company_info.replace(/\n/g, "<br />");
      } else {
        return "";
      }
    }
    function clickClose() {
      isCoverNote.value = false;
    }
    function appliedJob(val) {
      if (val) {
        isCoverNote.value = false;
      }
    }
    function clickShare() {
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
      // // this.display = "none";
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
    function calculateNoOfDays(expiryDate) {
      var currentDate = new Date().toISOString().split(".")[0] + "Z";
      const d2 = new Date(currentDate);
      //for (let i = 0; i < jobData.value.jobs.length; i++) {
      const d1 = new Date(expiryDate);
      var Difference_In_Time = d1.getTime() - d2.getTime();
      var Difference_In_Days = Math.round(
        Difference_In_Time / (24 * 60 * 60 * 1000)
      );
      return Difference_In_Days;
    }
    function setClosingStatus(expiryDate) {
      let days = calculateNoOfDays(expiryDate);
      //console.log("Difference_In_Days",days);
      if (days <= 0) {
        isClosedJob.value = true;
        return JobsStatus.CLOSED;
      } else if (days <= 5) {
        return JobsStatus.CLOSINGSOON;
      } else {
        return JobsStatus.ACTIVE;
      }
      //}
    }
    function setImageForJobStatus(expiryDate) {
      let days = calculateNoOfDays(expiryDate);
      //console.log("Difference_In_Days",days);
      if (days <= 0) {
        return $getStaticImage("Closed-White.svg");
      } else if (days <= 5) {
        return $getStaticImage("Closing-Soon-White.svg");
      } else {
        return $getStaticImage("Active-White.svg");
      }
    }
    function setImageForJobType(data) {
      if (data.work_location == workLocation.OFFICE) {
        workLocationText.value = "Office";
        return $getStaticImage("Office-Work-Job.svg");
      } else if (data.work_location == workLocation.ONSITE) {
        workLocationText.value = "Onsite";
        return $getStaticImage("Onsite-Job.svg");
      } else if (data.work_location == workLocation.REMOTE) {
        workLocationText.value = "WFH";
        return $getStaticImage("WFH-Job.svg");
      }
      //console.log("single job data", data);
    }
    function getParamsForURL(job) {
      let jobTitle = "";
      if (job.job_title != undefined && job.job_title != null) {
        jobTitle = job.job_title;
        //Other than all alphabets & space remove other characters
        jobTitle = jobTitle.replace(/[^a-zA-Z ]/g, "");
        //concate with "-""
        jobTitle = jobTitle.replace(/\ /g, "-");
      }
      return jobTitle;
    }
    function getMetaData() {
      if (singleJobData.value) {
        //Set keywords
        // metaKeywords.value = [Tiles,Paints,Wood,Plywood,"Steel Fabrication",Hardware,"Bathroom fittings",Furniture,"Plumbing fixtures",cladding,"Electrical Fittings",Doors,Adhesives,Ceilings,Flooring]

        let data = singleJobData.value;
        //let company = getter_CompanyProductData.value;

        //set title
        metaTitle.value = ` Olous Jobs | ${singleJobData.value.job_title} `;

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
          singleJobData.value.city != undefined &&
          singleJobData.value.city != null &&
          singleJobData.value.city != "" &&
          singleJobData.value.country != undefined &&
          singleJobData.value.country != null &&
          singleJobData.value.country != ""
        ) {
          location = `${singleJobData.value.city}, ${singleJobData.value.country}`;
          description = `${location} - ${data.job_description}`;
        } else {
          description = data.job_description;
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
        if (data.company_logo) {
          // for (let i = 0; i < data.medias.length; i++) {
          //   if (data.medias[i].is_primary) {
          //     primaryImageAt = i;
          //   }
          // }

          // //if primary image not set
          // if (data.medias[primaryImageAt].social_url) {
          //   metaImage.value = data.medias[primaryImageAt].social_url;
          // } else {
          imageURL = data.company_logo;
          metaImage.value = createImageUrlForOgTags(imageURL, true);
          // }

          // metaImage.value =  createImageUrlForOgTags(imageURL, true)
        }

        //set URL
        let result = getParamsForURL(data);
        let encode_str = getUUIDtoEncodedString(data.id);
        // console.log("data id", data.id);
        let URL = createJobURL(
          appConstants.current_URL,
          result,
          appConstants.url_separator_jobs,
          encode_str
        );
        metaURL.value = URL;

        //set Alt text
        metaImageAlt.value = data.job_title;
      }
    }
    // onMounted(() => {
    //   //getSingleJobData();
    // });
    return {
      getSingleJobData,
      singleJobData,
      setCompanyImage,
      setEmpoymentType,
      getJobCities,
      getEmploymentType,
      employmentTypes,
      setProfileRequirement,
      clickApply,
      setClosingStatus,
      setImageForJobStatus,
      setImageForJobType,
      suitabilityStatus,
      displayConfirmationForSuitability,
      NoToJobApply,
      continueToJobApply,
      setJobDescription,
      notApplyJob,
      yesApplyJob,
      displayConfirmationForExternalUrl,
      isCoverNote,
      applyJob,
      userProfileStatus,
      userData,
      getter_isUserLoggedIn,
      confirmationMessage,
      displayConfirmationForBuildCv,
      uploadIcon,
      openDialog,
      fileUpload,
      clickBuildCvOk,
      clickBuildCvCancel,
      isJobFound,
      setProfession,
      setSectors,
      setLanguages,
      setAboutCompanyDetails,
      professions,
      sectors,
      languages,
      workLocation,
      workLocationText,
      isClosedJob,
      clickClose,
      appliedJob,
      clickShare,
    };
  },
};
</script>
>
<style scoped></style>
