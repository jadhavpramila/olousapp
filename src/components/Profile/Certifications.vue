<template>
  <!-- <div class="max-w-[85.3rem] mx-4 md:mx-auto text-white mt-6 mb-6">
    <Nav />
  </div> -->
  <!-- top section -->
  <div class="p-6 form-bg-w">
    <section>
      <div class="flex flex-row mb-2">
        <!-- <div class="">
        <button class="btn ml-2" @click="clickbtn">></button>
      </div> -->
        <div
          class="flex items-center justify-center page-title app-text-color-primary"
        >
          Certifications
        </div>
      </div>
    </section>
    <!-- add certification -->
    <div
      class="flex items-center justify-center"
      v-if="editCertification == true"
    >
      <div class="w-full">
        <div class="cls-profileNew-bg-w">
          <div class="flex flex-col">
            <div class="flex flex-col form-group">
              <label for="Certification" class="form-label-bg-w">
                Certification Name
              </label>
              <input
                v-model="certification_form_data.certification.accredition"
                placeholder="Certification Name"
                type="text"
                class="text-gray-900 w-full bg-white form-control focus:outline-none rounded-lg"
              />
              <div
                class="invalid-feedback"
                v-for="error of v$.certification_form_data.certification
                  .accredition.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </div>
            </div>
            <div class="grid lg:grid-cols-2 grid-cols-1 gap-4 form-group">
              <div>
                <label for="Year" class="form-label-bg-w">Month</label>
                <!-- <Dropdown
                  v-model="certification_form_data.certification.month"
                  :options="monthlist"
                  optionLabel="name"
                  optionValue="id"
                  placeholder="Month"
                  class="w-full bg-white primevue-dropdown text-gray-700 focus:outline-none rounded-lg mb-2.5 form-control"
                /> -->
                <select
                  v-model="certification_form_data.certification.month"
                  class="form-control text-gray-900 w-full bg-white focus:outline-none rounded-lg"
                >
                  <option class="" value="" selected disabled>Month</option>
                  <option
                    class=""
                    v-for="month in monthlist"
                    :value="month.id"
                    :key="month.id"
                  >
                    {{ month.name }}
                  </option>
                </select>
                <div
                  class="invalid-feedback"
                  v-for="error of v$.certification_form_data.certification.month
                    .$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}
                </div>
              </div>
              <div>
                <label for="Year" class="form-label-bg-w">Year</label>
                <!-- <pre>{{ years }}</pre> -->
                <!-- <Dropdown
                  v-model="certification_form_data.certification.year"
                  :options="yearsArr"
                  optionLabel="name"
                  optionValue="id"
                  placeholder="Years"
                  class="w-full bg-white primevue-dropdown text-gray-700 focus:outline-none rounded-lg mb-2.5 form-control"
                /> -->
                <select
                  v-model="certification_form_data.certification.year"
                  class="form-control text-gray-900 w-full bg-white focus:outline-none rounded-lg"
                >
                  <option class="" value="" selected disabled>Year</option>
                  <option
                    class=""
                    v-for="year in years"
                    :value="year"
                    :key="year"
                  >
                    {{ year }}
                  </option>
                </select>
                <div
                  class="invalid-feedback"
                  v-for="error of v$.certification_form_data.certification.year
                    .$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}
                </div>
              </div>
            </div>
            <div class="flex items-end justify-end space-x-3 mt-8">
              <div>
                <button
                  v-if="editCertification == true"
                  class="btn btn-controls"
                  @click="onBacklick()"
                  type="submit"
                >
                  Cancel
                </button>
              </div>
              <div>
                <button
                  v-if="editCertification == true && isUpdate == false"
                  class="btn btn-controls"
                  @click="saveCertification"
                  type="submit"
                >
                  Save
                </button>
                <button
                  v-if="editCertification == true && isUpdate == true"
                  class="btn btn-controls"
                  @click="saveCertification"
                  type="submit"
                >
                  Update
                </button>
                <button
                  v-if="editCertification == true && isUpdate == true"
                  class="btn btn-controls ml-4"
                  @click="deleteRecord"
                  type="submit"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- display cerification -->
    <div
      class="flex items-center justify-center"
      v-if="editCertification == false"
    >
      <div class="w-full">
        <div
          class="border-solid bg-[#121415] lg:px-[4rem] md:px-[3rem] sm:px-[2rem] px-[1rem] rounded-2xl py-[1.875rem]"
          v-if="certificationDetails.length"
        >
          <div class="flex items-end justify-end space-x-3">
            <div class="text-sm text-grey-dark">
              <button
                v-if="editCertification == false"
                class="btn btn-controls"
                @click="onBacklick()"
                type="submit"
              >
                Back
              </button>
            </div>
            <div class="text-sm text-grey-dark">
              <button
                v-if="editCertification == false"
                class="btn btn-controls"
                @click="addCertification"
                type="submit"
              >
                Add
              </button>
            </div>
          </div>
          <div
            class="bg-[#ffffff] rounded-lg px-[1rem] py-[0.5rem] mt-8"
            v-for="(detail, index) in certificationDetails"
            :key="index"
          >
            <div class="grid grid-cols-2">
              <div class="grid content-center">
                <div
                  class="lg:text-[1.375rem] text-lg text-gray-900 whitespace-pre-wrap"
                  v-if="detail.accredition"
                >
                  {{ detail.accredition }}
                </div>
                <br />
                <div
                  class="lg:text-[1.125rem] text-lg text-gray-500"
                  v-if="detail.month"
                >
                  {{ getFullmonth(detail.month) }} {{ detail.year }}
                </div>
              </div>
              <div class="grid justify-end">
                <button
                  class="rounded-md hover-experience hover-effect h-11 w-11"
                >
                  <img
                    @click.prevent="editDetails(index)"
                    src="../../assets/img/Edit_new.svg"
                    alt="Edit"
                    class="mx-auto"
                  />
                </button>
                <button
                  class="rounded-md hover-experience hover-effect h-11 w-11 mt-1"
                >
                  <img
                    @click="deleteCertificate()"
                    src="../../assets/img/Trash.svg"
                    alt="Delete"
                    class="mx-auto"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Dialog :showHeader="false" v-model:visible="showDeleteConfirmationMessage">
    <div class="p-6 form-bg-w">
      <div>
        <span>Are you sure you want to delete this certificate?</span>
      </div>
      <div class="flex justify-end mt-10 space-x-4">
        <button class="btn w-24 px-4" @click="closeConfirmationMessage()">
          No
        </button>
        <button class="btn w-24 px-4" @click="deleteCertificate()">Yes</button>
      </div>
    </div>
  </Dialog>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import appConstants from "../../appConstants.js";
import { helpers, required } from "@vuelidate/validators";
//import Calendar from 'primevue/calendar';
//import Nav from "../../components/Layout/Nav.vue";
import { saveCertification } from "../../api/BuildCV/certification.js";
import { mapGetters, mapActions, mapMutations } from "vuex";
import Dialog from "primevue/dialog";
import Dropdown from "primevue/dropdown";

export default {
  name: "Certifications",
  props: ["data"],
  emits: ["close"],
  components: {
    //Nav,
    //Calendar
    Dropdown,
    Dialog,
  },

  // beforeMount() {
  //   if (!this.certificationDetails.length) {
  //     this.editCertification = true;
  //   } else {
  //     this.editCertification = false;
  //   }
  // },
  setup: () => ({ v$: useVuelidate({ $autoDirty: false }) }),
  //certification_form_data.certification.certification_name
  data() {
    return {
      submitted: false,
      isUpdate: false,
      editCertification: true,
      certificationDetails: [],
      certification_form_data: {
        certification: {
          edit_index: -1,
          accredition: "",
          month: "",
          year: "",
        },
      },
      monthlist: [
        { name: "January", id: "January" },
        { name: "February", id: "February" },
        { name: "March", id: "March" },
        { name: "April", id: "April" },
        { name: "May", id: "May" },
        { name: "June", id: "June" },
        { name: "July", id: "July" },
        { name: "August", id: "August" },
        { name: "September", id: "September" },
        { name: "October", id: "October" },
        { name: "November", id: "November" },
        { name: "December", id: "December" },
      ],
      yearsArr: [],
      cv_elements: appConstants.CV_ELEMENTS,
      showDeleteConfirmationMessage: false,
    };
  },
  validations() {
    return {
      certification_form_data: {
        certification: {
          accredition: {
            required: helpers.withMessage(
              "Please Enter Certification Name",
              required
            ),
          },
          month: {
            required: helpers.withMessage("Please Enter Month", required),
          },
          year: {
            required: helpers.withMessage("Please Enter Year", required),
          },
        },
      },
    };
  },
  computed: {
    years() {
      const year = new Date().getFullYear();
      return Array.from(
        { length: year - 1941 },
        (value, index) => 1942 + index
      );
    },

    ...mapMutations("certificationDetails", ["commit_certificationList"]),
    ...mapGetters("UserProfile", ["getter_UserProfile"]),
    ...mapGetters("login", ["getter_user"]),
  },
  methods: {
    ...mapActions("UserProfile", ["action_savecertificationList"]),

    getFullmonth(monthId) {
      for (let month of this.monthlist) {
        if (month.id == monthId) {
          return month.name;
        }
      }
    },
    // yearsArray() {
    //   let year = new Date().getFullYear();
    //   //const row = [];
    //   if (year != null) {
    //     for (let i = 1941; i <= year; i++) {
    //       let obj = {
    //         name: i.toString(),
    //         id: i.toString(),
    //       };
    //       this.yearsArr.push(obj);
    //     }
    //   }
    //   //return row;
    //   //console.log("the row array", row);
    // },

    addCertification() {
      // // console.log("Data in addCertification", this.v$.$invalid);
      // this.certification_form_data.certification.edit_index = -1;
      // if (this.editCertification == false) {
      //   this.editCertification = true;
      // } else {
      //   this.editCertification = false;
      // }
      this.resetForm();
      this.edtMode = true;
    },

    saveCertification() {
      this.isUpdate = false;
      this.v$.$touch();
      if (this.v$.$invalid) {
        return false;
      } else {
        let editIndex = this.certification_form_data.certification.edit_index;
        //console.log("INDEX", editIndex);
        if (editIndex >= 0) {
          this.certificationDetails[editIndex].accredition =
            this.certification_form_data.certification.accredition;
          this.certificationDetails[editIndex].month =
            this.certification_form_data.certification.month;
          this.certificationDetails[editIndex].year =
            this.certification_form_data.certification.year.toString();
        } else {
          var new_accredation = {
            accredition: this.certification_form_data.certification.accredition,
            month: this.certification_form_data.certification.month,
            year: this.certification_form_data.certification.year.toString(),
          };

          //console.log("new_accredition", new_accredation);
          this.certificationDetails.push(new_accredation);
        }

        // this.editCertification = false;
        this.resetForm();
        this.saveCertificate();
      }
    },
    resetForm() {
      let form = {
        certification: {
          edit_index: -1,
          accredition: "",
          month: "",
          year: "",
        },
      };
      this.certification_form_data = form;
      this.v$.$reset();
    },

    editDetails(index) {
      this.isUpdate = true;
      // this.certification_form_data.certification =
      //   this.certificationDetails[index];
      let edit_index = index;
      this.certification_form_data.certification.accredition =
        this.certificationDetails[index].accredition;
      this.certification_form_data.certification.month =
        this.certificationDetails[index].month;
      this.certification_form_data.certification.year =
        this.certificationDetails[index].year;
      this.certification_form_data.certification.edit_index = index;

      this.editCertification = true;
    },
    deleteRecord() {
      this.showDeleteConfirmationMessage = true;
    },
    closeConfirmationMessage() {
      this.showDeleteConfirmationMessage = false;
    },
    deleteCertificate() {
      // this.$confirm.require({
      //   message: "Are you sure you want to delete this certificate?",
      //   header: "Delete Confirmation",
      //   icon: "pi pi-info-circle",
      //   acceptClass: "p-button-danger",
      //   accept: () => {
      //Delete record
      let index = this.data;
      this.certificationDetails.splice(index, 1);
      this.onBacklick();
      this.saveCertificate();
      if (this.certificationDetails.length == 0) {
        this.editCertification = true;
      }
      //   },
      //   reject: () => {},
      // });
      //this.editCertification = false;
    },
    saveCertificate() {
      var dataToSave = {
        accreditions: this.certificationDetails,
      };

      //console.log("Data for Saving", dataToSave);

      this.action_savecertificationList(dataToSave).then((response) => {
        // this.display = true;
        this.onBacklick();
        this.$toast.add({
          severity: appConstants.toast_severity.SUCCESS,
          summary: appConstants.toast_summary.SUCCESS,
          detail: response.message,
          life: 3000,
        });
      });
    },
    onBacklick() {
      //console.log("onBacklick");
      this.$emit("close", false);
    },
    backToList() {
      // this.isUpdate = false;
      // if (
      //   this.editCertification == true &&
      //   this.certificationDetails.length > 0
      // ) {
      //   this.editCertification = false;
      //   this.resetForm();
      // } else {
      //   this.$router.push({ name: appConstants.routes.PROFILENEW });
      // }
      this.onBacklick();
    },
    backToBuildcv() {
      // this.$router.push({ name: appConstants.routes.PROFILENEW });
      let userSlug = this.getter_user.slug;
      this.$router.push({
        name: appConstants.routes.VIEWPROFILE,
        params: { user_slug: userSlug, section: this.cv_elements.CERTIFICATES },
      });
    },
    certificationLoops() {
      //const requiredCount = this.getter_UserProfile.accredition.length;
      this.certificationDetails =
        this.getter_UserProfile.accreditions.accreditions;

      if (!this.getter_UserProfile.length) {
        this.editCertification = true;
      } else {
        this.editCertification = false;
      }
      // for (let obj = 0; obj < requiredCount; obj++) {
      //   let accredition = { accredition: "" };
      //   this.certification_form_data.certification.push(accredition);
      // }
    },
  },
  created() {
    // this.certificationLoops();
    // console.log(this.getter_UserProfile.accreditions.accreditions);
    //  const user_id = this.getter_user.id
    //  //console.log(user_id);
    // this.action_getCertificationlist(user_id).then(()=>{
    //     this.certificationLoops()
    // })
    //this.yearsArray();
    this.certificationDetails =
      this.getter_UserProfile.accreditions.accreditions;
    if (this.data >= 0) {
      let index_to_edit_record = this.data;
      // let dataToEditRecord = this.fetchEducationRecordFromStore(index)

      if (index_to_edit_record < 0) {
        this.addCertification();
      } else {
        this.certificationDetails =
          this.getter_UserProfile.accreditions.accreditions;

        this.editDetails(index_to_edit_record);
      }
    }
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
  /* font-size: 1rem;font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; */

  color: rgba(55, 65, 81, var(--tw-text-opacity));
  background: #ffffff;
  padding: 0.5rem 0.5rem;
  /* border: 1px solid #ced4da; 
    transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;*/
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 3px;
}

.p-inputtext:enabled:focus {
  outline: 0 none;
  outline-offset: 0;
  /* box-shadow: 0 0 0 0.2rem #a6d5fa; */
  /* border-color: #2196F3; */
}

.p-component {
  /* font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; */
  font-size: 1rem;
  font-weight: normal;
}

@media only screen and (max-width: 600px) {
  .content-div {
    width: 200px;
    height: 120px;
  }
}
</style>
