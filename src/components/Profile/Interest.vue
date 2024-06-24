<template>
  <!-- <div class="max-w-[85.3rem] mx-4 md:mx-auto text-white mt-6 mb-6">
    <Nav />
  </div> -->
  <!-- top section -->
  <div class="cls-interest form-container">
    <section>
      <div class="flex flex-row justify-center text-white mb-2 m-2 p-2">
        <div class="justify-center flex items-center mb-2">
          <span class="flex items-center justify-center page-title"
            >Interests</span
          >
        </div>
      </div>
    </section>
    <!-- add certification -->
    <div class="flex items-center justify-center">
      <div class="w-full">
        <div
          class="border-solid bg-[#121415] lg:px-[4rem] md:px-[3rem] sm:px-[2rem] px-[1rem] border border-gray-600 rounded-2xl py-14"
        >
          <div class="flex flex-col justify-center items-center mb-4">
            <h1>The Olous Community Shares many Interests. Tell us Yours.</h1>
          </div>
          <div class="flex flex-col">
            <div class="grid grid-cols-10 gap-2">
              <div class="col-span-8">
                <Dropdown
                  class="text-[1.125rem] text-gray-700 bg-white form-control"
                  v-model="selectedInterest"
                  :options="getter_interest"
                  dataKey="id"
                  optionLabel="display_string"
                  :filter="true"
                  placeholder="Select a Interest"
                  :showClear="true"
                >
                </Dropdown>
              </div>
              <div class="col-span-2">
                <button
                  class="btn lg:w-[7.375rem] w-full hover-experience hover-effect btn-inputeControlHeight top-margin-5px"
                  @click="addInterest"
                  type="submit"
                >
                  Add <span class="lg:contents hidden">+</span>
                </button>
              </div>
              <div v-if="isDuplicate" class="invalid-feedback col-span-8">
                <div class="error-color">Already Selected</div>
              </div>

              <div class="col-span-8" v-if="!isDuplicate">
                <div
                  class="invalid-feedback"
                  v-for="error of v$.selectedInterest.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}
                </div>
              </div>
              <!-- <div class="col-span-8" v-if="isShowAtleastThreeRequired">
                <div class="invalid-feedback">
                  Please select minimum 3 interest
                </div>
              </div> -->
            </div>
            <div class="w-full form-group" v-if="interestList.length > 0">
              <div class="grid lg:grid-cols-2 grid-cols-1 gap-">
                <div
                  class="w-full grid grid-cols-6 gap-2 inline-flex items-center"
                  v-for="(iList, index) in interestList"
                  :key="index"
                >
                  <input
                    class="col-span-5 p-2 w-full lg:h-[40px] bg-white text-[1.125rem] form-control text-gray-700 focus:outline-none rounded-lg"
                    type="interest"
                    :value="getInterestString(iList)"
                    readonly
                  />
                  <button
                    class="flex h-10 hover-effect hover-experience items-center rounded-md w-11"
                    @click="deleteInterest(index)"
                    type="submit"
                  >
                    <img
                      src="../../assets/img/Trash.svg"
                      alt="Delete"
                      class="mx-auto"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- Save and Back Button -->
          <div class="flex items-end justify-end space-x-3 mt-8">
            <div>
              <button
                class="btn btn-controls hover-experience hover-effect mr-4"
                type="submit"
                @click="btnBackClick()"
              >
                Back
              </button>
              <button
                class="btn btn-controls hover-experience hover-effect"
                @click="saveInterest()"
                type="submit"
              >
                Save
              </button>
            </div>
          </div>
        </div>
        <Dialog :showHeader="false" v-model:visible="display" :modal="true">
          <div class="form-bg-w p-6">
            <p>Interest saved successfully</p>
            <div class="flex justify-end space-x-4 mt-4">
              <button @click="closeModal" class="btn w-24">OK</button>
            </div>
          </div>
        </Dialog>

        <Dialog
          :showHeader="false"
          v-model:visible="isShowAtleastThreeRequired"
          :modal="true"
        >
          <div class="form-bg-w p-6">
            <p>Please select minimum 3 interests</p>
            <div class="flex justify-end space-x-4 mt-4">
              <button @click="closeMinimumInterestModal" class="btn w-24">
                OK
              </button>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  </div>

  <!-- display cerification -->
</template>

<script>
//import Calendar from 'primevue/calendar';
//import Nav from "../../components/Layout/Nav.vue";
import useVuelidate from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import AutoComplete from "primevue/autocomplete";
import MultiSelect from "primevue/multiselect";
import Dropdown from "primevue/dropdown";
import { mapGetters, mapActions, mapMutations } from "vuex";
import appConstants from "../../appConstants.js";
import Dialog from "primevue/dialog";

export default {
  name: "Interest",
  components: {
    AutoComplete,
    MultiSelect,
    Dropdown,
    Dialog,
  },
  setup: () => ({ v$: useVuelidate({ $autoDirty: false }) }),
  data() {
    return {
      display: false,
      submitted: false,
      selectedInterest: null,
      filteredInterest: null,
      isDuplicate: false,
      editInerest: false,
      new_interests: "",
      interestList: [],
      isShowAtleastThreeRequired: false,
      cv_elements: appConstants.CV_ELEMENTS,
    };
  },
  computed: {
    ...mapGetters("login", ["getter_user"]),
    ...mapMutations("dropdown", ["commit_interest"]),
    ...mapGetters("UserProfile", ["getter_UserProfile"]),
    ...mapGetters("dropdown", ["getter_interest"]),
  },
  validations() {
    return {
      selectedInterest: {
        required: helpers.withMessage("Please Select Interest", required),
      },
    };
  },
  methods: {
    ...mapActions("UserProfile", ["action_SaveInterestList"]),
    ...mapActions("dropdown", ["action_getInterest"]),
    getInterestString(id) {
      // console.log(this.getter_interest.id)
      for (const interestString of this.getter_interest) {
        if (id == interestString.id) {
          //return this.getter_interest.display_string;
          return interestString.display_string;
        }
      }
      //return `string${id}`
    },

    resetFrom() {
      this.selectedInterest = "";
    },
    addInterest() {
      this.v$.$touch();
      // console.log(this.v$);
      if (this.v$.$invalid) {
        //console.log("in if ");
        return false;
      } else {
        // console.log("in else ");
      }

      this.isDuplicate = false;

      for (const item in this.interestList) {
        //console.log(this.interestList[item])
        if (this.interestList[item] == this.selectedInterest.id) {
          this.isDuplicate = true;
          this.resetFrom();
        }
      }

      if (!this.isDuplicate) {
        this.interestList.push(this.selectedInterest.id);
        this.resetFrom();
        this.v$.$reset();
      }
    },
    closeModal() {
      this.display = false;
    },
    closeMinimumInterestModal() {
      this.isShowAtleastThreeRequired = false;
    },
    deleteInterest(index) {
      this.interestList.splice(index, 1);
    },

    saveInterest() {
      var dataToSave = {
        interests: [],
      };
      // console.log("array interest", this.interestList);

      for (const item of this.interestList) {
        dataToSave.interests.push(item);
      }
      if (dataToSave.interests.length < 3) {
        this.isShowAtleastThreeRequired = true;
      } else {
        this.isShowAtleastThreeRequired = false;
        this.action_SaveInterestList(dataToSave).then((response) => {
          // this.display = true;
          this.backToBuildcv();
          this.$toast.add({
            severity: appConstants.toast_severity.SUCCESS,
            summary: appConstants.toast_summary.SUCCESS,
            detail: response.message,
            life: 3000,
          });
        });
      }
      //console.log("array interest",dataToSave)
    },
    interestListloop() {
      var intList = this.getter_UserProfile.interests.length;

      this.interestList = JSON.parse(
        JSON.stringify(this.getter_UserProfile.interests)
      );
      //console.log(this.interestList);
    },
    backToBuildcv() {
      let userSlug = this.getter_user.slug;
      this.$router.push({
        name: appConstants.routes.VIEWPROFILE,
        params: { user_slug: userSlug, section: this.cv_elements.INTERESTS },
      });
    },
    btnBackClick() {
      // let userSlug = this.getter_user.slug;
      // this.$router.push({ name: appConstants.routes.VIEWPROFILE ,params: { user_slug: userSlug } });
      this.backToBuildcv();
      // this.$router.push({ name: appConstants.routes.PROFILENEW });
    },
  },

  created() {
    this.action_getInterest();
    // .then(() => {
    //   this.new_interests = this.getter_interest;
    //   //console.log(this.new_interests);
    // });

    // const user_id = this.getter_user.id;
    // this.action_getUserProfile(user_id).then(() => {

    this.interestListloop();

    // });
    //const user_id = this.getter_user.id
  },
};
</script>

<style scoped>
.content-div {
  width: 450px;
  height: 120px;
}

.p-calendar {
  /* margin-top: 8px !important; */
  padding-left: 0px;
  border-radius: 10px;
}

input {
  line-height: 1.25;
}

.p-inputtext {
  /* font-family: "sf ui display" !important;
  font-size: 1.125rem; */
  color: #495057;
  background: #ffffff;
  padding: 0.5rem 0.5rem;
  border: 1px solid #ced4da;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s,
    box-shadow 0.2s;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 3px;
}

.p-dropdown-label {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  width: 1%;
  text-overflow: ellipsis;
  cursor: pointer;
}

.p-inputtext {
  border: none !important;
  width: 100%;
  border-radius: 10px !important;
}

.p-inputtext:enabled:focus {
  outline: 0 none;
  outline-offset: 0;
  /* box-shadow: 0 0 0 0.2rem #a6d5fa; */
  /* border-color: #2196F3; */
}

@media only screen and (max-width: 600px) {
  .content-div {
    width: 200px;
    height: 120px;
  }
}

.p-component,
.p-component * {
  box-sizing: border-box;
  display: flex;
}

.p-dropdown {
  background: #ffffff;
  border-radius: 8px;
}
</style>
