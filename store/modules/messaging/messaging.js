import axios from "axios";
import { useLoading } from "vue-loading-overlay";
import { Conversation, Message } from "../../modelClasses/MessagingModel.js";
import { User } from "../../modelClasses/UserProfileModel.js";
import appConstants from "../../../appConstants"

const defaultState = () => {
  return {
    conversation_list: [], //list of conversation
    messages_of_conversation: [], //list of messages
    conversation_data: {}, //conversations whose messages in messages_of_conversation
    searched_users: [], //searched user to start new conversation
    unread_msg_count: 0,
    is_mobile: null,
    selected_conversation: null,
    bridgeSearch: false,
    messaging_media_mx_size : appConstants.MESSAGING_MEDIA_MAX_SIZE
  };
};

const state = defaultState();

const getters = {
  getter_conversation_list: (state) => state.conversation_list,
  getter_messages_of_conversation: (state) => state.messages_of_conversation,
  getter_conversation_data: (state) => state.conversation_data,
  getter_searched_users: (state) => state.searched_users,
  getter_unread_msg_count: (state) => state.unread_msg_count,
  getter_is_mobile: (state) => state.is_mobile,
  getter_selected_conversation: (state) => state.selected_conversation,
  getter_bridgeSearch: (state) => state.bridgeSearch,
  getter_messaging_media_mx_size : (state) => state.messaging_media_mx_size,
};

const mutations = {
  commit_bridgeSearch: (state, data) => {
    state.bridgeSearch = data;
  },

  commit_new_unsent_message: (state, data) => {
    // let msg_obj = new Message(data);
    // console.log("msg_obj to commit =>", data);
    state.messages_of_conversation.unshift(data);
  },

  commit_selected_conversation: (state, data) => {
    state.selected_conversation = data;
  },
  commit_conversation_list: (state, conversations_data) => {
    if (conversations_data.last_record_date == "") {
      state.conversation_list = [];
    }

    for (let chat of conversations_data.data.conversation) {
      let conv_obj = new Conversation(
        chat,
        conversations_data.data.users,
        conversations_data.data.users_last_messages
      );
      state.conversation_list.push(conv_obj);
      // for (let i = 0; i < 10; i++) {
      //   state.conversation_list.push(conv_obj);
      // }
    }
  },

  commit_deleteConversation: (state, conversation_id) => {
    let index = state.conversation_list.findIndex(
      (x) => x.uid == conversation_id
    );
    if (index > -1) {
      state.conversation_list.splice(index, 1);
    }
  },

  commit_fetchWithTimerNewConversation: (state, conversations_data) => {
    for (let chat of conversations_data.conversation) {
      let new_conversation_obj = new Conversation(
        chat,
        conversations_data.users,
        conversations_data.users_last_messages
      );

      let index = state.conversation_list.findIndex(
        (x) => x.uid == new_conversation_obj.uid
      );
      if (index < 0) {
        state.conversation_list.unshift(new_conversation_obj);
      } else {
        if (index > -1) {
          state.conversation_list.splice(index, 1);
          state.conversation_list.unshift(new_conversation_obj);
        }
      }
    }
  },

  commit_messages_of_conversation: (state, messages) => {
    if (messages.last_record_date == "") {
      state.messages_of_conversation = [];
      state.conversation_data = {};

      let conversation_obj = new Conversation(
        messages.data.conversation,
        messages.data.users,
        messages.data.users_last_messages
      );
      state.conversation_data = conversation_obj;
    }

    let msg_list = state.messages_of_conversation;
    for (let msg of messages.data.messages) {
      let msg_obj = new Message(msg, messages.data.users);

      let index = msg_list.findIndex((x) => x.uid == msg_obj.uid);
      if (index < 0) {
        msg_list.push(msg_obj);
      } else {
        msg_list[index] = msg_obj;
      }
    }

    state.messages_of_conversation = Message.addDateMessage(msg_list);

    //in conversation list set unread count to zero
    let index = state.conversation_list.findIndex(
      (x) => x.uid == messages.data.conversation.uid
    );
    if (index > -1) {
      //http://localhost:3000/messaging/conversation/6b27a291-6290-436a-b1e6-bc3f66937d67 on F5 got only object not a conversation object
      // if (state.conversation_list[index] instanceof Conversation) {
      //   state.conversation_list[index].setUnreadCountZero();
      // }

      Conversation.setUnreadCountZero(state.conversation_list[index]);
    }
  },

  commit_fetchWithTimerNewMessages: (state, messages) => {
    let msg_list = state.messages_of_conversation;
    for (let msg of messages.messages) {
      let msg_obj = new Message(msg, messages.users);

      let index = msg_list.findIndex((x) => x.uid == msg_obj.uid);
      if (index < 0) {
        msg_list.unshift(msg_obj);
      } else {
        msg_list[index] = msg_obj;
      }
    }

    state.messages_of_conversation = Message.addDateMessage(msg_list);
  },

  commit_new_message: (state, data) => {
    let msg_obj = new Message(data.data, state.conversation_data.users_list);
    state.messages_of_conversation.unshift(msg_obj);
    // for (let i = 0; i < 5; i++) {
    //   state.messages_of_conversation.push(msg_obj);
    // }

    state.messages_of_conversation = Message.addDateMessage(
      state.messages_of_conversation
    );
  },

  commit_blockConversation: (state, conversation_id) => {
    let index = state.conversation_list.find((x) => x.uid == conversation_id);
    if (index != undefined) {
      Conversation.blockConversation(index);
    }

    if (state.conversation_data.uid == conversation_id) {
      Conversation.blockConversation(state.conversation_data);
    }
  },

  commit_unblockConversation: (state, conversation_id) => {
    let index = state.conversation_list.find((x) => x.uid == conversation_id);
    if (index != undefined) {
      // console.log("index !");
      Conversation.unblockConversation(index);
    }

    if (state.conversation_data.uid == conversation_id) {
      // console.log("conversation_id", conversation_id);
      Conversation.unblockConversation(state.conversation_data);
    }
  },

  commit_reset_messaging_state: (state) => {
    state.messages_of_conversation = [];
    state.conversation_data = {};
  },

  commit_reset_Conversation_list: (state) => {
    state.conversation_list = [];
  },

  commit_is_mobile: (state, data) => {
    state.is_mobile = data;
  },

  commit_delete_message: (state, message) => {
    let msg_obj = new Message(message, state.conversation_data.users_list);
    let index = state.messages_of_conversation.findIndex(
      (x) => x.uid == msg_obj.uid
    );
    if (index > -1) {
      state.messages_of_conversation[index] = msg_obj;
    }
  },

  commit_onTopSet_conversation: (state, conversation_id) => {
    let index = state.conversation_list.findIndex(
      (x) => x.uid == conversation_id
    );
    if (index > -1) {
      let conversation = JSON.parse(
        JSON.stringify(state.conversation_list[index])
      );
      state.conversation_list.splice(index, 1);
      state.conversation_list.unshift(conversation);
    }
  },

  commit_searched_users: (state, users) => {
    state.searched_users = [];
    state.searched_users.length = 0;

    for (let i = 0; i < users.length; i++) {
      let user = new User(users[i]._source);
      state.searched_users.push(user);
    }
  },

  commit_acceptConversation: (state, conversation_id) => {
    let index = state.conversation_list.find((x) => x.uid == conversation_id);
    if (index != undefined) {
      Conversation.acceptConversation(index);
    }
  },

  commit_newConversationAdded: (state, newConversation) => {
    let conv_obj = new Conversation(
      newConversation.conversation,
      newConversation.users,
      newConversation.users_last_messages
    );
    state.conversation_list.unshift(conv_obj);
  },

  commit_unread_msg_count: (state, count) => {
    if (count < 0) {
      state.unread_msg_count = 0;
    } else {
      state.unread_msg_count = count;
    }
  },

  commit_reset_unread_message_count: (state, count) => {
    state.unread_msg_count = 0;
  },

  commit_messaging_media_mx_size :(state, sizeInBytes)=>{
    state.messaging_media_mx_size = sizeInBytes
  },

  //Add this mutation in every store module
  reset(state) {
    Object.assign(state, defaultState());
  },
};

const actions = {
  action_createNewConversation({ commit }, data) {
    return new Promise((resolve, reject) => {
      return axios
        .post(`/messaging/conversation/create/`, data)

        .then(function (response) {
          // console.log(
          //   "response.data.data.conversation.uid =>",
          //   response.data.data.conversation.uid
          // );
          let data = {
            conversation: response.data.data.conversation,
            users: response.data.data.users,
            users_last_messages: response.data.data.users_last_messages,
          };

          commit("commit_newConversationAdded", data);
          commit(
            "commit_selected_conversation",
            response.data.data.conversation.uid
          );
          resolve(response.data.data.conversation.uid);
        })
        .catch(function (error) {
          reject();
        });
    });
  },

  action_deleteConversation({ commit }, conversation_id) {
    return new Promise((resolve, reject) => {
      return axios
        .delete(`/messaging/conversation/delete/${conversation_id}/`)

        .then(function (response) {
          commit("commit_deleteConversation", response.data.data.uid);

          resolve(conversation_id);
        })
        .catch(function (error) {
          reject();
        });
    });
  },

  action_getConversationList({ commit }, data) {
    // console.log(data);
    return new Promise((resolve, reject) => {
      let query = `/messaging/conversation/all/?limit=${data.limit}&last_record_date=${data.last_record_date}`;
      if (data.search_query.trim() != "") {
        query = `/messaging/conversation/all/?limit=${data.limit}&last_record_date=${data.last_record_date}&search_str=${data.search_query}`;
      }
      return axios
        .get(query)
        .then(function (response) {
          commit("commit_conversation_list", {
            data: response.data.data,
            last_record_date: data.last_record_date,
          });
          let res = {
            last_record_date: response.data.data.last_record_date,
            next: response.data.data.next,
            last_fetch_dt: response.data.data.last_fetch_dt,
          };
          resolve(res);
        })
        .catch(function (error) {
          //loader.hide()
          commit("commit_post", "");
          reject();
        });
    });
  },

  action_acceptConversation({ commit }, conversation_id) {
    return new Promise((resolve, reject) => {
      return axios
        .patch(`/messaging/conversation/accept/${conversation_id}/`)
        .then(function (response) {
          // console.log(response);
          commit("commit_acceptConversation", conversation_id);
          resolve();
        })
        .catch(function (error) {
          reject();
        });
    });
  },

  action_blockConversation({ commit }, conversation_id) {
    return new Promise((resolve, reject) => {
      return axios
        .patch(`/messaging/conversation/block/${conversation_id}/`)
        .then(function (response) {
          commit(
            "commit_blockConversation",
            response.data.data.conversation_id
          );
          commit("commit_new_message", {
            data: response.data.data.message,
          });
          resolve();
        })
        .catch(function (error) {
          reject();
        });
    });
  },

  action_unblockConversation({ commit }, conversation_id) {
    return new Promise((resolve, reject) => {
      return axios
        .patch(`/messaging/conversation/unblock/${conversation_id}/`)
        .then(function (response) {
          commit(
            "commit_unblockConversation",
            response.data.data.conversation_id
          );
          commit("commit_new_message", {
            data: response.data.data.message,
          });
          resolve();
        })
        .catch(function (error) {
          reject();
        });
    });
  },

  action_getMessagesOfConversation({ commit }, data) {
    return new Promise((resolve, reject) => {
      return axios
        .get(
          `/messaging/message/all/${data.conversation_id}/?limit=${data.limit}&last_record_date=${data.last_record_date}`
        )
        .then(function (response) {
          commit("commit_messages_of_conversation", {
            data: response.data.data,
            last_record_date: data.last_record_date,
          });
          let res = {
            last_record_date: response.data.data.last_record_date,
            next: response.data.data.next,
            last_fetch_dt: response.data.data.last_fetch_dt,
          };
          resolve(res);
        })
        .catch(function (error) {
          //loader.hide()
          commit("commit_reset_messaging_state");
          reject();
        });
    });
  },

  action_fetchWithTimerNewConversation({ commit }, data) {
    return new Promise((resolve, reject) => {
      return axios
        .get(
          `/messaging/conversation/newconversations/?current_latest_record_date=${data.last_fetch_dt}`
        )
        .then(function (response) {
          let gotNewConversations = false;
          if (response.data.data.conversation.length > 0) {
            commit("commit_fetchWithTimerNewConversation", response.data.data);
            gotNewConversations = true;
          }
          let res = {
            last_fetch_dt: response.data.data.last_fetch_dt,
            isNewConversations: gotNewConversations,
          };
          resolve(res);
        })
        .catch(function (error) {
          reject();
        });
    });
  },

  action_fetchWithTimerNewMessagesOfConversation({ commit }, data) {
    return new Promise((resolve, reject) => {
      return axios
        .get(
          `/messaging/message/new/${data.conversation_id}/?last_record_date=${data.last_record_date}`
        )
        .then(function (response) {
          let gotNewMessages = false;
          if (response.data.data.messages.length > 0) {
            commit("commit_fetchWithTimerNewMessages", response.data.data);
            gotNewMessages = true;
          }
          let res = {
            last_fetch_dt: response.data.data.last_fetch_dt,
            isNewMessage: gotNewMessages,
          };
          resolve(res);
        })
        .catch(function (error) {
          reject();
        });
    });
  },

  action_checkConversationIsPresent({ commit }, partnerID) {
    return new Promise((resolve, reject) => {
      return axios
        .patch(`/messaging/conversation/existingconversation/${partnerID}/`)
        .then(function (response) {
          if (response.data.data.conversation == "") {
            commit("commit_reset_messaging_state");
            resolve(response);
          } else {
            commit("commit_messages_of_conversation", {
              data: response.data.data,
              last_record_date: "",
            });
            let res = {
              last_record_date: response.data.data.last_record_date,
              next: response.data.data.next,
            };
            resolve(res);
          }
        })
        .catch(function (error) {
          //loader.hide()
          commit("commit_reset_messaging_state");
          reject();
        });
    });
  },

  action_sendMessage({ commit }, data) {
    return new Promise((resolve, reject) => {
      return axios
        .post(`/messaging/message/create/`, data)
        .then(function (response) {
          commit("commit_new_message", {
            data: response.data.data,
          });
          commit("commit_onTopSet_conversation", data.conversation_id);
          resolve(response);
        })
        .catch(function (error) {
          // console.log(error);
          reject(error);
        });
    });
  },

  action_deleteMessage({ commit }, data) {
    return new Promise((resolve, reject) => {
      return axios
        .delete(
          `/messaging/message/delete/${data.message_id}/${data.conversation_id}`
        )
        .then(function (response) {
          commit("commit_delete_message", response.data.data);
          resolve();
        })
        .catch(function (error) {
          reject();
        });
    });
  },

  action_searchUser({ commit }, searchString) {
    return new Promise((resolve, reject) => {
      return axios
        .get(`/search/users/?q=${searchString}`)
        .then(function (response) {
          if (response.data.data.hits.hits.length > 0) {
            commit("commit_searched_users", response.data.data.hits.hits);
          } else {
            let arr = [
              {
                _source: {
                  first_name: "No Result Found",
                },
              },
            ];
            commit("commit_searched_users", arr);
          }

          resolve();
        })
        .catch(function (error) {
          commit("commit_searched_users", []);
          reject();
        });
    });
  },

  action_fetchUserTotalUnreadMessageCount({ commit }, searchString) {
    // commit("commit_unread_msg_count", "20");
    return new Promise((resolve, reject) => {
      return axios
        .get(`/messaging/user/unreadcount/`)
        .then(function (response) {
          commit("commit_unread_msg_count", response.data.data.unread_count);
          // console.log(response.data.data.unread_count);
          if (response.data.data.unread_count > 0) {
            resolve(true);
          }
          resolve(false);
        })
        .catch(function (error) {
          commit("commit_unread_msg_count", 0);
          reject();
        });
    });
  },

  action_resetUserTotalUnreadMessageCount({ commit }) {
    // console.log("action_resetUserTotalUnreadMessageCount");
    return new Promise((resolve, reject) => {
      return axios
        .post(`/messaging/user/resetunreadcount/`)
        .then(function (response) {
          commit("commit_reset_unread_message_count");
          resolve();
        })
        .catch(function (error) {
          // console.log("error =>", error);
          commit("commit_reset_unread_message_count", 0);
          reject();
        });
    });
  },


  action_fetchMessagingMediaMaxSize({ commit }) {
    return new Promise((resolve, reject) => {
      return axios
        .get(
          "/messaging/message/max_media_size/"
        )
        .then(function (response) {
          commit("commit_messaging_media_mx_size", response.data.data.media_size);
          resolve();
        })
        .catch(function (error) {
          commit("commit_messaging_media_mx_size", appConstants.MESSAGING_MEDIA_MAX_SIZE);
          resolve();
        });
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
