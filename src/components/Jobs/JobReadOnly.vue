<template>
  <div class="h-full">
    <div class="d-flex flex-column h-full">
      <div
        class="flex w-full col-12 column-gap lg:justify-end md:justify-end justify-center px-0 h-full"
      >
        <div class="flex" :class="getPricingColorClass(jobData)">
          <div
            class="flex items-center"
            v-if="jobData.plan_code != jobPricingPlanEnum.FREE"
          >
            <div
              class="items-center flex justify-center rect-bg"
              v-if="jobData.plan_code != jobPricingPlanEnum.FREE"
            >
              <div class="pricing-price">
                <span
                  class="pricing-price-rotate"
                  v-if="jobData.plan_type == pricingPlanDurationEnum.YEARLY"
                  >₹ {{ jobData.plan_price }} / Annually</span
                >
                <span
                  class=""
                  v-if="
                    jobData.plan_type == pricingPlanDurationEnum.HALF_YEARLY
                  "
                  >₹ {{ jobData.plan_price }} / Half-Yearly</span
                >
                <span
                  class=""
                  v-if="jobData.plan_type == pricingPlanDurationEnum.QUATERLY"
                  >₹ {{ jobData.plan_price }} / Quaterly</span
                >
                <span
                  class=""
                  v-if="jobData.plan_type == pricingPlanDurationEnum.MONTHLY"
                  >₹ {{ jobData.plan_price }} / Monthly</span
                >
              </div>
            </div>
          </div>

          <div
            v-if="jobData.plan_code != jobPricingPlanEnum.FREE"
            class="pricing-card"
          >
            <div class="flex flex-col">
              <span class="pricing-plan-name">{{ jobData.plan_name }}</span>

              <!-- <div class="hr-line"></div> -->
              <div class="flex flex-col">
                <ul>
                  <li
                    class="pricing-text"
                    v-if="
                      jobData.plan_code != jobPricingPlanEnum.FREE &&
                      jobData.plan_code == jobPricingPlanEnum.BASIC
                    "
                  >
                    12+2 Job Postings (Annually)
                  </li>
                  <li
                    class="pricing-text"
                    v-if="
                      jobData.plan_code != jobPricingPlanEnum.FREE &&
                      jobData.plan_code == jobPricingPlanEnum.PREMIUM
                    "
                  >
                    20+2 Job Postings (Annually)
                  </li>
                  <li
                    v-if="jobData.plan_code == jobPricingPlanEnum.FREE"
                    class="pricing-text mt-4"
                  >
                    2 Job Posting
                  </li>
                  <li class="pricing-text">
                    First two job Posting are complimentary Which Needs to be
                    consumed in one Month from the Date
                  </li>
                  <li class="pricing-text">
                    Receive Shortlisted Candidates for each job Posting
                  </li>
                  <li class="pricing-text">
                    AI driven Percentage Matching Report for each job Applicant
                  </li>
                </ul>
              </div>
            </div>
            <!-- <div class="flex justify-center">
              <span
                v-if="jobData.plan_code != jobPricingPlanEnum.FREE"
                class="buy-now-btn"
                @click="clickBuyNow(jobData.id)"
                >Buy Now</span
              >
            </div> -->
          </div>
        </div>
        <!-- <div class="pricing-card">
          <div class="rect-bg">
            <div class="flex flex-col">
              <span class="pricing-plan-name">{{ jobData.plan_name }}</span>
              <span class="pricing-price mt-5">₹ {{ jobData.plan_price }}</span>
              <span
                class="annually-text mt-1"
                v-if="jobData.plan_type == pricingPlanDurationEnum.YEARLY"
                >(Annually)</span
              >
              <span
                class="annually-text mt-1"
                v-if="jobData.plan_type == pricingPlanDurationEnum.HALF_YEARLY"
                >(Half-Yearly)</span
              >
              <span
                class="annually-text mt-1"
                v-if="jobData.plan_type == pricingPlanDurationEnum.QUATERLY"
                >(Quaterly)</span
              >
              <span
                class="annually-text mt-1"
                v-if="jobData.plan_type == pricingPlanDurationEnum.MONTHLY"
                >(Monthly)</span
              >
              <span class="text-base font-bold text-black mt-4"
                >Plan Details:</span
              >
              <span
                class="pricing-text mt-4"
                v-if="jobData.plan_code != jobPricingPlanEnum.FREE"
              >
                12+2 Job Postings (Annually)
              </span>
              <span v-else class="pricing-text mt-4">2 Job Posting</span>
            </div>

            <div class="hr-line"></div>
            <div class="d-flex flex-column">
              <span class="pricing-text">
                First two job Posting are complimentary Which Needs to be
                consumed in one Month from the Date
              </span>
            </div>

            <div class="hr-line"></div>
            <div class="d-flex flex-column">
              <span class="pricing-text">
                Receive Shortlisted Candidates for each job Posting
              </span>
            </div>

            <div class="hr-line"></div>
            <div class="d-flex flex-column">
              <span class="pricing-text">
                AI driven Percentage Matching Report for each job Applicant
              </span>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import appConstants from "../../appConstants.js";
import "../../assets/css/appcolor.css";

export default {
  name: "LeadReadOnly",
  components: {},
  props: {
    jobData: {
      type: Object,
      default: {},
    },
  },
  setup(props, context) {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    let category_enum = appConstants.category;
    let pricingPlanDurationEnum = appConstants.pricing_plan_duration;
    let jobPricingPlanEnum = appConstants.pricing_plan_job;

    function getCompnayName() {
      let req = setEmptyValue(props.jobData.requirement);
      return req.replace(/(\n){1,}/g, "<br />");
    }

    function getRequirementText() {
      let req = setEmptyValue(props.jobData.requirement);
      return req.replace(/(\n){1,}/g, "<br />");
    }

    function setEmptyValue(dropDownText) {
      if (dropDownText == "") {
        return "-";
      } else {
        return dropDownText;
      }
    }
    function getPricingColorClass(data) {
      if (data.plan_code == jobPricingPlanEnum.BASIC) {
        return "pricing-card-blue";
      } else if (data.plan_code == jobPricingPlanEnum.PREMIUM) {
        return "pricing-card-orange";
      }
    }

    return {
      category_enum,
      getRequirementText,
      setEmptyValue,
      pricingPlanDurationEnum,
      jobPricingPlanEnum,
      getPricingColorClass,
    };
  },
};
</script>

<style>
/* .pricing-card {
  width: 364px;
  height: 100%;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  padding: 20px;
  border: solid 1px var(--app-primary-color);
  background: var(--app-secondary-color);
}
.pricing-plan-name {
  font-size: 22px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: var(--app-primary-color);
}
.pricing-price {
  font-size: 30px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #1c1c1c;
}
.annually-text {
  font-size: 9px;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  color: #1c1c1c;
}

.hr-line {
  width: 100%;
  margin-top: 5px;
  margin-bottom: 5px;
  height: 1px;
  background-color: #707070;
}
.column-gap {
  column-gap: 20px;
}
*/
.pricing-text {
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #1c1c1c;
  line-height: 16px;
  margin-bottom: 20px;
}
.pricing-card-blue .pricing-card {
  width: 100%;
  height: auto;
  border-radius: 8px 0px 0px 8px;
  border: solid 1px var(--app-primary-color);
}
.pricing-card-blue .rect-bg {
  border-radius: 15px 0px 0px 15px;
  background-color: #479ef8;
  padding-top: 12px;
  padding-bottom: 12px;
  height: 75%;
  width: 61px;
}
.pricing-card-blue .pricing-plan-name {
  font-size: 30px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #479ef8;
  margin-top: 22px;
  margin-bottom: 22px;
  padding-left: 40px;
}

.pricing-card-blue .pricing-card ul {
  /* list-style: none; */
  list-style-image: url("../../assets/check-lg.svg");
  margin-bottom: 0px;
  padding-left: 40px;
}

.pricing-card-blue .pricing-price {
  font-size: 26px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  color: #fff;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 10px;
  padding-right: 10px;
}
.pricing-card-blue .pricing-price-rotate {
  transform: rotate(180deg);
  width: 100% !important;
  writing-mode: tb;
  text-orientation: sideways;
  display: flex;
}
.pricing-card-blue .buy-now-btn {
  width: 199px;
  height: 36px;
  border-radius: 6px;
  background-color: #479ef8;
  font-size: 14.5px;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 27px;
  margin-top: 13px;
}
.pricing-card-orange .pricing-card {
  width: 100%;
  height: auto;
  border-radius: 8px 0px 0px 8px;
  border: solid 1px var(--app-primary-color);
}
.pricing-card-orange .rect-bg {
  border-radius: 15px 0px 0px 15px;
  background-color: #d96f20;
  padding-top: 12px;
  padding-bottom: 12px;
  height: 75%;
  width: 61px;
}
.pricing-card-orange .pricing-plan-name {
  font-size: 30px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #d96f20;
  margin-top: 22px;
  margin-bottom: 22px;
  padding-left: 40px;
}

.pricing-card-orange .pricing-card ul {
  /* list-style: none; */
  list-style-image: url("../../assets/check-lg.svg");
  margin-bottom: 0px;
  padding-left: 40px;
}

.pricing-card-orange .pricing-price {
  font-size: 26px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  color: #fff;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 10px;
  padding-right: 10px;
}
.pricing-card-orange .pricing-price-rotate {
  transform: rotate(180deg);
  width: 100% !important;
  writing-mode: tb;
  text-orientation: sideways;
  display: flex;
}
.pricing-card-orange .buy-now-btn {
  width: 199px;
  height: 36px;
  border-radius: 6px;
  background-color: #d96f20;
  font-size: 14.5px;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 27px;
  margin-top: 13px;
}
@media only screen and (max-width: 600px) {
  .pricing-text {
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: left;
    color: #1c1c1c;
    line-height: 16px;
    margin-bottom: 14px;
  }
  .pricing-card-blue .pricing-card {
    width: 300px;
    height: auto;
    border-radius: 8px 0px 0px 8px;
    border: solid 1px var(--app-primary-color);
  }
  .pricing-card-blue .rect-bg {
    border-radius: 15px 0px 0px 15px;
    background-color: #479ef8;
    padding-top: 12px;
    padding-bottom: 12px;
    height: 75%;
    width: 40px;
  }
  .pricing-card-blue .pricing-plan-name {
    font-size: 20px;
    font-weight: 900;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: left;
    color: #479ef8;
    margin-top: 22px;
    margin-bottom: 22px;
    padding-left: 40px;
  }

  .pricing-card-blue .pricing-card ul {
    /* list-style: none; */
    list-style-image: url("../../assets/check-lg.svg");
    margin-bottom: 0px;
  }

  .pricing-card-blue .pricing-price {
    font-size: 18px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: center;
    color: #fff;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .pricing-card-blue .pricing-price-rotate {
    transform: rotate(180deg);
    width: 100% !important;
    writing-mode: tb;
    text-orientation: sideways;
    display: flex;
  }
  .pricing-card-blue .buy-now-btn {
    width: 199px;
    height: 36px;
    border-radius: 6px;
    background-color: #479ef8;
    font-size: 14.5px;
    font-weight: bold;
    color: #fff;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 27px;
    margin-top: 13px;
  }
  .pricing-card-orange .pricing-card {
    width: 300px;
    height: auto;
    border-radius: 8px 8px 8px 8px;
    border: solid 1px var(--app-primary-color);
  }
  .pricing-card-orange .rect-bg {
    border-radius: 15px 0px 0px 15px;
    background-color: #d96f20;
    padding-top: 12px;
    padding-bottom: 12px;
    height: 75%;
    width: 40px;
  }
  .pricing-card-orange .pricing-plan-name {
    font-size: 20px;
    font-weight: 900;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: left;
    color: #d96f20;
    margin-top: 22px;
    margin-bottom: 22px;
    padding-left: 40px;
  }

  .pricing-card-orange .pricing-card ul {
    /* list-style: none; */
    list-style-image: url("../../assets/check-lg.svg");
    margin-bottom: 0px;
    padding-left: 40px;
  }

  .pricing-card-orange .pricing-price {
    font-size: 18px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: center;
    color: #fff;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .pricing-card-orange .pricing-price-rotate {
    transform: rotate(180deg);
    width: 100% !important;
    writing-mode: tb;
    text-orientation: sideways;
    display: flex;
  }
  .pricing-card-orange .buy-now-btn {
    width: 199px;
    height: 36px;
    border-radius: 6px;
    background-color: #d96f20;
    font-size: 14.5px;
    font-weight: bold;
    color: #fff;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 27px;
    margin-top: 13px;
  }
}
</style>
