import store from "/src/store/index.js";

export function searchConversationFromList(data) {
  return new Promise((resolve, reject) => {
    store
      .dispatch("messaging/action_getConversationList", data)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        // console.log("error =>", error);
        reject(error);
      });
  });
}

// send message
export function messageSendFunction(data) {
  // console.log("send msg =>", data.conversation_id);
  return new Promise((resolve, reject) => {
    store
      .dispatch("messaging/action_sendMessage", data)
      .then((res) => {
        // console.log("api response =>", res);
        resolve(res);
      })
      .catch((error) => {
        // console.log("error =>", error);
        reject(error);
      });
  });
}

// newMessageSendFunction
export function newMessageSendFunction(data) {
  return new Promise((resolve, reject) => {
    store
      .dispatch("messaging/action_createNewConversation", data)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
