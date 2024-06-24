<template>
  <div class="form-bg-w p-6">
    <div>
      <!-- second section -->
      <div class="w-full">
        <div class="flex items-center">
          <div class="justify-center flex items-center mb-2">
            <span
              class="flex items-center justify-center page-title text-[#964b00]"
              >Soft Skill</span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="py-1 m-auto w-full cls-profileNew-bg-w">
      <div>
        <!-- DResponsibility -->
        <div>
          <div class="flex justify-between mb-2">
            <div class="form-label-bg-w">
              Choose auto suggestion that best fit to your Soft Skills
            </div>
            <div>
              <button
                class="btn btn-controls ml-4"
                type="submit"
                @click="visible = true"
              >
                Suggestions</button
              ><button
                class="btn btn-controls ml-4"
                type="submit"
                @click="addSoftSkill()"
              >
                Add
              </button>
            </div>
          </div>
          <div class="flex justify-between">
            <label class="form-label-bg-w"> Soft Skills</label>
            <div></div>
          </div>
          <div class="grid lg:grid-cols-1 md:grid-cols-1 grid-cols-1 mt-2">
            <div
              class="pl-4 flex"
              v-for="(res, index) in formData.selectedSugg"
              :key="index"
            >
              <Textarea
                class="pt-2 mb-2.5 cls-profileNew-bg-w"
                v-model="formData.selectedSugg[index]"
              ></Textarea>
              <img
                src="../../assets/img/Trash.svg"
                alt="Trash"
                class="mx-auto w-10 pl-4 cursor-pointer"
                @click="deleteSoftSkill(index)"
              />
            </div>
          </div>
          <div class="flex items-end justify-end space-x-3 mt-8">
            <div>
              <button
                class="btn btn-controls"
                type="submit"
                @click="onBacklick()"
              >
                Cancel
              </button>
              <button
                class="btn btn-controls ml-4"
                type="submit"
                @click="deleteAllSoftSkill($event)"
              >
                Delete All
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
            <h4>Suggestions</h4>
            <div
              v-for="(sugg, index) of getter_searchSoftwareSuggestion"
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
            <div class="flex justify-end space-x-4 mt-4">
              <button class="btn w-24" @click="visible = false">Done</button>
            </div>
          </div>
        </Dialog>
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
  name: "SoftSkills",
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
    let technicalSkillArray = [];
    let id = route.query.q;
    const cv_elements = appConstants.CV_ELEMENTS;

    const formData = reactive({
      selectedSugg: [],
    });
    const popup = reactive({
      header: "Select Suggestion",
      display: false,
      message: "",
    });
    let getter_UserProfile = computed(
      () => store.getters["UserProfile/getter_UserProfile"]
    );
    let getter_searchSoftwareSuggestion = computed(
      () => store.getters["dropdown/getter_searchSoftwareSuggestion"]
    );
    let getter_user = computed(() => store.getters["login/getter_user"]);
    getSuggestionList();

    if (route.query.q) {
      let id = route.query.q;
      // let dataToEditRecord = fetchResponsibilityFromStore(id);
    }
    function getSuggestionList() {
      store.dispatch("dropdown/action_getSoftSuggestions");

      fetchSoftSkillsFromStore();
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
        params: { user_slug: userSlug, section: cv_elements.SOFT_SKILL },
      });
    }
    function save() {
      let save_res = [];
      for (let i = 0; i < formData.selectedSugg.length; i++) {
        if (formData.selectedSugg[i].trim().length > 0) {
          save_res.push(formData.selectedSugg[i]);
        }
      }
      let newArray = [];
      save_res.forEach((e1) => {
        newArray.push({ skill: e1 });
      });
      store
        .dispatch("UserProfile/action_SaveSoftSkillsList", {
          skills: newArray,
        })
        .then((res) => {
          onBacklick();
        });
    }
    function fetchSoftSkillsFromStore() {
      let dataToEdit = "";
      for (
        let i = 0;
        i < getter_UserProfile.value.soft_skills.soft_skills.length;
        i++
      ) {
        dataToEdit = JSON.parse(
          JSON.stringify(getter_UserProfile.value.soft_skills.soft_skills[i])
        );
        formData.selectedSugg.push(dataToEdit.skill);
      }
      return dataToEdit;
    }
    function updateResponsibility() {
      let obj = {
        id: route.query.q,
        responsibilities: formData.selectedSugg,
      };
      store
        .dispatch("UserProfile/action_updateResponsibility", obj)
        .then((res) => {
          onBacklick();
        });
    }
    function deleteAllSoftSkill() {
      let obj = {
        id: props.message,
        skills: [],
      };
      store
        .dispatch("UserProfile/action_SaveSoftSkillsList", obj)
        .then((res) => {
          onBacklick();
        });
    }
    function deleteSoftSkill(index) {
      formData.selectedSugg.splice(index, 1);
    }
    function addSoftSkill() {
      let textRes = "";
      formData.selectedSugg.push(textRes);
    }
    function onBacklick() {
      emit("close");
    }
    return {
      formData,
      suggestionBtn,
      technicalSkillArray,
      suggestionArray,
      popup,
      visible,
      id,
      getter_searchSoftwareSuggestion,
      updateResponsibility,
      addSoftSkill,
      save,
      suggestionClick,
      getSuggestionList,
      deleteSoftSkill,
      deleteAllSoftSkill,
      backToProfile,
      fetchSoftSkillsFromStore,
      onBacklick,
    };
  },
};
</script>
