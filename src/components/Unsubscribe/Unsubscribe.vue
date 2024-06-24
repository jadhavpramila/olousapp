<template>
  <div class="form-container cls-unsubscribe">
    <div class="grid grid-cols-5">
      <div class="lg:block hidden"></div>
      <div class="hidden lg:col-span-3 col-span-5">
        <div
          v-if="!isUnsubscribed"
          class="flex flex-col lg:col-span-3 col-span-5 p-5 bg-white rounded-2xl"
        >
          <h1 class="unsubscribe-title">{{ unsubscribeEmailId }}</h1>
          <br />
          <!-- <span class="font-medium text-base app-text-color-secondary mb-5"
          >is subscribed to our mailing list (s).</span
        > -->

          <span class="font-medium text-base app-text-color-secondary">
            We hate goodbyes, but if you change your mind, we'll always be here
            with something interesting to share.</span
          >
          <br />
          <span class="font-medium text-base app-text-color-secondary"
            >Before you go, please let us know why you wish to
            unsubscribe:</span
          >

          <div class="flex flex-col w-full mt-1">
            <div
              v-for="(reason, index) in reasonsList"
              :key="index"
              class="flex inline-flex items-center"
            >
              <!-- <span class="font-medium text-base app-text-color-secondary mb-5"
          >(List of Reasons)reasonsList</span
        > -->
              <RadioButton
                name="reason"
                :value="reason.id"
                v-model="reasonTitle"
                inputClass="scale-150"
                @change="checkIsOtherReason()"
              />

              <label for="reason-title" class="radio-button-name ml-4">
                {{ reason.reason }}</label
              >
            </div>
            <div class="flex" v-if="isShowTextBox">
              <input
                type="text"
                name="other-reason"
                class="form-control"
                v-model="otherReason"
                style="border-color: #e3dede"
                placeholder="Other reason"
              />
            </div>
          </div>

          <div class="flex justify-between items-end">
            <button class="btn unsubscribe-button" @click="clickUnsubscribe()">
              Unsubscribe
            </button>
            <img
              :src="getStaticImage('cryingEmoji2x.png')"
              alt="CryingEmoji"
              style="height: 83px; width: 83px"
            />
          </div>
        </div>
        <div
          v-if="isUnsubscribed"
          class="flex flex-col lg:col-span-3 col-span-5 p-5 bg-white rounded-2xl"
        >
          <span class="font-medium text-base app-text-color-secondary">
            <!-- TODO add if condition after getting email catagory id -->
            You have been successfully unsubscribed.
            <br />
            Didn't mean to unsubscribe?
          </span>
          <br />

          <div class="flex justify-between items-end">
            <button class="btn unsubscribe-button" @click="clickResubscribe()">
              Resubscribe
            </button>
          </div>
        </div>
      </div>
      <div class="flex flex-col lg:col-span-3 col-span-5 p-5">
        <UnsubscribeLoginToUnsubscribe
          v-if="isShowLoginToUnsubscribe"
        ></UnsubscribeLoginToUnsubscribe>
        <UnsubscribeNotAllow v-if="isShowUserNotAllowed"></UnsubscribeNotAllow>
        <UnsubscribeSuccessResubscribe
          v-if="isShowUnsubscribeSuccess"
        ></UnsubscribeSuccessResubscribe>
      </div>

      <div class="lg:block hidden"></div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import RadioButton from "primevue/radiobutton";
import appConstants from "../../appConstants.js";
import { useToast } from "primevue/usetoast";
import UnsubscribeLoginToUnsubscribe from "./UnsubscribeLoginToUnsubscribe.vue";
import UnsubscribeNotAllow from "./UnsubscribeNotAllow.vue";
import UnsubscribeSuccessResubscribe from "./UnsubscribeSuccessResubscribe.vue";

export default {
  name: "Unsubscribe",
  components: {
    RadioButton,
    UnsubscribeLoginToUnsubscribe,
    UnsubscribeNotAllow,
    UnsubscribeSuccessResubscribe,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const toast = useToast();
    let reasonTitle = ref("1");
    let otherReason = ref("");
    let isUnsubscribed = ref(false);
    let isShowTextBox = ref(false);
    let isShowLoginToUnsubscribe = ref(false);
    let isShowUnsubscribeSuccess = ref(false);
    let isShowUserNotAllowed = ref(false);

    let unSubscribeStr = ref();
    let reasonType = appConstants.reason_type;
    let reasonsList = computed(
      () => store.getters["unsubscribe/getter_reasonsListData"]
    );

    let unsubscribeData = computed(
      () => store.getters["unsubscribe/getter_unsubscribeData"]
    );
    let unsubscribeEmailId = computed(
      () => store.getters["unsubscribe/getter_UnsubscribeEmailID"]
    );
    function getReasonList() {
      store
        .dispatch("unsubscribe/action_getReasonsList", unSubscribeStr.value)
        .then((res) => {
          // isShowUnsubscribeSuccess.value = true;
          if (
            res.redirect_to ==
            appConstants.Unsubscribe_Redirect.LOGIN_TO_UNSUBSCRIBE
          ) {
            isShowLoginToUnsubscribe.value = true;
          } else if (
            res.redirect_to ==
            appConstants.Unsubscribe_Redirect.UNSUBSCRIBED_SUCCESSFULLY
          ) {
            isShowUnsubscribeSuccess.value = true;
          } else if (
            res.redirect_to == appConstants.Unsubscribe_Redirect.NOT_ALLOWED
          ) {
            isShowUserNotAllowed.value = true;
          }
          //console.log("response", res.redirect_to);
        });
    }
    function checkIsOtherReason() {
      if (reasonTitle.value == reasonType.OTHERS) {
        isShowTextBox.value = true;
      } else {
        isShowTextBox.value = false;
        otherReason.value = "";
      }
    }
    function clickUnsubscribe() {
      let data = {
        issubscribed: false,
        unsubscribe_reason_id: reasonTitle.value,
        other_reason: otherReason.value,
        unsubscribe_str: unSubscribeStr.value,
      };
      console.log("data", data);
      store.dispatch("unsubscribe/action_unsubscribeUser", data).then(() => {
        isUnsubscribed.value = true;
      });
    }
    function clickResubscribe() {
      let data = {
        issubscribed: true,
        unsubscribe_reason_id: reasonTitle.value,
        other_reason: otherReason.value,
        unsubscribe_str: unSubscribeStr.value,
      };
      console.log("data", data);
      store.dispatch("unsubscribe/action_resubscribeUser", data).then(() => {
        toast.add({
          severity: appConstants.toast_severity.SUCCESS,
          summary: appConstants.toast_summary.SUCCESS,
          detail:
            "You have successfully subscribed to Olous Email Notifications",
          life: 3000,
        });
      });
    }
    onMounted(() => {
      let url = window.location.href;
      //let url = "https://api.dev.olous.app/api/v1/users/unsubscribe/wLM1DF4jhkvM5urAiXgYssEjqKRC0vQhI51lO-bOMaA=";
      unSubscribeStr.value = route.params.unsubscribe_str;
      //console.log("url", encryptedString);
      getReasonList();
    });
    return {
      reasonsList,
      unSubscribeStr,
      unsubscribeData,
      unsubscribeEmailId,
      reasonTitle,
      otherReason,
      isShowTextBox,
      isUnsubscribed,
      reasonType,
      isShowUserNotAllowed,
      isShowUnsubscribeSuccess,
      isShowLoginToUnsubscribe,
      getReasonList,
      clickUnsubscribe,
      clickResubscribe,
      checkIsOtherReason,
    };
  },
};
</script>
