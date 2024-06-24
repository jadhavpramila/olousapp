<template>
  <div class="w-full">
    <AutoComplete
      v-model="address"
      :suggestions="filteredLocation"
      @complete="selectedPlace($event)"
      @item-select="locationSelectedByUser"
      @item-unselect="locationUnSelectedByUser"
      @clear="locationUnSelectedByUser"
      :dropdown="true"
      field="_source.name"
      forceSelection
      placeholder="Type city name"
      class="w-full bg-white text-gray-700 focus:outline-none form-control"
    >
      <template #item="slotProps">
        <div class="country-item">
          <div class="p-ml-2">
            {{ slotProps.item._source.name }},
            {{ slotProps.item._source.state.name }},
            {{ slotProps.item._source.country.name }}
          </div>
        </div>
      </template>
    </AutoComplete>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AutoComplete from "primevue/autocomplete";

export default {
  name: "CityWithCountry",
  props: {
    city: {
      type: String,
      default: "",
    },
    countryIso: {
      type: String,
      default: "",
    },
  },
  components: {
    AutoComplete,
  },
  computed: {
    ...mapGetters("dropdown", ["getter_searchLocation"]),
  },
  mounted() {
    if (this.city) {
      this.address = this.city;
      this.emitter.emit("selected_city", this.address);
    }
  },
  data() {
    return {
      filteredLocation: null,
      address: "",
    };
  },
  methods: {
    ...mapActions("dropdown", ["action_searchLocation"]),
    async selectedPlace(event) {
      let data = {
        query: event.query,
        countryIso2: this.countryIso,
      };
      this.action_searchLocation(data).then(() => {
        this.filteredLocation = this.getter_searchLocation;
      });
    },
    locationSelectedByUser(selectedLocation) {
      let addressObj =
        selectedLocation.value._source.name +
        ", " +
        selectedLocation.value._source.state.name +
        ", " +
        selectedLocation.value._source.country.name;

      this.address = addressObj;
      this.emitLocationChanged(addressObj, selectedLocation.value._source);
    },
    locationUnSelectedByUser(value) {
      store.commit("dropdown/commit_searchLocation", []);
      this.address = "";
      this.emitLocationChanged(this.address, null);
    },

    emitLocationChanged(address, location_obj) {
      let data = {
        address: address,
        location_obj: location_obj,
      };
      this.$emit("selected_city", data);
    },
  },
};
</script>

<style></style>
