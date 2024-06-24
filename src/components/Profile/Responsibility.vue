<template>
  <div class="p-6 form-bg-w">
    <div class="flex w-[100%] flex-wrap mb-2">
      <div class="w-full">
        <div class="text-sm text-grey-dark flex items-center">
          <div class="justify-center flex items-center">
            <span
              class="flex items-center justify-center page-title text-[#964b00]"
              >Responsibility</span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="py-1 m-auto w-full mt-1 cls-profileNew-bg-w">
      <div>
        <!-- DResponsibility -->
        <div>
          <div class="flex justify-between mb-2">
            <div class="form-label-bg-w">
              Choose your responsibility that best fit to your Responsibility
            </div>
            <div>
              <button
                class="btn btn-controls ml-4"
                type="submit"
                @click="visible = true"
              >
                Suggestions
              </button>
            </div>
          </div>
          <div class="flex justify-between mb-2">
            <label class="form-label-bg-w pb-2 app-text-color-secondary">
              Responsibility
            </label>
            <div>
              <button
                class="btn btn-controls ml-4"
                type="submit"
                @click="addResponsibility()"
              >
                Add
              </button>
            </div>
          </div>
          <div class="grid lg:grid-cols-1 md:grid-cols-1 grid-cols-1 mt-2">
            <div
              class="pl-4"
              v-for="(res, index) in formData.selectedSugg"
              :key="index"
            >
              <Textarea
                class="pt-2 form-control"
                v-model="formData.selectedSugg[index]"
              ></Textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="card flex justify-content-center">
        <Dialog
          v-model:visible="visible"
          modal
          :showHeader="false"
          :style="{ width: '50vw' }"
          :breakpoints="{ '960px': '75vw', '641px': '100vw' }"
        >
          <div class="form-bg-w p-6">
            <p class="m-0">{{ popup.message }}</p>

            <div class="flex justify-between space-x-4 mt-4">
              <h4 class="text-base font-medium text-[#964b00]">Suggestions</h4>
              <button class="btn w-24" @click="visible = false">Done</button>
            </div>
            <div
              v-for="(sugg, index) of getter_searchSuggestion"
              :key="index"
              class="flex align-items-center mt-2"
            >
              <Checkbox
                v-model="formData.selectedSugg"
                :inputId="sugg._source.id"
                name="suggestion"
                :value="sugg._source.suggestion"
              />
              <label>&nbsp;{{ sugg._source.suggestion }} </label>
            </div>
          </div>
        </Dialog>
      </div>
      <div class="flex items-end justify-end space-x-3 mt-8">
        <div>
          <button class="btn btn-controls" type="submit" @click="onBacklick()">
            Back
          </button>
          <!-- <button class="btn btn-controls hover-experience hover-effect ml-4" type="submit">
                        Update
                    </button> -->
          <button
            class="btn btn-controls ml-4"
            type="submit"
            @click="deleteResponsibility($event)"
          >
            Delete
          </button>
          <button
            class="btn btn-controls ml-4"
            type="submit"
            @click="save($event)"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, ref } from "vue";
import Textarea from "primevue/textarea";
import Dropdown from "primevue/dropdown";
import { useStore } from "vuex";
import { mapActions } from "vuex";
import Checkbox from "primevue/checkbox";
import Dialog from "primevue/dialog";
import { useRouter, useRoute } from "vue-router";
import { computed, watchEffect, onMounted } from "vue";
import appConstants from "../../appConstants.js";
export default {
  name: "Responsibility",
  props: ["message"],
  emits: ["close"],
  components: {
    Textarea,
    Dropdown,
    Checkbox,
    Dialog,
  },
  setup(props, { emit }) {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const visible = ref(false);
    let suggestionBtn = ref(false);
    let suggestionArray = [];
    let responsibilityArray = [];
    let id = props.message;

    const formData = reactive({
      selectedSugg: [""],
    });
    const popup = reactive({
      header: "Select Suggestion",
      display: false,
      message: "",
    });
    let getter_UserProfile = computed(
      () => store.getters["UserProfile/getter_UserProfile"]
    );
    let getter_searchSuggestion = computed(
      () => store.getters["dropdown/getter_searchSuggestion"]
    );
    let getter_user = computed(() => store.getters["login/getter_user"]);
    getSuggestionList();

    if (props.message) {
      let id = props.message;
      let dataToEditRecord = fetchResponsibilityFromStore(id);
    }
    function getSuggestionList() {
      store.dispatch("dropdown/action_getSuggestions");

      fetchResponsibilityFromStore();
    }
    function suggestionClick() {
      suggestionBtn.value = !suggestionBtn.value;
    }
    function backToProfile(e) {
      if (e != null) {
        e.preventDefault();
      }
      let userSlug = getter_user.value.slug;
      router.push({
        name: appConstants.routes.VIEWPROFILE,
        params: { user_slug: userSlug },
      });
    }
    function save() {
      let save_res = [];
      for (let i = 0; i < formData.selectedSugg.length; i++) {
        if (formData.selectedSugg[i].trim().length > 0) {
          save_res.push(formData.selectedSugg[i]);
        }
      }
      let obj = {
        id: props.message,
        responsibilities: save_res,
      };
      store
        .dispatch("UserProfile/action_updateResponsibility", obj)
        .then((res) => {
          onBacklick();
        });
    }
    function fetchResponsibilityFromStore(id) {
      // console.log("fetchResponsibilityFromStore", props.message);
      let dataToEdit = "";
      // console.log(
      //   " getter_UserProfile.value.org_details.length",
      //   getter_UserProfile.value.org_details
      // );
      for (let i = 0; i < getter_UserProfile.value.org_details.length; i++) {
        if (getter_UserProfile.value.org_details[i].id == id) {
          dataToEdit = JSON.parse(
            JSON.stringify(getter_UserProfile.value.org_details[i])
          );
          formData.selectedSugg = dataToEdit.responsibilities;
        }
      }
      return dataToEdit;
    }
    function updateResponsibility() {
      let obj = {
        id: props.message,
        responsibilities: formData.selectedSugg,
      };
      store
        .dispatch("UserProfile/action_updateResponsibility", obj)
        .then((res) => {
          onBacklick();
        });
    }
    function deleteResponsibility() {
      let obj = {
        id: props.message,
        responsibilities: [],
      };
      store
        .dispatch("UserProfile/action_updateResponsibility", obj)
        .then((res) => {
          onBacklick();
        });
    }
    function addResponsibility() {
      let textRes = "";
      formData.selectedSugg.push(textRes);
      formData.selectedSugg.selectionStart = formData.selectedSugg.value.length;
    }
    function onBacklick() {
      emit("close");
    }
    return {
      formData,
      suggestionBtn,
      getter_searchSuggestion,
      responsibilityArray,
      suggestionArray,
      popup,
      visible,
      id,
      updateResponsibility,
      addResponsibility,
      save,
      suggestionClick,
      getSuggestionList,
      deleteResponsibility,
      backToProfile,
      fetchResponsibilityFromStore,
      onBacklick,
    };
  },
};
</script>
