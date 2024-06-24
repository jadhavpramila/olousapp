<template>
  <div class="form-container">
    <div>
      <div v-if="show_lead" style="" class="ml-auto mr-auto rounded-lg">
        <div class="app-bg-color-gradient p-5 rounded-[0.625rem]">
          <div class="text-[1.125rem] font-weight-600">
            {{ lead_data.title }}
          </div>
          <div class="text-[0.875rem] mt-[0.438rem] font-weight-600">
            {{ lead_data.company_name }}
          </div>
          <div class="text-[0.875rem] mt-[1.313rem]">
            {{ lead_data.city_state_country }}
          </div>
        </div>
        <div class="mr-3">
          <div class="grid grid-cols-1 sm:grid-cols-2">
            <div
              class="mt-[0.938rem] app-comp-box-shadow rounded-lg mt-[0.625rem] ml-5"
            >
              <div class="p-[0.625rem] pl-5">
                <div class="text-base font-bold app-text-color-primary">
                  Category
                </div>
                <div class="">
                  <span class="text-base app-text-color-secondary">&bull;</span>
                  <span class="text-sm ml-3">{{
                    setEmptyValue(lead_data.category_name)
                  }}</span>
                </div>
              </div>
            </div>
            <div
              class="mt-[0.938rem] app-comp-box-shadow rounded-lg mt-[0.625rem] ml-4"
            >
              <div class="p-[0.625rem] pl-5">
                <div class="text-base font-bold app-text-color-primary">
                  Subcategory
                </div>
                <div class="">
                  <span class="text-base app-text-color-secondary">&bull;</span>
                  <span class="text-sm ml-3">{{
                    setEmptyValue(lead_data.sub_categorie_name)
                  }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2">
            <div
              class="mt-[0.938rem] app-comp-box-shadow rounded-lg mt-[0.625rem] ml-5"
            >
              <div class="p-[0.625rem] pl-5">
                <div class="text-base font-bold app-text-color-primary">
                  Project Type
                </div>
                <div class="">
                  <span class="text-base app-text-color-secondary">&bull;</span>
                  <span class="text-sm ml-3">{{
                    setEmptyValue(lead_data.project_type_name)
                  }}</span>
                </div>
              </div>
            </div>
            <div
              class="mt-[0.938rem] app-comp-box-shadow rounded-lg mt-[0.625rem] ml-4"
            >
              <div class="p-[0.625rem] pl-5">
                <div class="text-base font-bold app-text-color-primary">
                  Approximate area
                </div>
                <div class="">
                  <span class="text-base app-text-color-secondary">&bull;</span>
                  <span class="text-sm ml-3">{{
                    setEmptyValue(lead_data.appx_area_name)
                  }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2">
            <div
              class="mt-[0.938rem] app-comp-box-shadow rounded-lg mt-[0.625rem] ml-5"
            >
              <div class="p-[0.625rem] pl-5">
                <div class="text-base font-bold app-text-color-primary">
                  Contractor should have done
                </div>
                <div class="">
                  <span class="text-base app-text-color-secondary">&bull;</span>
                  <span class="text-sm ml-3">{{
                    setEmptyValue(lead_data.contractor_should_have_done_name)
                  }}</span>
                </div>
              </div>
            </div>
            <div
              class="mt-[0.938rem] app-comp-box-shadow rounded-lg mt-[0.625rem] ml-4"
            >
              <div class="p-[0.625rem] pl-5">
                <div class="text-base font-bold app-text-color-primary">
                  Contractor should have turn Over
                </div>
                <div class="">
                  <span class="text-base app-text-color-secondary">&bull;</span>
                  <span class="text-sm ml-3">{{
                    setEmptyValue(lead_data.contractor_turnover_name)
                  }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2">
            <div
              class="mt-[0.938rem] app-comp-box-shadow rounded-lg mt-[0.625rem] ml-5"
            >
              <div class="p-[0.625rem] pl-5">
                <div class="text-base font-bold app-text-color-primary">
                  Expected value of Work
                </div>
                <div class="">
                  <span class="text-base app-text-color-secondary">&bull;</span>
                  <span class="text-sm ml-3">{{
                    setEmptyValue(lead_data.min_work_value_name)
                  }}</span>
                </div>
              </div>
            </div>
            <div
              v-if="lead_data.category == category_enum.CONTRACTOR"
              class="mt-[0.938rem] app-comp-box-shadow rounded-lg mt-[0.625rem] ml-4"
            >
              <div class="p-[0.625rem] pl-5">
                <div class="text-base font-bold app-text-color-primary">
                  Type of contract
                </div>
                <div class="">
                  <span class="text-base app-text-color-secondary">&bull;</span>
                  <span class="text-sm ml-3">{{
                    setEmptyValue(lead_data.type_of_contract_name)
                  }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1" v-if="lead_data.requirement.length > 0">
            <div
              class="mt-[0.938rem] app-comp-box-shadow rounded-lg mt-[0.625rem] ml-5"
            >
              <div class="p-[0.625rem] pl-5">
                <div class="text-base font-bold app-text-color-primary">
                  Requirement
                </div>
                <div class="">
                  <span class="text-base app-text-color-secondary">&bull;</span>
                  <span class="text-sm ml-3">
                    <p
                      class=""
                      v-html="getRequirementText(lead_data.requirement)"
                    ></p
                  ></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="record_not_found">
        <NotFound></NotFound>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import appConstants from "../../appConstants.js";
import LeadReadOnly from "./LeadReadOnly.vue";
import NotFound from "../Layout/NotFound.vue";

export default {
  name: "Lead.vue",
  components: { LeadReadOnly, NotFound },

  setup(props, context) {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const lead_id = ref(null);
    const lead_data = ref(null);
    const show_module_details = ref(false);
    let show_lead = ref(false);
    let record_not_found = ref(false);

    let category_enum = appConstants.category;

    lead_id.value = route.params.lead_id;
    // let decryptedId = btoa(route.params.lead_id);

    store
      .dispatch("lead/action_getLeadsByEncryptedId", lead_id.value)
      .then((response) => {
        // alert("inside response")
        show_lead.value = true;
        lead_data.value = response;
        show_module_details.value = true;
      })
      .catch((err) => {
        console.log(err);
        show_lead.value = false;
        record_not_found.value = true;
      });

    function setEmptyValue(dropDownText) {
      if (dropDownText == "") {
        return "-";
      } else {
        return dropDownText;
      }
    }

    function getRequirementText(requirements_text) {
      let req = setEmptyValue(requirements_text);
      return req.replace(/(\n){1,}/g, "<br />");
    }

    return {
      lead_data,
      show_module_details,
      show_lead,
      record_not_found,
      setEmptyValue,
      category_enum,
      getRequirementText,
    };
  },
};
</script>

<style></style>
