import store from "/src/store/index.js";
import { uuid } from "vue3-uuid";
import {
  searchConversationFromList,
  messageSendFunction,
  newMessageSendFunction,
} from "../common/js/messagingFunctions.js";
import appConstants from "../appConstants.js";

// ============================ Android bridge function ==============================================
// test functions================
// export function getToastMessage() {
//   dsBridge.register("addValue", function () {
//     let str = "string from js";
//     return str;
//   });
// }

// export function testDMSend() {
//   dsBridge.registerAsyn(
//     "append",
//     function (arg1, arg2, arg3, responseCallback) {
//       console.log(arg1 + " " + arg2 + " " + arg3);
//       let res = "1";
//       responseCallback(res);
//     }
//   );
// }

// export function callSyn() {
//   //  console.log("callSyn start");
//   dsBridge.call("testSyn", "Vue call Native");
//   //  console.log("callSyn end");
// }

// test functions end ================
// send slug to native web view

export function sendSelectedUserSlugToAndroid(id) {
  dsBridge.call("openProfileHandler", id);
}

// sendUserDataToAndroid
export function sendUserDataToAndroid(data) {
  //  console.log("data =>", data);
  dsBridge.call("getConversationHandler", data);
}

// conversesationStatusToAndroid
export function conversesationStatusToAndroid(status) {
  console.log("conversesationStatusToAndroid =>", status);
  let response;
  if (status == "block") {
    response = true;
  } else if (status == "unblock") {
    response = false;
  }
  dsBridge.call("conversationStatus", response);
}

// messageQuery
export function messageQueryAndroid() {
  dsBridge.registerAsyn(
    "messageSearchQuery",
    function (data, responseCallback) {
      let receivedData = JSON.parse(data);
      let apiCall = {
        limit: 20,
        last_record_date: "",
        search_query: receivedData.query,
      };
      //console.log("apiCall =>", apiCall.search_query);

      searchConversationFromList(apiCall)
        .then((res) => {
          //console.log("data ->", res.data);
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
export function blockClick() {
  dsBridge.registerAsyn("block_chat", function (data, responseCallback) {
    let receivedData = JSON.parse(data);
    //  console.log("receivedData =>", receivedData.id);
    store
      .dispatch("messaging/action_blockConversation", receivedData.id)
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
export function unBlockClick() {
  dsBridge.registerAsyn("unblock_chat", function (data, responseCallback) {
    let receivedData = JSON.parse(data);
    //  console.log("receivedData =>", receivedData.id);
    store
      .dispatch("messaging/action_unblockConversation", receivedData.id)
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
export function deletelick() {
  dsBridge.registerAsyn("delete_chat", function (data, responseCallback) {
    let receivedData = JSON.parse(data);
    store
      .dispatch("messaging/action_deleteConversation", receivedData.id)
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

// send message
export function sendMessageAndroid() {
  //  console.log("in sendMessageAndroid !!!!");
  dsBridge.registerAsyn("send_message", function (data, responseCallback) {
    let receivedData = JSON.parse(data);
    //console.log("msg =>", receivedData.conversation_id, receivedData.message);
    if (receivedData.conversation_id) {
      //console.log("has conv. id");
      let msgData = {
        message: receivedData.message,
        type: appConstants.message_type.TEXT,
        conversation_id: receivedData.conversation_id, //uid
        tagged_users: [],
        attachment_id: [],
        confirmation_id: uuid.v1(),
        created_at: new Date(),
      };
      //  console.log("msgData =>", JSON.stringify(msgData));
      messageSendFunction(msgData)
        .then((res) => {
          //console.log("res =>", res);
          if (res) {
            var responseData = { success: true };
            responseCallback(responseData);
          }
        })
        .catch((error) => {
          var responseData = { success: false };
          responseCallback(responseData);
        });
    }

    if (receivedData.new_user_id) {
      //console.log("not conv. id");
      let msgData = {
        members: [],
        message: receivedData.message,
        confirmation_id: uuid.v1(),
        created_at: new Date(),
      };
      msgData.members.push(receivedData.new_user_id);
     //console.log("msgData =>", msgData.message);
      newMessageSendFunction(msgData)
        .then((res) => {
          //console.log("res =>", res);
          if (res) {
            var responseData = {
              success: true,
              conversation_id: res,
            };
            responseCallback(responseData);
          }
        })
        .catch((error) => {
          console.log("error", error);
          var responseData = {
            success: false,
          };
          responseCallback(responseData);
        });
    }
  });
}

// keyboard
export function hideKeyboard() {
  let data = true;
  dsBridge.call("hide_keyboard", data);
}

// data loaded success
export function dataLoadedSuccessAndroid(param) {
  var data = {
    success: true,
    data: param,
  };
  dsBridge.call("dataLoaded", data);
}
