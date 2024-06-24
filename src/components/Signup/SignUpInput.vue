<template>
  <div class="flex flex-col space-y-3 mt-3">
    <div class="flex space-x-2">
      <!-- Name input -->
      <input
        v-model="singUpData.first_name"
        type="text"
        placeholder="First Name"
        class="text-center p-1 w-[10rem] bg-white text-gray-700 focus:outline-none rounded-md"
      />
      <input
        v-model="singUpData.last_name"
        type="text"
        placeholder="Last Name"
        class="text-center p-1 w-[10rem] bg-white text-gray-700 focus:outline-none rounded-md"
      />
    </div>
    <input
      v-model="singUpData.username"
      type="text"
      placeholder="User name"
      class="text-center p-1 w-[20.5rem] bg-white text-gray-700 focus:outline-none rounded-md"
    />
    <!-- Phone input -->
    <input
      v-if="usePhone"
      type="phone"
      placeholder="Phone"
      class="text-center p-1 w-[20.5rem] bg-white text-gray-700 focus:outline-none rounded-md"
    />
    <!-- Email input -->
    <input
      v-else
      v-model="singUpData.email"
      type="email"
      placeholder="Email"
      class="text-center p-1 w-[20.5rem] bg-white text-gray-700 focus:outline-none rounded-md"
    />
    <!-- use phone button -->
    <span @click="usePhone = !usePhone" class="flex justify-center">
      <button class="px-4 border border-opacity-40 text-gray-400 rounded-md">
        Use Phone
      </button>
    </span>

    <!-- <input type="select" placeholder="Profession" 
            class="text-center p-1 w-[20.5rem] bg-white text-gray-700 focus:outline-none rounded-md"> -->
    <!-- password input -->
    <input
      v-model="singUpData.password1"
      type="password"
      placeholder="Password"
      class="text-center p-1 w-[20.5rem] bg-white text-gray-700 focus:outline-none rounded-md"
    />
    <input
      v-model="singUpData.password2"
      type="password"
      placeholder="Repeat password"
      class="text-center p-1 w-[20.5rem] bg-white text-gray-700 focus:outline-none rounded-md"
    />
    <span class="w-[20rem] text-xs">
      <p class="text-gray-500 text-center">
        THE PASSWORD MUST BE AT LEAST 8 CHARACTERS AND CONTAIN ONE SPECIAL
        CHARACTER AND ONE UPPERCASE CHARACTER.
      </p>
    </span>
    <div class="flex items-center justify-center space-x-2 pt-6 text-sm">
      <input v-model="terms" type="checkbox" name="code" id="code" />
      <label for="code"
        ><span>I AGREE <a href="#">TERMS & CONDITIONS</a></span></label
      >
    </div>
    <button
      v-if="terms"
      @click="cAcount"
      class="mt-8 btn-cursor w-[20.5rem] border-2 border-[#B7B7B7] rounded-md text-lg font-weight-700"
    >
      <span class="">Create Acount</span>
    </button>
    <span
      v-else
      class="mt-8 btn-cursor w-[20.5rem] border-2 border-gray-500 text-gray-500 rounded-md text-lg font-weight-700"
    >
      <span class="flex justify-center">Accept Terms</span>
    </span>
    <span class="text-red-400 w-[20rem]" v-if="!terms"
      >Accept Terms and Conditions</span
    >
    <span class="text-[#396346] w-[20rem]" v-else>All Good</span>
    <span class="text-red-400 w-[20rem]" v-if="error">{{ error }}</span>
    <span v-if="loading">...</span>
    <!--<span v-if="signUpStore.onBoard"> On board </span>-->
  </div>
</template>

<script>
import { signUpStore } from "/src/store/index.js";
import { reactive, ref } from "@vue/reactivity";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "SignUpInput",
  data() {
    return {
      singUpData: {
        email: "kanav@29.com",
        username: "kanav29",
        first_name: "Akshay",
        last_name: "Anand",
        password1: "qwerty@123",
        password2: "qwerty@123",
        city: "default",
        is_admin: false,
        country_code: "",
        phone: "",
        verified_credentials: [0],
      },
      terms: false,
      loading: false,
      usePhone: false,
      error: "",
    };
  },
  computed: {
    ...mapGetters("login", ["getter_user", "getter_error"]),
  },

  methods: {
    ...mapActions("login", ["createAccount"]),

    cAcount() {
      this.loading = true;
      this.terms = true;
      this.createAccount(this.singUpData)
        .then(() => {
          this.loading = false;
          this.user = this.getter_user;
          signUpStore.onBoard = !signUpStore.onBoard;
          this.$router.push({ name: appConstants.routes.HOME });
        })
        .catch(() => {
          this.loading = false;
          this.user = null;
          this.error = this.getter_error;
        });
    },
  },
};

// import { signUpStore, userStore } from "/src/store/index.js";
// import { reactive, ref } from "@vue/reactivity";
// import { userSignUp } from "/src/api/httpClient";

// const singUpData = reactive({
//   email: "kanav@29.com",
//   username: "kanav29",
//   first_name: "Akshay",
//   last_name: "Anand",
//   password1: "qwerty@123",
//   password2: "qwerty@123",
//   city: "default",
//   is_admin: false,
//   country_code: "",
//   phone: "",
//   verified_credentials: [0],
// });

// const loading = ref(false);
// const terms = ref(false);
// const usePhone = ref(false);

// async function cAcount() {
//   terms.value = true;
//   loading.value = true;
//   userStore.user = null;
//   console.log('singUpData =>',singUpData);
//   if (singUpData) {
//     await userSignUp(singUpData)
//       .then((json) => {
//         userStore.user = json;
//         loading.value = false;
//       })
//       .catch((err) => {
//         console.log(err.message);
//       });
//   }
//   if (userStore.user.status == "success") {
//     localStorage.setItem("user", JSON.stringify(userStore.user));
//     console.log(userStore.user);
//     // router.push({name:'Login'})
//     signUpStore.onBoard = !signUpStore.onBoard;
//   }

// }
</script>
