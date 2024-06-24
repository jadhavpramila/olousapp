<template>
  <div>
    <div
      class="card flex justify-content-center"
      v-if="title == profession_str"
    >
      <label class="form-label"
        >Profession (In which profession did you work?)</label
      >
      <MultiSelect
        v-model="form_data.professionList"
        :options="professionList"
        optionLabel="display_string"
        placeholder="Select Profession"
        display="chip"
        filter
        :selectionLimit="2"
        class="w-10/12 md:w-30rem"
        @change="addData($event)"
      />
      <!-- <div
    class="invalid-feedback"
    v-if="v$.$dirty"
    v-for="error of v$.form_data.selectedProfession.$errors"
    :key="error.$uid"
  >
    <span>{{ error.$message }}</span>
  </div> -->
    </div>

    <div
      class="card flex justify-content-center mt-2"
      v-if="title == sector_str"
    >
      <label class="form-label">Sector (In which sector did you work?)</label>
      <MultiSelect
        v-model="form_data.sectorList"
        :options="sectorList"
        optionLabel="display_string"
        placeholder="Select sector"
        :maxSelectedLabels="3"
        display="chip"
        class="w-10/12 md:w-10rem"
        @change="addData($event)"
      />
    </div>
    <button
      v-if="title == sector_str"
      class="btn btn-controls hover-experience hover-effect mt-2"
      @click="saveData"
      type="submit"
    >
      Save
    </button>
  </div>
  <!-- <div class="card flex justify-content-center mt-2" v-if="title == sector_str">
    <MultiSelect
      class="w-full md:w-10rem"
      @change="addData($event)"
      v-model="form_data.selectedInterest"
      :options="getter_interest"
      dataKey="id"
      optionLabel="display_string"
      :filter="true"
      placeholder="Select a Interest"
      :showClear="true"
    />
  </div> -->
</template>

<script>
import MultiSelect from "primevue/multiselect";
import AutoComplete from "primevue/autocomplete";
import Dropdown from "primevue/dropdown";
import Dialog from "primevue/dialog";
import { mapGetters, mapActions, mapMutations } from "vuex";
import {
  helpers,
  required,
  maxLength,
  minLength,
  requiredIf,
} from "@vuelidate/validators";

export default {
  components: {
    MultiSelect,
    AutoComplete,
    Dropdown,
  },
  props: {
    title: String,
  },
  data() {
    return {
      profession_str: "profession",
      sector_str: "sector",
      software_str: "software",
      professionList: null,
      sectorList: null,
      softwareList: null,
      filteredSoftwares: null,
      star: "",
      software: "",
      form_data: {
        selectedProfession: [],
        selectedSector: [],
        selectedsoftware: [],
      },
      selectedProfessionDataArray: [],
      selectedSectorDataArray: [],
      options: [
        {
          profession: this.professionList,
        },
        {
          sector: this.sectorList,
        },
      ],
    };
  },
  validations() {
    return {
      form_data: {
        selectedProfession: {
          required: helpers.withMessage("Professions are required", required),
        },
        selectedProfession: {
          required: helpers.withMessage("Sectors are required", required),
        },
      },
    };
  },
  created() {
    this.getDropdownData();
  },
  computed: {
    ...mapGetters("dropdown", [
      "getter_sector",
      "getter_profession",
      "getter_software",
      "getter_interest",
    ]),
  },
  methods: {
    ...mapActions("dropdown", [
      "action_getSectorDetails",
      "action_getProfessionDetails",
      "action_getSoftwareDetails",
    ]),

    getDropdownData() {
      this.action_getSectorDetails().then(() => {
        this.sectorList = this.getter_sector;
        // console.log("   this.sectorList", this.sectorList);
      });
      this.action_getProfessionDetails().then(() => {
        this.professionList = this.getter_profession;
      });
    },
    addData() {
      this.selectedProfessionDataArray.push(this.form_data.selectedProfession);
      this.selectedSectorDataArray.push(this.form_data.selectedSector);
      // console.log(
      //   "this.selectedDataArray",
      //   this.selectedProfessionDataArray,
      //   this.selectedSectorDataArray
      // );
    },
    saveData() {
      this.selectedProfessionDataArray;
      this.selectedSectorDataArray;
      console.log(
        "this.selectedProfessionDataArray",
        this.selectedProfessionDataArray,
        this.selectedSectorDataArray
      );
    },
  },
};
</script>
