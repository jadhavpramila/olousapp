<template>
  <div>
    <div class="d-flex flex-column mr-2">
      <!-- <div>
        <div class="font-weight-700">
          {{ leadData.contact_name }}
        </div>
      </div> -->

      <div>
        <div class="fontSize14 font-weight-400">
          {{ leadData.company_name }}
        </div>

        <div v-if="leadData.address != ''">
          {{ leadData.address }}
        </div>
        <div class="fontSize14 font-weight-400">
          {{ leadData.city_state_country }}
        </div>
      </div>

      <div>
        <div class="fontSize14 font-weight-700 mt-3">
          <b>Category :- </b>
        </div>
        <div class="fontSize14 font-weight-400">
          {{ setEmptyValue(leadData.category_name) }}
        </div>
      </div>

      <div>
        <div class="fontSize14 font-weight-700 mt-3">
          <b>Sub-Category :- </b>
        </div>
        <div class="fontSize14 font-weight-400">
          {{ setEmptyValue(leadData.sub_categorie_name) }}
        </div>
      </div>

      <div v-if="leadData.category == category_enum.CONTRACTOR">
        <div class="fontSize14 font-weight-700 mt-3">
          <b>Type of contract :- </b>
        </div>

        <div class="fontSize14 font-weight-400">
          {{ setEmptyValue(leadData.type_of_contract_name) }}
        </div>
      </div>

      <div>
        <div class="fontSize14 font-weight-700 mt-3">
          <b>Project type :- </b>
        </div>

        <div class="fontSize14 font-weight-400">
          {{ setEmptyValue(leadData.project_type_name) }}
        </div>
      </div>

      <div>
        <div class="fontSize14 font-weight-700 mt-3">
          <b>Approximate area :- </b>
        </div>
        <div class="fontSize14 font-weight-400">
          {{ setEmptyValue(leadData.appx_area_name) }}
        </div>
      </div>

      <div>
        <div class="fontSize14 font-weight-700 mt-3">
          <b>Contractor should have turn Over :- </b>
        </div>
        <div class="fontSize14 font-weight-400">
          {{ setEmptyValue(leadData.contractor_turnover_name) }}
        </div>
      </div>

      <div v-if="this.leadData.category == category_enum.CONTRACTOR">
        <div class="fontSize14 font-weight-700 mt-3">
          <b>Contractor should have done :- </b>
        </div>
        <div class="fontSize14 font-weight-400">
          {{ setEmptyValue(leadData.contractor_should_have_done_name) }}
        </div>
      </div>

      <div>
        <div class="fontSize14 font-weight-700 mt-3">
          <b>Expected value of Work :- </b>
        </div>
        <div class="fontSize14 font-weight-400">
          {{ setEmptyValue(leadData.min_work_value_name) }}
        </div>
      </div>

      <div>
        <div class="fontSize14 font-weight-700 mt-3">
          <b>Requirements :- </b>
        </div>
        <div class="fontSize14 font-weight-400">
          <p class="job-description" v-html="getRequirementText()"></p>
        </div>
      </div>

      <div v-if="leadData.mandatory_location">
        <div class="fontSize14 font-weight-700 mt-3">
          <b>Want the applicant only from above city :- </b>
        </div>
        <div class="fontSize14 font-weight-400">
          {{ leadData.city_state_country }}
        </div>
      </div>

      <!-- <div>
        <div class="fontSize14 font-weight-700 mt-3">
          <b>Contact Details :- </b>
        </div>
        <div class="fontSize14 font-weight-400">
          {{ leadData.contact_name }}
        </div>
        <div class="fontSize14 font-weight-400">{{ leadData.email }}</div>
        <div class="fontSize14 font-weight-400">
          {{ leadData.country_code }}-{{ leadData.phone }}
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import appConstants from "../../appConstants.js";

export default {
  name: "LeadReadOnly",
  components: {},
  props: {
    leadData: {
      type: Object,
      default: {},
    },
  },
  setup(props, context) {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    let category_enum = appConstants.category;

    function getCompnayName() {
      let req = setEmptyValue(props.leadData.requirement);
      return req.replace(/(\n){1,}/g, "<br />");
    }

    function getRequirementText() {
      let req = setEmptyValue(props.leadData.requirement);
      return req.replace(/(\n){1,}/g, "<br />");
    }

    function setEmptyValue(dropDownText) {
      if (dropDownText == "") {
        return "-";
      } else {
        return dropDownText;
      }
    }

    return {
      category_enum,
      getRequirementText,
      setEmptyValue,
    };
  },
};
</script>

<style></style>
