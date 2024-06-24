<template>
  <div class="block flex items-center justify-end lg:hidden md:hidden p-2">
    <img
      :src="getStaticImage('Setting-Menu-Close.svg')"
      alt=""
      @click="clickCloseForm()"
    />
  </div>
  <div class="cls-changepassword w-full lg:p-8 md:p-8 p-2 mt-5">
    <div class="flex flex-col">
      <div class="flex lg:pl-5 md:pl-5 pl-3">
        <h1
          class="app-text-color-secondary font-weight-700 lg:text-lg md:text-lg text-base"
        >
          Reset Password
        </h1>
      </div>
      <div class="grid grid-cols-5">
        <div
          class="lg:col-span-4 md:col-span-4 col-span-5 flex flex-col lg:p-5 md:p-5 p-3 bg-white rounded-2xl"
        >
          <div class="relative space-0 mb-2">
            <Password
              v-model="changePassword.old_Password"
              class="w-full text-center form-control"
              placeholder="Old Password*"
              hideIcon="pi pi-eye"
              showIcon="pi pi-eye-slash"
              @paste.prevent
            ></Password>
            <!-- <div v-if="strongPass" class="invalid-feedback">
              Please enter strong password.
            </div> -->
            <div
              class="invalid-feedback"
              v-for="error of v$.old_Password.$errors"
              :key="error.$uid"
            >
              {{ error.$message }}
            </div>
          </div>
          <div class="relative space-0 mb-2">
            <Password
              v-model="changePassword.new_password"
              toggleMask
              class="w-full text-center form-control"
              placeholder="Password*"
              strongRegex="^(?=.*[A-Z])(?=.*[!@#$%&*])(?=.{8,})"
              @keyup="validtePassword()"
              hideIcon="pi pi-eye"
              showIcon="pi pi-eye-slash"
              @paste.prevent
            ></Password>
            <div v-if="strongPass" class="invalid-feedback">
              Please enter strong password.
            </div>
            <div
              class="invalid-feedback"
              v-for="error of v$.new_password.$errors"
              :key="error.$uid"
            >
              {{ error.$message }}
            </div>
          </div>
          <div class="relative space-0">
            <Password
              v-model="changePassword.confirm_password"
              toggleMask
              class="w-full text-center form-control"
              placeholder="Confirm Password*"
              strongRegex="^(?=.*[A-Z])(?=.*[!@#$%&*])(?=.{8,})"
              hideIcon="pi pi-eye"
              showIcon="pi pi-eye-slash"
              @paste.prevent
            ></Password>
            <div
              class="invalid-feedback"
              v-for="error of v$.confirm_password.$errors"
              :key="error.$uid"
            >
              {{ error.$message }}
            </div>
          </div>

          <span v-if="validatePassword">
            <p class="font-size-12 mb-2 ml-2 text-red-400">
              Passwords didn’t match. Try again.
            </p>
          </span>

          <div class="flex mt-10 justify-end">
            <button
              class="btn bg-[#1c1c1c] flex items-center w-auto justify-center px-4"
              @click="updatePassword()"
            >
              <span
                class="text-white font-weight-600 lg:text-base md:text-base text-sm"
                >Save</span
              >
            </button>
          </div>
        </div>
        <div class="lg:block md:block hidden"></div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  computed,
  ref,
  watchEffect,
  onBeforeMount,
  reactive,
  onMounted,
} from "vue";
import useVuelidate from "@vuelidate/core";
import { required, helpers, sameAs } from "@vuelidate/validators";
import Password from "primevue/password";
import { useStore } from "vuex";
import { useToast } from "primevue/usetoast";
import appConstants from "../../appConstants.js";
import useEmitter from "../../composables/useEmitter.js";
export default {
  name: "ChangePassword",
  inheritAttrs: false,
  components: {
    Password,
  },

  setup() {
    const store = useStore();
    const toast = useToast();

    let strongPass = ref(false);
    let validatePassword = ref(false);
    let submitted = ref(false);
    const $emitter = useEmitter();

    const changePassword = reactive({
      old_Password: "",
      new_password: "",
      confirm_password: "",
    });

    const rules = {
      old_Password: {
        required: helpers.withMessage("Old password is required", required),
      },
      new_password: {
        required: helpers.withMessage("New Password is required", required),
      },
      confirm_password: {
        required: helpers.withMessage("Confirm Password is required", required),
        // sameAsPassword: helpers.withMessage(
        //   "Password doesn't match. Please re-enter password",
        //   sameAs(changePassword.new_password)
        // ),
      },
    };

    const v$ = useVuelidate(rules, changePassword);

    function validtePassword() {
      let passw = /^(?=.*[A-Z])(?=.*[!@#$%&*])(?=.{8,})/;
      if (changePassword.new_password.match(passw)) {
        strongPass.value = false;
        return true;
      } else {
        strongPass.value = true;
        return false;
      }
    }
    function updatePassword() {
      v$.value.$touch();
      if (v$.value.$invalid) {
        return false;
      } else {
        if (changePassword.new_password == changePassword.confirm_password) {
          validatePassword.value = false;
          let data = {
            old_password: changePassword.old_Password,
            new_password: changePassword.new_password,
            confirm_new_password: changePassword.confirm_password,
          };
          //console.log("data", data);
          store.dispatch("setting/action_ChangePassword", data).then((res) => {
            //console.log("res", res.status);
            if (res.status == "success") {
              //v$.value.$invalid = false;
              v$.value.confirm_password.$reset();
              v$.value.new_password.$reset();
              v$.value.old_Password.$reset();
              submitted.value = true;
              changePassword.old_Password = "";
              changePassword.new_password = "";
              changePassword.confirm_password = "";

              toast.add({
                severity: appConstants.toast_severity.INFO,
                summary: appConstants.toast_summary.INFO,
                detail: res.message,
                life: 3000,
              });
            }
          });
          //setOTPToUser();
        } else {
          validatePassword.value = true;

          changePassword.confirm_password = "";
          if (v$.value.$invalid) {
            v$.value.confirm_password.$reset();
          }
          //confirmPassword.value.focus();
        }
      }
    }
    function clickCloseForm() {
      $emitter.emit("close_form");
      //router.push({ name: appConstants.display_route_Name.CHANGEPASSWORD });
    }
    return {
      strongPass,
      v$,
      changePassword,
      validatePassword,
      submitted,
      validtePassword,
      updatePassword,
      clickCloseForm,
    };
  },
};
</script>
<style>
.cls-changepassword .p-inputtext {
  background: #fff !important;
}
.cls-changepassword .p-inputtext {
  font-size: 14px !important;
}
</style>
