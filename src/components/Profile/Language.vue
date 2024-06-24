<template>
  <div class="form-bg-w p-6">
    <div class="flex w-[100%] flex-wrap cls-profileNew-bg-w">
      <div class="w-full">
        <div class="flex w-[100%] flex-wrap">
          <div class="w-full">
            <div class="flex items-center">
              <div class="justify-center flex items-center mb-2">
                <span
                  class="flex items-center justify-center page-title app-text-color-primary"
                  >Language</span
                >
              </div>
            </div>
          </div>
        </div>
        <div class="">
          <div class="card flex justify-content-center">
            <form class="w-full">
              <div class="grid md:grid-cols-2 gap-2">
                <div class="">
                  <div><label class="form-label-bg-w"> Language</label></div>
                  <Dropdown
                    v-model="state.language_id"
                    :options="getter_languages"
                    optionLabel="display_string"
                    optionValue="id"
                    placeholder=""
                    class="w-full md:w-22rem form-control rounded-lg primevue-dropdown"
                    :disabled="isEditMode"
                  />
                  <div
                    class="invalid-feedback"
                    v-for="error of v$.language_id.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}
                  </div>
                  <!-- <small class="p-error" id="dd-error">{{ errorMessage || '&nbsp;' }}</small> -->
                </div>
                <div class="">
                  <div><label class="form-label-bg-w"> Level </label></div>
                  <Dropdown
                    v-model="state.rating"
                    :options="languageFluencyList"
                    optionLabel="name"
                    optionValue="id"
                    placeholder=""
                    class="w-full md:w-22rem form-control rounded-lg primevue-dropdown"
                  />
                  <div
                    class="invalid-feedback"
                    v-for="error of v$.rating.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}
                  </div>
                </div>
              </div>
              <div class="grid-cols-1">
                <div class="flex items-end justify-end space-x-3 mt-8">
                  <div class="gri">
                    <button
                      class="btn btn-controls mr-4 mt-1"
                      @click="onBackclick($event)"
                    >
                      Cancel
                    </button>
                    <button
                      v-if="isEditMode"
                      class="btn btn-controls mr-4 mt-1"
                      @click="updateSoftware"
                      type="submit"
                    >
                      Update
                    </button>
                    <button
                      v-if="!isEditMode"
                      class="btn btn-controls mt-1"
                      @click="addSoftware($event)"
                      type="submit"
                    >
                      Save
                    </button>
                    <button
                      v-if="isEditMode"
                      class="btn btn-controls mt-1"
                      @click="deleteSoftware($event)"
                      type="submit"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import { useStore } from "vuex";
import useVuelidate from "@vuelidate/core";
import { useRouter, useRoute } from "vue-router";
import appConstants from "../../appConstants.js";
import { mapActions } from "vuex";
import { ref, reactive, computed, watchEffect, onMounted } from "vue";
import { useToast } from "primevue/usetoast";
import { helpers, required } from "@vuelidate/validators";
import { getCurrentInstance } from "vue";

export default {
  name: "Language",
  props: ["data"],
  emits: ["close"],
  components: {
    InputText,
    Dropdown,
    Button,
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const cv_elements = appConstants.CV_ELEMENTS;
    let languageFluencyList = appConstants.Language_Fluency_list;
    const app = getCurrentInstance();
    const $emitter = app.appContext.config.globalProperties.emitter;
    // let selectedLanguage = ref({
    //       "display_string": "",
    //       "id" : ""
    //     }
    // );
    const state = reactive({
      language_id: "",
      language_name: "",
      rating: "",
    });
    const rules = {
      language_id: {
        required: helpers.withMessage("Language name is required", required),
      },
      language_name: {
        required: helpers.withMessage("Language name is required", required),
      },
      rating: {
        required: helpers.withMessage("Language rating is required", required),
      },
    };
    const v$ = useVuelidate(rules, state);
    let isEditMode = ref(false);

    let getter_user = computed(() => store.getters["login/getter_user"]);
    let getter_languages = computed(
      () => store.getters["dropdown/getter_languages"]
    );
    let getter_UserProfile = computed(
      () => store.getters["UserProfile/getter_UserProfile"]
    );

    watchEffect(() => {
      setLanguageName(state.language_id);
    });

    if (props.data) {
      //console.log(route.query.q);
      let id = props.data;
      let dataToEditRecord = fetchLanguageRecordFromStore(id);

      if (dataToEditRecord == "") {
        //do nothing
      } else {
        isEditMode.value = true;
        editRecord(dataToEditRecord);
      }
    }
    getLanguage();
    function editRecord(data) {
      state.id = data.id;
      state.language_id = parseInt(data.language_id);
      state.language_name = data.language_name;
      state.rating = data.rating;

      // selectedLanguage.value.display_string  = data.language_name
      // selectedLanguage.value.id = parseInt(data.language_id)
    }

    function getLanguage() {
      store.dispatch("dropdown/action_getLanguages");
    }

    function setLanguageName(id) {
      // console.log(id)
      for (let i = 0; i < getter_languages.value.length; i++) {
        if (getter_languages.value[i].id == id) {
          state.language_name = getter_languages.value[i].display_string;
        }
      }
    }

    // function backToProfile(e) {
    //   if (e != null) {
    //     e.preventDefault();
    //   }
    //   let userSlug = getter_user.value.slug;
    //   router.push({
    //     name: appConstants.routes.VIEWPROFILE,
    //     params: { user_slug: userSlug, section: cv_elements.LANGUAGES },
    //   });
    // }

    function addSoftware(e) {
      e.preventDefault();
      v$.value.$touch();
      if (v$.value.$invalid) {
        return false;
      } else {
        store
          .dispatch("UserProfile/action_addLanguageDetails", state)
          .then((res) => {
            onBackclick();
          });
      }
      // language.language_id = selectedLanguage.value.id;
      // language.language_name = selectedLanguage.value.display_string;
    }

    function updateSoftware(e) {
      e.preventDefault();

      // language.language_id = selectedLanguage.value.id;
      // language.language_name = selectedLanguage.value.display_string;
      store
        .dispatch("UserProfile/action_updateLanguageDetails", state)
        .then((res) => {
          onBackclick();
        });
    }

    function deleteSoftware(e) {
      e.preventDefault();
      let data = {
        id: state.id,
      };
      store
        .dispatch("UserProfile/action_deleteLanguageDetails", data)
        .then((res) => {
          onBackclick();
        });
    }

    function fetchLanguageRecordFromStore(id) {
      let dataToEdit = "";
      for (
        let i = 0;
        i < getter_UserProfile.value.language_details.length;
        i++
      ) {
        if (getter_UserProfile.value.language_details[i].id == id) {
          dataToEdit = JSON.parse(
            JSON.stringify(getter_UserProfile.value.language_details[i])
          );
        }
      }
      //console.log("dataToEdit", dataToEdit);
      return dataToEdit;
    }

    function onBackclick(e) {
      if (e != null) {
        e.preventDefault();
      }

      $emitter.emit("close", cv_elements.LANGUAGES);
    }

    return {
      getter_languages,
      // selectedLanguage,
      //language,
      state,
      v$,
      languageFluencyList,
      isEditMode,
      addSoftware,
      // backToProfile,
      fetchLanguageRecordFromStore,
      updateSoftware,
      deleteSoftware,
      onBackclick,
    };
  },
};
</script>
