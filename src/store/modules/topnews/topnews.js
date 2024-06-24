import { data } from "autoprefixer";
import axios from "axios";
import { Topnews } from "../../modelClasses/TopnewsModel.js";

const defaultState = () => {
  return {
    TopNewsList: [],
    selected_article_id: "",
    TopNewsListTimeline: [],
    AllTopNewsList: [],
  };
};

const state = defaultState();

const getters = {
  getter_topNewsListData: (state) => state.TopNewsList,
  getter_selected_article_id: (state) => state.selected_article_id,
  getter_TopNewsListTimeline: (state) => state.TopNewsListTimeline,
  getter_AllTopNewsList: (state) => state.AllTopNewsList,
};

const mutations = {
  commit_TopNewsList: (state, topnewsData) => {
    // state.selected_article_id = "";
    // if (topnewsData.selected_article_id) {
    //   state.selected_article_id = topnewsData.selected_article_id;
    // }

    // console.log("topnewsData", state.selected_article_id);
    if (topnewsData.articles) {
      state.TopNewsList = [];
      for (let singleData of topnewsData.articles) {
        let newObject = new Topnews(singleData);
        // console.log("new object", newObject);
        state.TopNewsList.push(newObject);
      }
    } else {
      state.TopNewsList = [];
      return;
    }

    // state.TopNewsList = topewsData;
  },
  commit_selectedArticleId: (state, data) => {
    state.selected_article_id = data;
  },
  commit_TopNewsListTimeline: (state, data) => {
    if (data.articles) {
      state.TopNewsListTimeline = [];
      for (let singleData of data.articles) {
        let newObject = new Topnews(singleData);
        // console.log("new object", newObject);
        state.TopNewsListTimeline.push(newObject);
      }
    } else {
      state.TopNewsListTimeline = [];
      return;
    }
  },
  commit_AllTopNewsList: (state, data) => {
    //console.log("all news", data);
    if (data.data == null) {
      state.AllTopNewsList = [];
      return;
    }
    if (data.data.page == 1) {
      state.AllTopNewsList = [];
      for (let singleData of data.data.articles) {
        let newObject = new Topnews(singleData);
        state.AllTopNewsList.push(newObject);
      }
    } else {
      for (let singleData of data.data.articles) {
        let newObject = new Topnews(singleData);
        state.AllTopNewsList.push(newObject);
      }
    }
  },
};

const actions = {
  action_getTopNewsList({ commit }, obj) {
    return new Promise((resolve, reject) => {
      return axios
        .post(`/article/same_date_articles/`, obj)
        .then(function (response) {
          //console.log(response.data.results.data);

          commit("commit_TopNewsList", response.data.data);
          commit(
            "commit_selectedArticleId",
            response.data.data.selected_article_id
          );
          resolve(response.data.data.selected_article_id);
        })
        .catch(function (error) {
          console.log(error.message);
          reject(error);
        });
    });
  },
  action_getTopNewsListTimeline({ commit }, obj) {
    return new Promise((resolve, reject) => {
      return axios
        .get(`/article/list/?page=1&limit=10&offset=0`, obj)
        .then(function (response) {
          //console.log(response.data.results.data);

          commit("commit_TopNewsListTimeline", response.data.data);
          resolve(response.data);
        })
        .catch(function (error) {
          console.log(error.message);
          reject(error);
        });
    });
  },
  action_getAllTopNewsList({ commit }, data) {
    return new Promise((resolve, reject) => {
      return axios
        .get(
          `/article/list/?page=${data.page}&limit=${data.limit}&offset=${data.offset}`
        )
        .then(function (response) {
          //console.log(response.data.results.data);
          let obj = {
            data: response.data.data,
            page: data.page,
          };
          commit("commit_AllTopNewsList", obj);
          resolve(response.data);
        })
        .catch(function (error) {
          console.log(error.message);
          reject(error);
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
