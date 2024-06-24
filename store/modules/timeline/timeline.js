import axios from "axios";
import {
  Post,
  GetPostListFromAPIResponse,
} from "../../modelClasses/PostModel.js";
import { data } from "browserslist";
import { Timeline } from "../../modelClasses/TimelineModel.js";

const defaultState = () => {
  return {
    // postData : {
    posts: [],
    total_posts: 0,
    like_list: [],
    userBasicData: "",
    scrollBarPosition: 0,
    timelineData: [],
    timelineSeeAllData: [],
    // }
  };
};

const state = defaultState();

const getters = {
  //   getter_getData: (state) => state.data,
  getter_postData: (state) => state.posts,
  getter_totalPosts: (state) => state.total_posts,
  getter_likeList: (state) => state.like_list,
  getter_userBasicData: (state) => state.userBasicData,
  getter_scrollBarPosition: (state) => state.scrollBarPosition,
  getter_timelineData: (state) => state.timelineData,
  getter_timelineSeeAllData: (state) => state.timelineSeeAllData,
};

const mutations = {
  commit_PostData: (state, feedData) => {
    // console.log(feedData.postData);
    let res = {};
    res = new GetPostListFromAPIResponse(feedData.postData);

    if (feedData.page == 1) {
      // console.log("in if", res);
      state.posts = [];
      for (let post of res.posts) {
        // console.log(post);
        if (!state.posts.includes(post)) {
          state.posts.push(post);
        }
        // state.posts.push(post);
      }
      // console.log(res);
      state.total_posts = res.total_posts;
    } else {
      // console.log("in else", res);
      for (let post of res.posts) {
        // console.log(post);
        if (!state.posts.includes(post)) {
          state.posts.push(post);
        }
      }
      // console.log(res);
      state.total_posts = res.total_posts;
    }
    // console.log(state.posts);
    // state.total_posts = res.total_posts;
    // state.next_path = res.next_path;
  },
  commit_like: (state, data) => {
    // console.log("commit_like =>", data);
    state.posts.find((option) => {
      if (option.id == data.id) {
        // console.log("in if ");
        option.like_id.id = data.response.id;
        option.like_id.is_deleted = data.response.is_deleted;
        option.numberOfLikes = option.numberOfLikes + 1;
      }
    });
  },
  commit_unlike: (state, data) => {
    // console.log("data in commiy_unlike =>", data);
    state.posts.find((option) => {
      if (option.id == data) {
        option.like_id.id = "";
        option.like_id.is_deleted = true;
        option.numberOfLikes = option.numberOfLikes - 1;
      }
    });
  },
  commit_likeList: (state, data) => {
    // state.like_list.push(data);
    if (data.page == 1) {
      // console.log("in if", data.response);
      state.like_list = [];
      for (let list of data.response) {
        state.like_list.push(list);
      }
    } else {
      // console.log("in else", data.response);
      for (let list of data.response) {
        state.like_list.push(list);
      }
    }
  },
  commit_unfollow: (state, data) => {
    // console.log("state =>", state.like_list);
    // console.log(data);
    state.like_list.find((option) => {
      if (option.author.id == data) {
        option.author.is_following = false;
        // console.log(option);
      }
    });
  },
  commit_follow: (state, data) => {
    // console.log("state =>", state.like_list);
    // console.log(data);
    state.like_list.find((option) => {
      if (option.author.id == data) {
        option.author.is_following = true;
        // console.log(option);
      }
    });
  },
  commit_followFromTimeline: (state, data) => {
    console.log("data commit_followFromTimeline =>", data);
    // console.log(data);
    // let obj = [];
    // obj.push(data);
    // console.log("obj =>", obj);
    // let pushData =  window.sessionStorage.getItem("followIds");
    // pushData.push(data);
    // console.og(pushData);
    // let user = sessionStorage.getItem("followIds");
    // var user = JSON.parse(localStorage.getItem("followIds"));
    // console.log("session users in timeline.js=>", user);
    state.posts.find((option) => {
      if (option.author.id == data) {
        option.author.is_following = true;
        // console.log(option);
      }
    });
  },
  commit_scrollBarPosition: (state, data) => {
    state.scrollBarPosition = data;
  },

  // commit_UserBasicData: (state, userBasicData) => {

  //   state.userBasicData = userBasicData

  // },
  commit_timelineData: (state, data) => {
    state.timelineData = [];
    let arr = [];
    if (data.timeline != null) {
      //console.log("data=>", data.timeline);
      for (let singleCompanyObject of data.timeline) {
        let singleObject = new Timeline(singleCompanyObject);
        arr.push(singleObject);
      }
    }
    //state.timelineData = arr.reverse();
    state.timelineData = arr;
  },
  commit_timelineSeeAllData: (state, data) => {
    state.timelineSeeAllData = [];
    let arr = [];
    if (data.timeline != null) {
      //console.log("data=>", data.timeline);
      for (let singleCompanyObject of data.timeline) {
        let singleObject = new Timeline(singleCompanyObject);
        arr.push(singleObject);
      }
    }
    //state.timelineData = arr.reverse();
    state.timelineSeeAllData = arr;
  },
  reset(state) {
    Object.assign(state, defaultState());
  },
};

const actions = {
  action_getPostData({ commit }, data) {
    // console.log(data.page);
    // old timeline api
    // let apiQuery = `/feeds/?limit=${data.limit}&offset=${data.offset}&page=${data.page}`;
    // new timeline api
    // https://content.olous.app/api/v1/timeline/?limit=10&offset=0&page=1
    return new Promise((resolve, reject) => {
      return axios
        .get(
          `/timeline/?limit=${data.limit}&offset=${data.offset}&page=${data.page}`
        )
        .then(function (response) {
          // console.log("then");
          let obj = {
            page: data.page,
            postData: response.data.results,
          };
          // console.log(obj);
          commit("commit_PostData", obj);
          let res = {
            currentPage: data.page,
            next: response.data.next,
          };
          resolve(res);
        })
        .catch(function (error) {
          console.log(error.message);
          let obj = {
            page: data.page,
            postData: null,
          };
          commit("commit_PostData", obj);
          reject();
        });
    });
  },
  action_likePost({ commit }, data) {
    // console.log("object in timeline =>", data);ss
    return new Promise((resolve, reject) => {
      this.dispatch("post/likePost", data)
        .then(function (response) {
          // console.log("response in timeline", response);
          commit("commit_like", response);
          resolve();
        })
        .catch(function (error) {
          console.log(error);
          reject();
        });
    });
  },
  action_unlike({ commit }, data) {
    // console.log(data);
    return new Promise((resolve, reject) => {
      this.dispatch("post/unlikePost", data)
        .then(function (response) {
          // console.log("commit_unlike response in timeline", response);
          commit("commit_unlike", data.post_id);
          resolve();
        })
        .catch(function (error) {
          console.log(error);
          reject();
        });
    });
  },
  action_reportPost({ commit }, data) {
    // console.log(data);
    return new Promise((resolve, reject) => {
      return axios
        .post(`posts/report/`, data)
        .then(function (response) {
          console.log(response);
          resolve(response.data);
        })
        .catch(function (error) {
          console.log(error);
          reject(error.response);
        });
    });
  },
  action_likeListofPost({ commit }, data) {
    // console.log(data);
    // https://api.dev.olous.app/api/v1/like/list/?object_id=21ac78f2-7a92-4da6-b675-64a137047901&offset=0&limit=20
    return new Promise((resolve, reject) => {
      return axios
        .get(
          `like/list/?object_id=${data.id}&offset=${data.offset}&limit=${data.limit}`
        )
        .then(function (response) {
          // console.log(response);
          // console.log(data.limit);
          let obj = {
            response: response.data.results.data,
            next: response.data.next,
            page: data.page,
          };
          commit("commit_likeList", obj);
          resolve(obj);
          // commit("commit_likeList", response.data.data);
        })
        .catch(function (error) {
          console.log(error);
          reject();
        });
    });
  },
  action_unfollowUser({ commit }, id) {
    return new Promise((resolve, reject) => {
      this.dispatch("post/unfollow", id)
        .then(function (response) {
          // console.log("response", response);
          commit("commit_unfollow", response);
          resolve(response);
        })
        .catch(function (error) {
          console.log(error);
          reject();
        });
    });
  },
  action_followUser({ commit }, data) {
    return new Promise((resolve, reject) => {
      this.dispatch("post/follow", data)
        .then(function (response) {
          // console.log("response", response);
          commit("commit_follow", response);
          resolve();
        })
        .catch(function (error) {
          console.log(error);
          reject();
        });
    });
  },
  action_followUserFromTimeline({ commit }, data) {
    return new Promise((resolve, reject) => {
      this.dispatch("post/follow", data)
        .then(function (response) {
          // console.log("response", response);
          commit("commit_followFromTimeline", response);
          resolve();
        })
        .catch(function (error) {
          console.log(error);
          reject();
        });
    });
  },
  action_getTimelineData({ commit }, data) {
    return new Promise((resolve, reject) => {
      return axios
        .get(`/vendors/timeline/?q=1`)
        .then(function (response) {
          commit("commit_timelineData", response.data.data);
          resolve(response.data.data);
        })
        .catch(function (error) {
          console.log(error.message);
          reject();
        });
    });
  },
  action_saveTimelineSeeAllApi({ commit }, data) {
    //console.log("see all api", data);
    return new Promise((resolve, reject) => {
      return axios
        .get(data.api)
        .then(function (response) {
          commit("commit_timelineSeeAllData", response.data.data);
          //console.log("response.data.data =>", response.data.data);
          resolve(response.data.data);
        })
        .catch(function (error) {
          console.log(error.message);
          reject();
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
