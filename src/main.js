import { createApp } from "vue";
import App from "./App.vue";
import "./assets/css/index.css";
import "./assets/css/app.css";
import "./assets/css/primevue.css";
import router from "./router";
import PrimeVue from "primevue/config";
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import VueLoading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import store from "./store";
import axios from "axios";
import mitt from "mitt";
import { readUserTokenCookie } from "../src/common/js/UserToken.js";
import { createMetaManager } from "vue-meta";
import { plugin as vueMetaPlugin } from "vue-meta";
import UUID from "vue3-uuid";
import ToastService from "primevue/toastservice";
import ConfirmationService from "primevue/confirmationservice";
import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";
import appConstants from "./appConstants.js";
import { getAgentInfo } from "./common/js/getDeviceInfo.js";

axios.defaults.baseURL = import.meta.env.VITE_APP_AXIOSBASEURL;
console.log(`v${__APP_VERSION__}`);
let deviceInfo = getAgentInfo();
axios.defaults.headers.common[
  "HTTP_DEVICEINFO"
] = `${deviceInfo.os.version},${deviceInfo.browser.name},${deviceInfo.browser.version}`;
axios.defaults.headers.common["HTTP_USER_AGENT"] = __APP_VERSION__;
axios.defaults.headers.common["HTTP_DEVICE"] = deviceInfo.os.name;
// axios.defaults.headers.common['DEVICE-INFO'] = `${deviceInfo.os.version},${deviceInfo.browser.name},${deviceInfo.browser.version}`
// axios.defaults.headers.common['USER-AGENT'] =  __APP_VERSION__
// axios.defaults.headers.common['DEVICE'] = deviceInfo.os.name

const emitter = mitt();
const metaManager = createMetaManager();

const app = createApp(App);
// console.log(`is sentry flag : ${import.meta.env.VITE_APP_ADD_SENTRY}`)
// console.log("before  VITE_APP_ADD_SENTRY check")
if (import.meta.env.VITE_APP_ADD_SENTRY == "true") {
  // console.log("Inside VITE_APP_ADD_SENTRY")
  Sentry.init({
    app,
    dsn: "https://7a041dc2daa14b489697c76801609e5c@o1101481.ingest.sentry.io/6261249",
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        tracingOrigins: ["localhost", "my-site-url.com", /^\//],
      }),
    ],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}
// ==================================================
// session implemntation
let obj = [];
window.sessionStorage.setItem("followIds", JSON.stringify(obj));
// ==================================================
app.use(PrimeVue);
app.use(ToastService);
app.use(UUID);
// app.use(VueLoading);
app.use(router);
app.use(store);
app.use(metaManager);
// app.use(emitter)
app.use(vueMetaPlugin);
app.config.globalProperties.emitter = emitter;
app.use(ConfirmationService);

app.config.globalProperties.getStaticImage = (imageName) => {
  let fullURL = `${import.meta.env.VITE_APP_S3_STATIC_IMAGES}${imageName}`;
  return fullURL;
};

app.config.globalProperties.messagingMediaSizeInBytes = appConstants.MESSAGING_MEDIA_MAX_SIZE

app.mount("#app");

axios.interceptors.request.use(
  function (config) {
    const token = readUserTokenCookie();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
const token = readUserTokenCookie();
if (token) {
  //console.log("token", token);
  store.dispatch("login/action_updateUserLastActivity");
}
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log("router =>", router.currentRoute.value.name);
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (
      router.currentRoute.value.name == appConstants.routes.CONVERSATION ||
      router.currentRoute.value.name == appConstants.routes.MESSAGING ||
      router.currentRoute.value.name == appConstants.routes.NEW_CONVERSATION
    ) {
      return Promise.reject(error);
    }
    if (
      error.response &&
      error.response.status == appConstants.api_response.UNAUTHORIZED
    ) {
      // session timed out | not authenticated
      //console.log("main.js error.response unauthorized");
      store.dispatch("login/logout");
      //window.location.href = "/login";
      router.push({ name: appConstants.routes.LOGIN });
      return Promise.reject(error);
    }

    if (
      error.response &&
      (error.response.status == appConstants.api_response.DELETED_PERMANENTLY ||
        error.response.status == appConstants.api_response.NOT_ACCEPTABLE ||
        error.response.status == appConstants.api_response.FORBIDDEN ||
        error.response.status == appConstants.api_response.NOT_FOUNT)
    ) {
      //Do not show any error message, we receive 410 in case user slug not found
      return Promise.reject(error);
    }

    if (error.response) {
      let message = "";
      if (error.response.data.message == "") {
        message = "Something went wrong";
      } else {
        message = error.response.data.message;
      }
      app.config.globalProperties.$toast.add({
        severity: appConstants.toast_severity.ERROR,
        summary: appConstants.toast_summary.ERROR,
        detail: message,
        life: 3000,
      });
      return Promise.reject(error);
    } else {
      app.config.globalProperties.$toast.add({
        severity: appConstants.toast_severity.ERROR,
        summary: appConstants.toast_summary.ERROR,
        detail: "Something went wrong",
        life: 3000,
      });
      return Promise.reject(error);
    }
  }
);

axios.interceptors.response.use((resp) => {
  let v = __APP_VERSION__;
  // console.log("v =>", v);
  if (v !== localStorage.getItem("vers") && resp.config.method == "get") {
    // console.log("in if");
    localStorage.setItem("vers", v);
    window.location.reload(); // For new version, simply reload on any get
  }
  return Promise.resolve(resp);
});
