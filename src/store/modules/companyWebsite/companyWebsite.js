import axios from "axios";
import {
  Post,
  GetPostListFromAPIResponse,
} from "../../modelClasses/PostModel.js";
import { company } from "../../modelClasses/CompanyModel.js";

const defaultState = () => {
  return {
    companyData: "",
    activityData: "",
    companyProductData: "",
    followUnfollowStatusData: "",
    UnfollowStatusData: "",
    total_posts: 0,
    // next_path: 1,
  };
};

const state = defaultState();

const getters = {
  getter_CompanyData: (state) => state.companyData,
  getter_ActivityData: (state) => state.activityData,
  getter_CompanyProductData: (state) => state.companyProductData,
  getter_FollowUnfollowStatus: (state) => state.followUnfollowStatusData,
  getter_UnfollowStatus: (state) => state.UnfollowStatusData,
  getter_FollowStatus: (state) => state.FollowStatusData,
  getter_totalPosts: (state) => state.total_posts,
  // getter_nextPath: (state) => state.next_path,
};

const mutations = {
  commit_companyData: (state, companyData) => {
    //console.log("companyData", companyData)
    let company_object = {};
    company_object = new company(companyData);
    //console.log("res", res)
    state.companyData = company_object;
  },
  commit_activityData: (state, data) => {
    let res = {};
    res = new GetPostListFromAPIResponse(data.postData);

    if (data.page == 1) {
      // console.log("in if", res);
      state.activityData = [];
      for (let post of res.posts) {
        if (!state.activityData.includes(post)) {
          state.activityData.push(post);
        }
        // state.activityData.push(post);
      }
      //console.log("IN IF",res.next_path);
      state.total_posts = res.total_posts;
      // state.next_path = res.next_path;
    } else {
      // console.log("in else", res);
      for (let post of res.posts) {
        if (!state.activityData.includes(post)) {
          state.activityData.push(post);
        }
        // state.activityData.push(post);
      }
      // console.log(res);
      state.total_posts = res.total_posts;
      // state.next_path = res.next_path;
    }
    // console.log(data)
    //  if (data.page == 1) {
    //   state.activityData = [];
    //   for (var i = 0; i < data.results?.length; i++) {
    //     state.activityData.push(new Post(data.results[i]));
    //   }
    //  }else{
    //   for (var i = 0; i < data.results?.length; i++) {
    //     state.activityData.push(new Post(data.results[i]));
    //   }
    // }
  },
  commit_companyProductData: (state, companyProductData) => {
    let company_product_object = new company(companyProductData);
    state.companyProductData = company_product_object;
  },
  commit_followUnfollowStatus: (state, followUnfollowStatusData) => {
    state.followUnfollowStatusData = followUnfollowStatusData;
  },
  commit_UnfollowStatus: (state, UnfollowStatusData) => {
    state.UnfollowStatusData = UnfollowStatusData;
  },
  commit_FollowStatus: (state, FollowStatusData) => {
    state.FollowStatusData = FollowStatusData;
  },
  commit_like: (state, data) => {
    // console.log(state.activityData);
    state.activityData.find((option) => {
      if (option.id == data.id) {
        option.like_id.id = data.response.id;
        option.like_id.is_deleted = data.response.is_deleted;
        option.numberOfLikes = option.numberOfLikes + 1;
      }
    });
  },
  commit_unlike: (state, data) => {
    // console.log("before", state.activityData);
    state.activityData.find((option) => {
      if (option.id == data) {
        // console.log(option)
        option.like_id.id = "";
        option.like_id.is_deleted = true;
        option.numberOfLikes = option.numberOfLikes - 1;
      }
    });
    //console.log("After", state.activityData);
  },
  //Add this mutation in every store module
  reset(state) {
    Object.assign(state, defaultState());
  },
};

const actions = {
  action_getCompanyData({ commit }, slugValue) {
    return new Promise((resolve, reject) => {
      return axios
        .get(`/vendors/sluginfo/?slug=${slugValue}`)
        .then(function (response) {
          commit("commit_companyData", response.data.data);
          resolve();
          //loader.hide()
        })
        .catch(function (error) {
          //loader.hide()
          commit("commit_companyData", "");
          reject();
        });
    });
  },
  action_getActivityData({ commit }, data) {
    // old api
    //  `https://content.olous.app/api/v1/posts/of_user/?author=${data.id}&limit=${data.limit}&offset=${data.offset}&page=${data.page}`
    return new Promise((resolve, reject) => {
      return axios
        .get(
          `/timeline/activities/?slug=${data.slug}&page=${data.page}&limit=${data.limit}&offset=${data.offset}`
        )
        .then(function (response) {
          // console.log( "response in store =>",response.data)
          let obj = {
            page: data.page,
            postData: response.data.results,
          };
          //console.log("obj",obj)
          commit("commit_activityData", obj);
          let res = {
            currentPage: data.page,
            next: response.data.next,
          };
          resolve(res);
          //loader.hide()
        })
        .catch(function (error) {
          //loader.hide()
          let obj = {
            page: data.page,
            postData: null,
          };
          commit("commit_activityData", obj);
          reject();
        });
    });
  },
  action_getCompanyProductData({ commit }, productData) {
    //console.log(productData)
    return new Promise((resolve, reject) => {
      return axios
        .post("vendors/company/getSingleProduct/", productData)
        .then(function (response) {
          commit("commit_companyProductData", response.data.data);
          resolve();
          //loader.hide()
        })
        .catch(function (error) {
          //loader.hide()
          commit("commit_companyProductData", "");
          reject();
        });
    });
  },

  action_getFollowUnfollowStatus({ commit }, userId) {
    console.log("user id in company web =>", userId);
    return new Promise((resolve, reject) => {
      return axios
        .get(`users/${userId}/follow_status/`)
        .then(function (response) {
          commit("commit_followUnfollowStatus", response.data.data);
          resolve();
        })
        .catch(function (error) {
          commit("commit_followUnfollowStatus", "");
          reject();
        });
    });
  },

  action_getUnfollowStatus({ commit }, userId) {
    return new Promise((resolve, reject) => {
      return axios
        .post(`users/${userId}/unfollow/`)
        .then(function (response) {
          commit("commit_UnfollowStatus", response.data.data);
          resolve();
        })
        .catch(function (error) {
          commit("commit_UnfollowStatus", "");
          reject();
        });
    });
  },
  action_getFollowStatus({ commit }, data) {
    let obj = {
      reset_feeds: data.reset_feeds,
    };
    return new Promise((resolve, reject) => {
      return axios
        .post(`users/${data.user_id}/follow/`, obj)
        .then(function (response) {
          commit("commit_FollowStatus", response.data.data);
          resolve();
        })
        .catch(function (error) {
          commit("commit_FollowStatus", "");
          reject();
        });
    });
  },

  action_likePostCompanyActivity({ commit }, data) {
    // console.log(data);
    // const $loading = useLoading();
    // let loader = $loading.show();
    return new Promise((resolve, reject) => {
      this.dispatch("post/likePost", data)
        .then(function (response) {
          // console.log("response in timeline",response);
          commit("commit_like", response);
          resolve();
        })
        .catch(function (error) {
          console.log(error);
          reject();
        });
    });
  },

  action_unlikePostCompanyActivity({ commit }, data) {
    // console.log(data);
    // const $loading = useLoading();
    // let loader = $loading.show();
    return new Promise((resolve, reject) => {
      this.dispatch("post/unlikePost", data)
        .then(function (response) {
          // console.log("commit_unlike response in company",response);
          commit("commit_unlike", response);
          resolve();
        })
        .catch(function (error) {
          console.log(error);
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
