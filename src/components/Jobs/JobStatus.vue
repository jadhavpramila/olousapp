<template>
  <div>
    <div class="">
      <!-- Label row -->
      <div class="grid job-status-text">
        <div class="col-span-2 text-sm" :class="getReceivedTextCss()">
          Received
        </div>
        <div></div>
        <div
          class="col-span-2 flex justify-end text-sm"
          :class="getAcceptedTextCss()"
        >
          Accepted
        </div>
      </div>

      <!-- up arrow row -->
      <div class="grid job-status-text mt-1">
        <div class="flex justify-center items-end">
          <img
            :src="getStaticImage('job_status_down.svg')"
            alt=""
            class="rotate-180 h-[0.75rem]"
          />
        </div>
        <div></div>
        <div></div>
        <div></div>
        <div class="flex justify-center items-end">
          <img
            :src="getStaticImage('job_status_down.svg')"
            alt=""
            class="rotate-180 h-[0.75rem]"
          />
        </div>
      </div>

      <!-- Image row -->
      <div class="grid job-status">
        <div class="flex justify-center">
          <img :src="getReceivedImage()" alt="" class="w-full" />
        </div>
        <div class="h-full flex items-center justify-center">
          <div class="w-full">
            <hr class="w-full" />
          </div>
          <div class="absolute">
            <img :src="getReceivedUnderReviewDotImage()" alt="" class="" />
          </div>
        </div>
        <div class="flex justify-center">
          <img :src="getUnderReviewImage()" alt="" class="w-full" />
        </div>
        <div class="h-full flex items-center justify-center">
          <div class="w-full">
            <hr class="w-full" />
          </div>
          <div class="absolute">
            <img :src="getUnderReviewAcceptedDotImage()" alt="" class="" />
          </div>
        </div>
        <div class="flex justify-center">
          <img :src="getAcceptedImage()" alt="" class="w-full" />
        </div>
      </div>

      <!-- down arrow row -->
      <div class="grid job-status-text">
        <div></div>
        <div></div>
        <div class="flex justify-center tems-start">
          <img
            :src="getStaticImage('job_status_down.svg')"
            alt=""
            class="h-[0.75rem]"
          />
        </div>
        <div></div>
        <div></div>
      </div>

      <!-- Label row -->
      <div class="grid job-status-text">
        <div></div>
        <div
          class="col-span-3 flex justify-center text-[0.875rem]"
          :class="getUnderReviewTextCss()"
        >
          Under Review
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance } from "vue";
import appConstants from "../../appConstants.js";

export default {
  name: "JobStatus",
  props: {
    jobStatus: {
      type: Number,
      default: 0,
    },
  },

  setup(props) {
    const app = getCurrentInstance();
    const $getStaticImage =
      app.appContext.config.globalProperties.getStaticImage;

    const application_status = appConstants.job_applciation_status;

    function isApplicationReceived() {
      if (props.jobStatus > 0) {
        return true;
      } else {
        return false;
      }
    }

    function isApplicationUnderReview() {
      if (
        props.jobStatus == application_status.UNDER_REVIEW ||
        props.jobStatus == application_status.ACCEPTED ||
        props.jobStatus == application_status.REJECTED ||
        props.jobStatus == application_status.INTERVIEW_REQUESTED ||
        props.jobStatus == application_status.INTERVIEW_SCHEDULED
      ) {
        return true;
      } else {
        return false;
      }
    }

    function isApplicationAccepted() {
      if (
        props.jobStatus == application_status.ACCEPTED ||
        props.jobStatus == application_status.INTERVIEW_REQUESTED ||
        props.jobStatus == application_status.INTERVIEW_SCHEDULED
      ) {
        return true;
      } else {
        return false;
      }
    }

    function getReceivedImage() {
      if (isApplicationReceived()) {
        return $getStaticImage("Job_green_applicant_status.svg");
      } else {
        return $getStaticImage("Job_gray_applicant_status.svg");
      }
    }

    function getUnderReviewImage() {
      if (isApplicationUnderReview()) {
        return $getStaticImage("Job_green_applicant_status.svg");
      } else {
        return $getStaticImage("Job_gray_applicant_status.svg");
      }
    }

    function getAcceptedImage() {
      if (isApplicationAccepted()) {
        return $getStaticImage("Job_green_applicant_status.svg");
      } else {
        return $getStaticImage("Job_gray_applicant_status.svg");
      }
    }

    function getReceivedUnderReviewDotImage() {
      if (isApplicationReceived()) {
        return $getStaticImage("job_green_dot.svg");
      } else {
        return $getStaticImage("job_gray_dot.svg");
      }
    }

    function getUnderReviewAcceptedDotImage() {
      if (isApplicationUnderReview()) {
        return $getStaticImage("job_green_dot.svg");
      } else {
        return $getStaticImage("job_gray_dot.svg");
      }
    }

    function getReceivedTextCss() {
      if (isApplicationReceived()) {
        return "font-bold";
      } else {
        return "text-[#a8a8a8]";
      }
    }

    function getUnderReviewTextCss() {
      if (isApplicationUnderReview()) {
        return "font-bold";
      } else {
        return "text-[#a8a8a8]";
      }
    }

    function getAcceptedTextCss() {
      if (isApplicationAccepted()) {
        return "font-bold";
      } else {
        return "text-[#a8a8a8]";
      }
    }

    return {
      getReceivedImage,
      getUnderReviewImage,
      getAcceptedImage,
      getReceivedUnderReviewDotImage,
      getUnderReviewAcceptedDotImage,
      getReceivedTextCss,
      getUnderReviewTextCss,
      getAcceptedTextCss,
    };
  },
};
</script>
<style scoped>
.job-status,
.job-status-text {
  grid-template-columns: 3.35rem auto 3.35rem auto 3.35rem;
}

@media only screen and (max-width: 768px) {
  .job-status,
  .job-status-text {
    grid-template-columns: 2.5rem auto 2.5rem auto 2.5rem;
  }
}
</style>
