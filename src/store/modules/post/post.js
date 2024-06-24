import axios from "axios";
import { useLoading } from "vue-loading-overlay";
import {
  Post,
  GetPostListFromAPIResponse,
} from "../../modelClasses/PostModel.js";
import { User } from "../../modelClasses/UserProfileModel.js";

import {
  addValueToSession,
  removeValueFromSession,
} from "../../../common/js/handleFollowSession.js";

const defaultState = () => {
  return {
    post: "",
    suggestions: "",
  };
};

const state = defaultState();

const getters = {
  getter_post: (state) => state.post,
  getter_SuggestionsPost: (state) => state.suggestions,
};

const mutations = {
  commit_post: (state, postData) => {
    // // console.log("post data in commit =>", postData);
    state.post = new Post(postData);
    //state.post = postData;
    // let res = new GetPostListFromAPIResponse(postData);
    // // console.log("rres=>", res);
    // for (let post of res.posts) {
    //   state.post.push(post);
    // }
    // // console.log("state.post =>", state.post);
    // state.post = res;
  },
  commit_directObject_post: (state, postData) => {
    state.post = postData;
  },
  commit_SuggestionsPost: (state, postData) => {
    // state.suggestions = data;
    state.suggestions = [];

    for (let post of postData.posts) {
      let post_object = new Post(post);

      //set author data
      var user = postData.authors.filter(function (el) {
        return el.id == post.author;
      });

      if (user.length > 0) {
        let userObj = new User(user[0]);
        post_object.author = userObj;
      }

      state.suggestions.push(post_object);
    }
  },
  commit_likePost: (state, data) => {
    // // console.log(data);
    state.post.like_id.id = data.response.id;
    state.post.like_id.is_deleted = data.response.is_deleted;
    state.post.numberOfLikes = state.post.numberOfLikes + 1;
  },
  commit_unlikePost: (state, data) => {
    // // console.log(state.post);
    state.post.like_id.id = "";
    state.post.like_id.is_deleted = true;
    state.post.numberOfLikes = state.post.numberOfLikes - 1;
  },

  //Add this mutation in every store module
  reset(state) {
    Object.assign(state, defaultState());
  },
};

const actions = {
  action_fetchPost({ commit }, postid) {
    // // console.log("post id", postid);
    // const $loading = useLoading()
    // let loader = $loading.show()
    // https://content.olous.app/api/v1/timeline/decrypt_ext_share_post/?post={postID}
    // https://content.olous.app/api/v1/posts/external_share/?post=tx4MkUyPI9Tz2eJoCNcpTg
    return new Promise((resolve, reject) => {
      return axios
        .get(`/timeline/decrypt_ext_share_post/?post=${postid}`)
        .then(function (response) {
          let data = new GetPostListFromAPIResponse(response.data.results.data);
          if (data) {
            // // console.log("post data befor commit =>", data.posts[0]);
            commit("commit_directObject_post", data.posts[0]);
            resolve();
            //loader.hide()
          }
        })
        .catch(function (error) {
          //loader.hide()
          commit("commit_post", "");
          reject();
        });
    });
  },

  action_fetchDocument({ commit }, documentId) {
    // const $loading = useLoading()
    // let loader = $loading.show()
    return new Promise((resolve, reject) => {
      return axios
        .get(`/document/external_share/?document=${documentId}`)
        .then(function (response) {
          commit("commit_post", response.data.results.data);
          resolve();
          //loader.hide()
        })
        .catch(function (error) {
          //loader.hide()
          commit("commit_post", "");
          reject();
        });
    });
  },

  action_fetchHeadlines({ commit }, headlineId) {
    // const $loading = useLoading()
    // let loader = $loading.show()
    return new Promise((resolve, reject) => {
      return axios
        .get(`/headline/external_share/?headline=${headlineId}`)
        .then(function (response) {
          commit("commit_post", response.data.results.data);
          resolve();
          //loader.hide()
        })
        .catch(function (error) {
          //loader.hide()
          commit("commit_post", "");
          reject();
        });
    });
  },

  action_getSuggestionsPost({ commit }, id) {
    // const $loading = useLoading()
    // let loader = $loading.show()
    return new Promise((resolve, reject) => {
      return axios
        .get(`/timeline/related_posts/?post=${id}&page=1&offset=0&limit=9`)
        .then(function (response) {
          commit("commit_SuggestionsPost", response.data.results.data);
          resolve();
          //loader.hide()
        })
        .catch(function (error) {
          //loader.hide()
          commit("commit_post", "");
          reject();
        });
    });
  },
  action_postLike({ commit }, data) {
    // // console.log("object in timeline =>", data);
    return new Promise((resolve, reject) => {
      this.dispatch("post/likePost", data)
        .then(function (response) {
          // // console.log("response in timeline",response);
          commit("commit_likePost", response);
          resolve();
        })
        .catch(function (error) {
          // console.log(error);
          reject();
        });
    });
  },
  action_postUnlike({ commit }, data) {
    // // console.log(data);
    return new Promise((resolve, reject) => {
      this.dispatch("post/unlikePost", data)
        .then(function (response) {
          // // console.log("commit_unlike response in timeline",response);
          commit("commit_unlikePost", response);
          resolve();
        })
        .catch(function (error) {
          // console.log(error);
          reject();
        });
    });
  },
  likePost({ commit }, data) {
    // // console.log("data in likePost() api call =>",data);
    // const $loading = useLoading();
    // let loader = $loading.show();
    return new Promise((resolve, reject) => {
      return axios
        .post(`/like/`, data)
        .then(function (response) {
          // console.log("response after api call in post.js  =>",response.data);
          let obj = {
            id: data.post_id,
            response: response.data.results.data,
          };
          // addValueToSession(data.post_id);
          // commit("commit_likePost", obj);
          // this.dispatch("resetAllStoreState", { root: true });
          resolve(obj);
          // loader.hide();
        })
        .catch(function (error) {
          // loader.hide();
          // console.log(error);
          reject();
        });
    });
  },

  unlikePost({ commit }, data) {
    // // console.log(data);
    // const $loading = useLoading();
    // let loader = $loading.show();
    return new Promise((resolve, reject) => {
      return axios
        .delete(`/like/${data.like_id}/`)
        .then(function (response) {
          // // console.log( data.post_id);
          // removeValueToSession(data.post_id);
          resolve(data.post_id);
          // loader.hide();
        })
        .catch(function (error) {
          // loader.hide();
          // console.log(error);
          reject();
        });
    });
  },
  // unfollow
  unfollow({ commit }, id) {
    return new Promise((resolve, reject) => {
      return axios
        .post(`users/${id}/unfollow/`)
        .then(function (response) {
          removeValueFromSession(id);
          resolve(id);
        })
        .catch(function (error) {
          // console.log(error);
          reject();
        });
    });
  },
  // follow
  follow({ commit }, data) {
    // // console.log(data);
    return new Promise((resolve, reject) => {
      return axios
        .post(`users/${data.id}/follow/`, data.data)
        .then(function (response) {
          addValueToSession(data.id);
          resolve(data.id);
        })
        .catch(function (error) {
          // console.log(error);
          reject();
        });
    });
  },

  action_savePost({ commit }, data) {
    // // console.log(data);
    const $loading = useLoading();
    let loader = $loading.show();
    return new Promise((resolve, reject) => {
      return axios
        .post(`/timeline/post/`, data)
        .then(function (response) {
          // // console.log(response.data);
          resolve(response.data);
          loader.hide();
        })
        .catch(function (error) {
          loader.hide();
          // console.log(error);
          reject();
        });
    });
  },

  // action_getImageFromUrl
  action_getImageFromUrl({ commit }, data) {
    // console.log(data);
    const $loading = useLoading();
    let loader = $loading.show();
    return new Promise((resolve, reject) => {
      return axios
        .post(`/scrape_site/`, data)
        .then(function (scrapimage_response) {
          // // console.log("scrach response =>", response.data.data.images[0]);
          let obj = {
            image_url: scrapimage_response.data.data.images[0],
          };
          // resolvedData = new Promise((resolve, reject) => {
          return axios
            .post(`/media/from_url/`, obj)
            .then(function (response) {
              // console.log(response);
              // resolvedData = response.data.data;
              // return response.data.data
              var result = {
                URL_title: scrapimage_response.data.data.title,
                file: response.data.results,
              };
              resolve(result);
              loader.hide();
            })
            .catch(function (error) {
              // console.log(error);
              reject();
              loader.hide();
            });
          // });
          // // console.log("resolvedData =>",resolvedData)
          // resolve(resolvedData);
          // loader.hide();
        })
        .catch(function (error) {
          loader.hide();
          // console.log(error);
          reject();
        });
    });
  },

  // image object get
  // action_getImageObject({ commit }, data) {
  //   // console.log(data);
  //   const $loading = useLoading();
  //   let loader = $loading.show();
  //   return new Promise((resolve, reject) => {
  //     return axios
  //       .post(`/media/from_url/`, data)
  //       .then(function (response) {
  //         // console.log(response.data);
  //         resolve(response.data);
  //         loader.hide();
  //       })
  //       .catch(function (error) {
  //         loader.hide();
  //         // console.log(error);
  //         reject();
  //       });
  //   });
  // },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
