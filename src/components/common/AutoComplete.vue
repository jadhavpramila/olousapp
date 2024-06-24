<template>
  <div>
    <div class="relative">
      <input
        type="text"
        id="search"
        v-model="searchTerm"
        placeholder="Type here..."
        class="
          focus:outline-none
          p-2.5
          w-full
          rounded-3xl
          focus:outline-none
          rounded-3xl
          border-[#707070] border
        "
      />
      <button
        class="
          search-conversation
          absolute
          right-0
          cursor-pointer
          md:mt-[-3px]
          mt-[5px]
          w-[43px]
          h-[43px]
          rounded-full
        "
        @click="clickSearchButton()"
      >
        <img :src="getStaticImage('Search_Messages.svg')" />
      </button>
      <ul
        v-if="searchCountries.length"
        class="
          mt-0
          w-full
          rounded
          bg-white
          border border-gray-300
          px-4
          py-2
          space-y-1
          absolute
          z-10
        "
        id="dropDown"
      >
        <li
          v-for="country in searchCountries"
          :key="country.name"
          class="cursor-pointer hover:bg-gray-100 p-1"
        >
          <span @click="selectCountry(country.name)">
            {{ country.name }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
  
  <script>
import countries from "./countries.json";
import { ref, computed } from "vue";
export default {
  name: "AutoComplete",
  setup() {
    let searchTerm = ref("");
    let searchCountries = ref([]);
    let selectedCountry = ref("");

    // const searchCountries = computed(() => {
    //   if (searchTerm.value === "") {
    //     return [];
    //   }
    //   let matches = 0;
    //   return countries.filter((country) => {
    //     if (
    //       country.name.toLowerCase().includes(searchTerm.value.toLowerCase()) &&
    //       matches < 10
    //     ) {
    //       matches++;
    //       return country;
    //     }
    //   });
    // });

    function clickSearchButton() {
      //   console.log("in clickSearchButton");
      if (searchTerm.value === "") {
        return [];
      }
      let matches = 0;
      searchCountries.value = countries.filter((country) => {
        // console.log("filter =>", country);
        if (
          country.name.toLowerCase().includes(searchTerm.value.toLowerCase()) &&
          matches < 10
        ) {
          //   console.log("in if");
          matches++;
          return country;
        }
      });
      //   console.log("searchCountries =>", searchCountries.value);
    }

    function selectCountry(country) {
      console.log("in selectCountry", country);
      selectedCountry.value = country;
      searchTerm.value = selectedCountry.value;
    }

    return {
      countries,
      searchTerm,
      searchCountries,
      selectCountry,
      clickSearchButton,
    };
  },
};
</script>
<style scoped>
</style>