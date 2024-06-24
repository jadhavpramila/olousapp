<template>
  <div>
    <Dialog
      class="capitalize"
      :show-header="false"
      v-model:visible="display"
      :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
      :modal="true"
    >
      <div class="p-6 form-bg-w">
        <span class="text-base app-text-color-secondary"
          >Please select country name</span
        >
        <p class="m-0">
          <AutoComplete
            v-model="country_code"
            :suggestions="getter_countries"
            @complete="fetchFilteredCounties($event)"
            @item-select="countrySelectedByUser"
            @item-unselect="countryUnSelectedByUser"
            @clear="countryUnSelectedByUser"
            :dropdown="true"
            field="_source.name"
            forceSelection
            placeholder=""
            class="p-2 form-control text-gray-900 w-full bg-white focus:outline-none rounded-lg text-[1.125rem]"
          >
          </AutoComplete>
        </p>
        <div class="flex justify-end mt-4 space-x-3">
          <button @click="saveData" class="border-grey-600 btn w-24">Ok</button>
          <button @click="closeModal" class="btn w-24">Close</button>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import Dialog from "primevue/dialog";
import AutoComplete from "primevue/autocomplete";

export default {
  name: "selectCountryPhoneCode",
  components: {
    Dialog,
    AutoComplete,
  },
  computed: {
    ...mapGetters("dropdown", ["getter_countries"]),
  },
  data() {
    return {
      display: true,
      country_code: "",
      emit_value: "",
    };
  },
  methods: {
    ...mapActions("dropdown", [
      "action_searchLocation",
      "action_fetchFilteredCountries",
    ]),

    async selectedPlace(event) {
      let data = {
        query: event.query,
        countryIso2: "",
      };
      this.action_searchLocation(data).then(() => {
        this.filteredLocation = this.getter_searchLocation;
      });
    },
    async fetchFilteredCounties(event) {
      this.action_fetchFilteredCountries(event.query);
    },
    countrySelectedByUser(selectedCountry) {
      this.emit_value = selectedCountry.value._source.phone_code;
      this.country_code = selectedCountry.value._source.name;
    },
    countryUnSelectedByUser(val) {
      this.country_code = "";
    },
    closeModal() {
      this.$emit("close_button_click");
      this.display = false;
    },
    saveData() {
      if (this.emit_value) {
        this.$emit("selected_country_click", this.emit_value);
        this.display = false;
      } else {
        this.closeModal();
      }
    },
  },
};
</script>

<style></style>
