<template>
  <div
    v-if="activeSpin"
    class="form-container h-full w-full items-center align-middle"
  >
    <Spinner />
  </div>
</template>

<script>
import appConstants from "../appConstants.js";
import Spinner from "./common/Spinner.vue";
import { mapGetters, mapActions } from "vuex";
import {
  createUserTokenCookie,
  readUserTokenCookie,
} from "../common/js/UserToken.js";

export default {
  name: "iosbridge",
  components: {
    Spinner,
  },

  mounted() {
    this.activeSpin = true;
    // console.log("dataFromIos =>", dataFromIos);
    var self = this;
    self.setupWKWebViewJavascriptBridge(function (bridge) {
      // alert("in setupWKWebViewJavascriptBridge() in mounted");

      bridge.registerHandler("jsHandler", function (data) {
        // create token
        createUserTokenCookie(data.token);

        // route to messaging
        self.$router.push({
          name: appConstants.routes.MESSAGING,
        });
      });
    });
  },

  methods: {
    ...mapGetters("login", ["getter_isUserLoggedIn"]),
    ...mapActions("login", ["logout"]),

    setupWKWebViewJavascriptBridge(callback) {
      if (window.WKWebViewJavascriptBridge) {
        return callback(WKWebViewJavascriptBridge);
      }
      if (window.WKWVJBCallbacks) {
        return window.WKWVJBCallbacks.push(callback);
      }
      window.WKWVJBCallbacks = [callback];
      window.webkit.messageHandlers.iOS_Native_InjectJavascript.postMessage(
        null
      );
    },
  },

  unmounted() {
    this.activeSpin = false;
  },
};
</script>

<style>
.align-middle {
  margin-top: 20rem !important;
}
</style>
