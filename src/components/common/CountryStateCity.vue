<template>
  <div class="grid grid-cols-2 gap-4">
    <div class="flex flex-col">
      <label class="form-label-bg-w"> Country</label>
      <AutoComplete
        v-model="selectedCountry"
        :suggestions="getter_countries"
        @complete="fetchFilteredCountries($event)"
        @item-select="countrySelectedByUser"
        @item-unselect="countryUnSelectedByUser"
        @clear="countryUnSelectedByUser"
        :dropdown="true"
        field="_source.name"
        forceSelection
        placeholder=""
        class="form-control text-gray-900 w-full"
      >
      </AutoComplete>
      <div
        class="invalid-feedback"
        v-for="error of v$.country.$errors"
        :key="error.$uid"
      >
        <span>{{ error.$message }}</span>
      </div>
    </div>
    <!-- <div class="flex flex-col">
      <label class="form-label-bg-w"> State</label>
      <AutoComplete
        v-model="selectedState"
        :suggestions="getter_states"
        @complete="fetchFilteredStates($event)"
        @item-select="stateSelectedByUser"
        @item-unselect="stateUnSelectedByUser"
        @clear="stateUnSelectedByUser"
        :dropdown="true"
        field="_source.state"
        forceSelection
        placeholder=""
        class="p-2 form-control text-gray-900 w-full"
        :disabled="location.country ? false : true"
      >
      </AutoComplete>
      <div
        class="invalid-feedback"
        v-for="error of v$.state.$errors"
        :key="error.$uid"
      >
        <span>{{ error.$message }}</span>
      </div>
    </div> -->
    <div class="flex flex-col">
      <label class="form-label-bg-w"> City</label>
      <AutoComplete
        v-model="selectedCity"
        :suggestions="getter_cities"
        @complete="fetchFilteredCities($event)"
        @item-select="citySelectedByUser"
        @item-unselect="cityUnSelectedByUser"
        @clear="cityUnSelectedByUser"
        :dropdown="true"
        field="_source.city"
        forceSelection
        placeholder=""
        class="form-control text-gray-900 w-full"
        :disabled="location.country ? false : true"
      >
        <template #item="slotProps">
          <div class="country-item">
            <div class="p-ml-2">
              {{ slotProps.item._source.city }},
              {{ slotProps.item._source.state }}
            </div>
          </div>
        </template>
      </AutoComplete>
      <div
        class="invalid-feedback"
        v-for="error of v$.city.$errors"
        :key="error.$uid"
      >
        <span>{{ error.$message }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { useStore } from "vuex";
import useVuelidate from "@vuelidate/core";
import { useRouter, useRoute } from "vue-router";
import { ref, reactive, computed, watchEffect, onMounted } from "vue";
import { helpers, required } from "@vuelidate/validators";
import AutoComplete from "primevue/autocomplete";
import { getCurrentInstance } from "vue";

export default {
  name: "CountryStateCity",
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    locationData: {
      type: Object,
      default: {},
    },
  },

  emits: ["country_city_updated"], //country_city_updated
  components: {
    AutoComplete,
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const app = getCurrentInstance();
    const $emitter = app.appContext.config.globalProperties.emitter;
    const location = reactive({
      country: "",
      state: "",
      city: "",
      address: "",
      country_iso: "",
      state_iso: "",
      country_code: "",
    });
    let selectedCountry = ref("");
    let selectedState = ref("");
    let selectedCity = ref("");
    let getter_countries = computed(
      () => store.getters["dropdown/getter_countries"]
    );
    let getter_cities = computed(() => store.getters["dropdown/getter_cities"]);
    let getter_states = computed(() => store.getters["dropdown/getter_states"]);
    const rules = {
      country: {
        required: helpers.withMessage("Country is required", required),
      },
      state: {
        required: helpers.withMessage("State is required", required),
      },
      city: {
        required: helpers.withMessage("City is required", required),
      },
    };
    const v$ = useVuelidate(rules, location);

    onMounted(() => {
     // console.log("is edit=>", props.locationData);
      if (props.isEdit) {
        selectedCountry.value = props.locationData.country;
        //selectedState.value = props.locationData.state;
        if (props.locationData.state != "") {
          selectedCity.value =
            props.locationData.city + ", " + props.locationData.state;
        } else {
          selectedCity.value = props.locationData.city;
        }

        location.country = props.locationData.country;
        location.state = props.locationData.state;
        location.city = props.locationData.city;
        location.address = props.locationData.address;
        location.country_iso = props.locationData.country_iso;
        location.state_iso = props.locationData.state_iso;
        location.country_code = props.locationData.country_code;
      }
    });

    function fetchFilteredCountries(event) {
      store.dispatch("dropdown/action_fetchFilteredCountries", event.query);
    }
    function countrySelectedByUser(country) {
      location.country = country.value._source.name;
      location.country_iso = country.value._source.iso2;
      location.country_code = country.value._source.phone_code;
      location.state = "";
      location.city = "";
      location.state_iso = "";
      location.address = "";
      selectedCity.value = "";
      $emitter.emit("country_city_updated", location);
    }
    function countryUnSelectedByUser(val) {
      location.country = "";
      location.state = "";
      location.city = "";
      location.country_iso = "";
      location.country_code = "";
      location.address = "";
      selectedCity.value = "";
      $emitter.emit("country_city_updated", location);
    }
    function fetchFilteredStates(event) {
      let obj = {
        state: event.query,
        countryiso: location.country_iso,
      };
      store.dispatch("dropdown/action_getStates", obj);
    }
    function stateSelectedByUser(state) {
      location.state = state.value._source.state;
      location.state_iso = state.value._source.state_iso;
    }
    function stateUnSelectedByUser(val) {
      location.state = "";
      location.city = "";
    }
    function fetchFilteredCities(event) {
      let obj = {
        city: event.query,
        // stateiso: selectedState.value._source.state_iso,
        countryiso: location.country_iso,
      };
      store.dispatch("dropdown/action_getCities", obj);
    }
    function citySelectedByUser(city) {
      selectedCity.value =
        city.value._source.city + ", " + city.value._source.state;
      location.state = city.value._source.state;
      location.city = city.value._source.city;
      location.state_iso = city.value._source.state_iso;
      location.address =
        location.city + "," + location.state + "," + location.country;
      $emitter.emit("country_city_updated", location);
    }
    function cityUnSelectedByUser(val) {
      location.city = "";
      location.state = "";
      location.state_iso = "";
      selectedCity.value = "";
      location.address = "";
      $emitter.emit("country_city_updated", location);
    }
    return {
      fetchFilteredCountries,
      fetchFilteredStates,
      fetchFilteredCities,
      countrySelectedByUser,
      stateSelectedByUser,
      citySelectedByUser,
      countryUnSelectedByUser,
      stateUnSelectedByUser,
      cityUnSelectedByUser,
      location,
      v$,
      getter_countries,
      getter_states,
      getter_cities,
      selectedCountry,
      selectedState,
      selectedCity,
    };
  },
};
</script>
