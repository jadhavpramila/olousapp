import axios from "axios";
import { Article } from "../../modelClasses/ArticleModel.js";

const defaultState = () => {
  return {
    ArticleData: [],
    InterestList: [],
  };
};

const state = defaultState();

const getters = {
  getter_articleData: (state) => state.ArticleData,
  getter_interestData: (state) => state.InterestList,
};

const mutations = {
  commit_articleData: (state, data) => {
    // console.log("data commited", data);
    //  state.ArticleData = data
    if (data.data == null) {
      state.ArticleData = [];
      return;
    }
    if (data.page == 1) {
      state.ArticleData = [];
      for (let singleData of data.data) {
        let newObject = new Article(singleData);
        //console.log("new object", newObject)
        state.ArticleData.push(newObject);
      }
    } else {
      for (let singleData of data.data) {
        state.ArticleData.push(singleData);
      }
    }
  },
  commit_InterestList: (state, interestData) => {
    state.InterestList = interestData;
  },
};

const actions = {
  action_getArticleData({ commit }, data) {
    let interestFilter = "";
    for (let count = 0; count < data.interest.length; count++) {
      interestFilter = `${interestFilter}&q[]=${data.interest[count]}`;
    }
    // console.log("data to article", interestFilter)
    //https://content.olous.app/api/v1/headline/list/?limit=20&offset=0&page=1&q%5B%5D=40&q%5B%5D=54&q%5B%5D=52
    return new Promise((resolve, reject) => {
      return axios
        .get(
          `/headline/list/?limit=${data.limit}&offset=${data.offset}&page=${data.page}${interestFilter}`
        )
        .then(function (response) {
          //console.log(response.data.results.data);
          let obj = {
            data: response.data.results.data,
            page: data.page,
          };
          commit("commit_articleData", obj);
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
