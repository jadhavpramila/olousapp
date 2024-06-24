import store from "/src/store/index.js";
import { uuid } from "vue3-uuid";
import {
  searchConversationFromList,
  messageSendFunction,
  newMessageSendFunction,
} from "../common/js/messagingFunctions.js";
import appConstants from "../appConstants.js";

// ========================================= global variables ===========================================
let iosBridge;

// ================================ios bridge functions =============================================
export function connectWithIOS() {
  // alert("connectWithIOS fucntion");
  let tokenFromApp;
  setupWKWebViewJavascriptBridgeForIOS(function (bridge) {
    // alert("in setupWKWebViewJavascriptBridge() in mounted");
    iosBridge = bridge;
    // alert("Bridge established");
    bridge.registerHandler("jsHandler", function (data) {
      tokenFromApp = data.token;
      //console.log("tokenFromApp from ios =>", tokenFromApp);
    });
  });
  return true;
}

function setupWKWebViewJavascriptBridgeForIOS(callback) {
  // alert("create Bridge");
  if (window.WKWebViewJavascriptBridge) {
    return callback(WKWebViewJavascriptBridge);
  }
  if (window.WKWVJBCallbacks) {
    return window.WKWVJBCallbacks.push(callback);
  }
  window.WKWVJBCallbacks = [callback];
  window.webkit.messageHandlers.iOS_Native_InjectJavascript.postMessage(null);
}
// not using
export function CloseIosWebView() {
 // console.log("in CloseWebView");
  // alert("CloseWebView call ios bridge");
  if (iosBridge == null) {
  //  console.log("iosBridge is null");
    // alert("iosBridge is null");
  } else {
    // alert("iosBridge is not null");

    iosBridge.callHandler(
      "closeHandler",
      { string: "close webview" },
      function () {}
    );
  }
}

export function sendSelectedUserSlugToIOS(id) {
  // console.log("in sendSelectedUserSlugToIOS");
  iosBridge.callHandler("openProfileHandler", { id: id }, function () {});

  // IosBridge.openProfileHandler();
  return true;
}

export function sendUserDataToIOS(data) {
  iosBridge.callHandler(
    "getConversationHandler",
    { data: data },
    function () {}
  );

  // IosBridge.openProfileHandler();
  return true;
}

// Conversation status
export function conversationStatusSendToIOS(status) {
  // console.log(status);
  var responseData;
  if (status == "block") {
    responseData = true;
  } else if (status == "unblock") {
    responseData = false;
  }
  iosBridge.callHandler(
    "conversationStatus",
    { status: responseData },
    function () {}
  );
}

// messageSearchQuery
export function messageSearchQuery() {
  iosBridge.registerHandler(
    "messageSearchQuery",
    function (data, responseCallback) {
      var query = JSON.stringify(data);
     // console.log("d=>", query);
      let apiCall = {
        limit: 20,
        last_record_date: "",
        search_query: data.query,
      };

      searchConversationFromList(apiCall)
        .then((res) => {
          if (res.data.users.length == 0) {
            store.commit("messaging/commit_bridgeSearch", true);
          }
          var responseData = { success: true };
          responseCallback(responseData);
        })
        .catch((error) => {
          var responseData = { success: false };
          responseCallback(responseData);
        });
    }
  );
}

// block_chat
export function IosBlockClick() {
  iosBridge.registerHandler("block_chat", function (data, responseCallback) {
    store
      .dispatch("messaging/action_blockConversation", data.id)
      .then(() => {
        var responseData = { success: true };
        responseCallback(responseData);
      })
      .catch((error) => {
        var responseData = { success: false };
        responseCallback(responseData);
      });
  });
}

// unblock_chat
export function IosUnBlockClick() {
  iosBridge.registerHandler("unblock_chat", function (data, responseCallback) {
    store
      .dispatch("messaging/action_unblockConversation", data.id)
      .then(() => {
        var responseData = { success: true };
        responseCallback(responseData);
      })
      .catch((error) => {
        var responseData = { success: false };
        responseCallback(responseData);
      });
  });
}

// delete_chat
export function IosDeletelick() {
  iosBridge.registerHandler("delete_chat", function (data, responseCallback) {
    store
      .dispatch("messaging/action_deleteConversation", data.id)
      .then(() => {
        var responseData = { success: true };
        responseCallback(responseData);
      })
      .catch((error) => {
        var responseData = { success: false };
        responseCallback(responseData);
      });
  });
}

// iosSendMessage
export function IosSendMessage() {
  alert("in IosSendMessage fucntion");
  alert(iosBridge);
  iosBridge.registerHandler(
    "iosSendMessage",
    function (data, responseCallback) {
      alert("in msg call ");
      if (data.conversation_id) {
        let msgData = {
          message: data.message,
          type: appConstants.message_type.TEXT,
          conversation_id: data.conversation_id, //uid
          tagged_users: [],
          attachment_id: [],
          confirmation_id: uuid.v1(),
          created_at: new Date(),
        };

        messageSendFunction(msgData)
          .then((res) => {
            // console.log("res =>", res);
            if (res) {
              var responseData = { success: true };
              responseCallback(responseData);
            }
          })
          .catch((error) => {
            // alert(error);
            var responseData = { success: false };
            responseCallback(responseData);
          });
      } else {
        alert("in msg call else new user");
        if (!iosBridge) {
          alert("create Bridge before new msg sent");
          setupWKWebViewJavascriptBridgeForIOS(function (bridge) {
            iosBridge = bridge;
          });
        }
        let msgData = {
          members: [],
          message: data.message,
          confirmation_id: uuid.v1(),
          created_at: new Date(),
        };
        msgData.members.push(data.new_user_id);

        newMessageSendFunction(msgData)
          .then((res) => {
            if (res) {
              var responseData = {
                success: true,
                conversation_id: res,
              };
              responseCallback(responseData);
            }
          })
          .catch((error) => {
            var responseData = { success: false };
            responseCallback(responseData);
          });
      }
    }
  );
}

// scroll to bottom
// export function IosScrollToBottom() {
//   // string = true;
//   iosBridge.callHandler("scrollToBottom", { data: true }, function () {});
// }

// hide keyboard
export function IosHideKeyboard() {
  var responseData = { success: true };
  // alert("call hideKeyboard");
  iosBridge.callHandler("hideKeyboard", { data: responseData }, function () {});
}

// data loaded success
export function dataLoadedSuccessIos(param) {
  var responseData = { success: true, data: param };
  // alert("call hideKeyboard");
  iosBridge.callHandler("dataLoaded", { data: responseData }, function () {});
}
