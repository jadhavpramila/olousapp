<template>
  <!-- <div class="max-w-full m-1/6 md:mx-auto text-white">
    <Nav />
  </div> -->
  <!-- top section -->
  <div class="cls-achievements form-bg-w p-6">
    <div class="flex flex-wrap">
      <!-- button section 
      <div class="w-full md:w-1/2 lg:w-1/4 px-2 mb-4">
        <div class="h-12 text-sm text-grey-dark flex items-center justify-center">
          <button class="btn btn-white mt-3" type="submit">Back</button>
        </div>
      </div>-->
      <!-- second section -->
      <div class="w-full">
        <div class="flex items-center">
          <div class="justify-center flex items-center mb-2">
            <span
              class="flex items-center justify-center text-[#964b00] page-title"
              >Achievements</span
            >
          </div>
        </div>
      </div>
      <!-- third section 
      <div class="w-full md:w-1/2 lg:w-1/4 px-2 mb-4">
        <div class="h-12 text-sm text-grey-dark flex items-center justify-center">
          <button
            class="btn btn-white mt-3"
            @click="saveAchievements"
            type="submit"
          >
            Save
          </button>
        </div>
      </div>-->
    </div>
    <!-- achievement section -->
    <div class="py-1 m-auto w-full">
      <div class="">
        <!-- <div class="flex flex-col mt-6">
          <span class="self-center text-sm">
            Minimum 4 fields are required to build your CV
          </span>
        </div> -->
        <div
          v-for="(achievement, index) in form_data.achievements"
          :key="index"
        >
          <div class="flex flex-col">
            <div class="flex flex-col">
              <div class="inline-block">
                <!-- <label class="float-left form-label-bg-w">
                  Achievement {{ index + 1 }}
                </label> -->
                <span class="counter">
                  <LimitCounter :count="achievement.achievement" :limit="200" />
                </span>
              </div>
              <!-- :placeholder="'Achievement ' + (index + 1)" -->
              <textarea
                class="p-2 w-[auto] lg:w-1/1 bg-white text-gray-700 focus:outline-none rounded-lg form-control h-14"
                rows="2"
                v-model="achievement.achievement"
                maxlength="200"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- third section-->
        <div class="flex items-end justify-end space-x-3 mt-8">
          <div>
            <button
              class="btn btn-controls mr-4"
              type="submit"
              @click="btnBackClick()"
            >
              Cancel
            </button>
            <button
              class="btn btn-controls"
              @click="saveAchievements"
              type="submit"
            >
              Save
            </button>
          </div>
        </div>
      </div>
      <Dialog :showHeader="false" v-model:visible="display" :modal="true">
        <div class="form-bg-w p-6">
          <p>Achievements saved successfully</p>
          <div class="flex justify-end space-x-4 mt-4">
            <button @click="closeModal" class="btn w-24">OK</button>
          </div>
        </div>
      </Dialog>
    </div>
  </div>
</template>

<script>
import LimitCounter from "/src/components/common/limitCounter.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
import appConstants from "../../appConstants.js";
import Dialog from "primevue/dialog";
export default {
  name: "Achievements",
  props: ["message"],
  components: {
    LimitCounter,
    Dialog,
  },

  data() {
    return {
      display: false,
      submitted: false,
      achievementData: null,
      loopLimit: 5,
      form_data: {
        achievements: [],
      },
      cv_elements: appConstants.CV_ELEMENTS,
    };
  },
  computed: {
    ...mapMutations("achievements", ["commit_achievementsList"]),
    ...mapGetters("UserProfile", ["getter_UserProfile"]),
    ...mapGetters("login", ["getter_user"]),
  },
  methods: {
    ...mapActions("UserProfile", ["action_SaveAchievementsList"]),
    saveAchievements() {
      var dataToSave = {
        achievements: [],
      };

      for (const item of this.form_data.achievements) {
        if (item.achievement.trim() != "") {
          dataToSave.achievements.push(item);
        }
      }

      this.action_SaveAchievementsList(dataToSave).then((response) => {
        // this.display = true;
        this.backToBuildcv();
        this.$toast.add({
          severity: appConstants.toast_severity.SUCCESS,
          summary: appConstants.toast_summary.SUCCESS,
          detail: response.message,
          life: 3000,
        });
      });
    },
    closeModal() {
      this.display = false;
    },
    achievementLoops() {
      const requiredCount =
        this.loopLimit -
        this.getter_UserProfile.achievements.achievements.length;
      this.form_data.achievements = JSON.parse(
        JSON.stringify(this.getter_UserProfile.achievements.achievements)
      );
      for (let obj = 0; obj < requiredCount; obj++) {
        let achievement = { achievement: "" };
        this.form_data.achievements.push(achievement);
      }
    },
    backToBuildcv() {
      // let userSlug = this.getter_user.slug;
      // this.$router.push({
      //   name: appConstants.routes.VIEWPROFILE,
      //   params: { user_slug: userSlug, section: this.cv_elements.ACHIEVEMENTS },
      // });
      this.$emit("close", false);
    },
    btnBackClick() {
      // this.$router.push({ name: appConstants.routes.PROFILENEW });
      // let userSlug = this.getter_user.slug;
      // this.$router.push({ name: appConstants.routes.VIEWPROFILE ,params: { user_slug: userSlug } });
      this.backToBuildcv();
    },
  },
  created() {
    //console.log(this.getter_UserProfile.achievements.achievements);
    // this.action_getAchievementsList("6f19a4c7-e45e-4626-b6c2-98c8c1ce81e7").then(()=>{
    this.achievementLoops();
    // })
  },
};
</script>

<style></style>
