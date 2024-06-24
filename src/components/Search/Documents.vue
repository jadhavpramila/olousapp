<template lang="">
  <div class="flex flex-col space-y-6">
    <DocumentFilters />
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <!-- single grid card -->
      <!-- {{detail._source.title}} {{detail._source.region}} v-for="detail  in details.hits.hits" -->
      <!-- <div class="w-full md:w-[13.94rem] bg-[#CFD8E6] rounded-md p-3 text-[#333333]"> -->
      <!-- <div class="flex pb-10">
                        <div class="flex flex-col space-y-8 text-sm">
                            <div class="flex items-center space-x-2">
                                <p>{{detail._source.region}}</p>
                                <span class="text-[#AAAAAA]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-map-pin"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                </span> 
                            </div>
                                <h1 class="">{{detail._source.title}}</h1>
                            </div>
                        </div>
                 </div> -->
      <!-- new design  -->
      <div
        v-for="detail in details[0].hits.hits"
        class="card-animation w-full md:w-[15rem] bg-[#333333] rounded-lg text-[#CFD8E6]"
      >
        <div class="flex flex-col">
          <div
            class="h-[13rem] rounded-lg bg-[#CFD8E6] flex items-center justify-center"
          >
            <span><img src="/src/assets/pdf.svg" alt="" /></span>
          </div>
          <div class="flex flex-col text-sm justify-between p-2 h-[7rem]">
            <h1 class="">{{ detail._source.title }}</h1>
            <!-- <h1 class="">{{detail._source.title}}</h1> -->
            <div class="flex justify-between text-gray-500">
              <p>
                {{ detail._source.author.first_name }}
                {{ detail._source.author.last_name }}
              </p>
              <div class="flex space-x-1 items-center">
                <span>{{ detail._source.region }}</span>
                <span
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-map-pin"
                  >
                    <path
                      d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                    ></path>
                    <circle cx="12" cy="10" r="3"></circle></svg
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DocumentFilters from "./DocumentFilters.vue";

export default {
  props: {
    details: Object,
  },
  components: {
    DocumentFilters,
  },
  setup() {
    return {};
  },
};
</script>

<style scoped></style>
