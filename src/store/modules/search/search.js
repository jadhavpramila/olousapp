import axios from "axios";
import appConstants from "../../../appConstants.js";
import { useLoading } from "vue-loading-overlay";
import { Post } from "../../modelClasses/PostModel.js";
import { User } from "../../modelClasses/UserProfileModel.js";
import { company } from "../../modelClasses/CompanyModel.js";

const defaultState = () => {
  return {
    // searchData: "",
    // companiesData: "",
    // data: "",
    userSearchString: "",
    activeTabs: {
      mainTab: appConstants.search_tabs.CONTENT,
      subTab: appConstants.search_sub_tabs.ALL,
    },
    search: {
      apiQuery: "",
      searchData: [],
    },
    companies: {
      apiQuery: "",
      companiesData: [],
    },
    users: {
      apiQuery: "",
      usersData: [],
    },
  };
};

const state = defaultState();

const getters = {
  getter_getData: (state) => state.data,
  getter_searchData: (state) => state.search.searchData,
  getter_companiesData: (state) => state.companies.companiesData,
  getter_usersData: (state) => state.users.usersData,
  getter_searchString: (state) => state.userSearchString,
  getter_saveActiveTabs: (state) => state.activeTabs,
};

const mutations = {
  commit_getData: (state, postData) => {
    state.data = [];

    if (!postData.hasOwnProperty("posts")) {
      return;
    }
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

      state.data.push(post_object);
    }
  },
  commit_searchData: (state, data) => {
    let postObjectArray = [];
    state.search.apiQuery = data.query;
    let array = [];
    for (let i = 0; i < data.data.length; i++) {
      let innerArray = data.data[i].hits.hits;
      for (let index = 0; index < innerArray.length; index++) {
        array.push(innerArray[index]);
      }
    }
    array.sort((a, b) => {
      if (a._score < b._score) return 1;
      if (a._score > b._score) return -1;
      return 0;
    });
    for (let newPost of array) {
      let newPostObject = new Post(newPost._source);
      let searchContent = {
        _index: newPost._index,
        _score: newPost._score,
        _source: newPostObject,
      };
      postObjectArray.push(searchContent);
    }
    state.search.searchData = postObjectArray;
    //console.log("search content",  postObjectArray)
  },
  commit_companiesData: (state, data) => {
    state.companies.apiQuery = data.query;

    let Companies = [];
    for (let singleCompany of data.data) {
      let companyObject = new company(singleCompany._source);
      Companies.push(companyObject);
    }
    //  console.log("data.data search", companyObject)
    state.companies.companiesData = Companies;
  },
  commit_usersData: (state, data) => {
    let userObjectArray = [];
    state.users.apiQuery = data.query;
    for (let newUser of data.data) {
      let newUserObject = new User(newUser._source);
      let searchContent = {
        _index: newUser._index,
        _score: newUser._score,
        _source: newUserObject,
      };
      userObjectArray.push(searchContent);
    }
    state.users.usersData = userObjectArray;
    // console.log("user data", userObjectArray)
    //console.log("pre user data", data.data)
  },
  commit_saveActiveTabs: (state, data) => {
    state.activeTabs.mainTab = data.mainTab;
    state.activeTabs.subTab = data.subTab;
  },
  commit_setSearchString: (state, data) => {
    state.userSearchString = data;
  },
  // state.companiesData
  //Add this mutation in every store module
  reset(state) {
    Object.assign(state, defaultState());
  },
};

const actions = {
  action_getData({ commit }, postid) {
    // const $loading = useLoading();
    // let loader = $loading.show();
    var axios_instance = axios.create();
    delete axios_instance.defaults.headers.common["Authorization"];
    return new Promise((resolve, reject) => {
      return axios_instance
        .get(`/timeline/admin_posts/`)
        .then(function (response) {
          // console.log(response.data.data);
          commit("commit_getData", response.data.results.data);
          resolve();
          // loader.hide();
        })
        .catch(function (error) {
          // loader.hide();
          console.log(error.message);
          commit("commit_getData", []);
          resolve();
        });
    });
  },
  action_getSearchData({ commit }, data) {
    // console.log("data in action_getSearchData =>",data);
    // const $loading = useLoading();
    // let loader = $loading.show();
    let apiQuery = "";
    if (data.filter === appConstants.search_sub_tabs.ALL) {
      apiQuery = `/search/${data.type}/?q=${data.query}&index[]=post&index[]=headline&index[]=document`;
    } else if (
      data.filter === appConstants.search_sub_tabs.DOCUMENT ||
      data.filter === appConstants.search_sub_tabs.HEADLINE
    ) {
      apiQuery = `/search/${data.type}/?q=${data.query}&index[]=${data.filter}`;
    }
    commit("commit_saveActiveTabs", {
      mainTab: data.type,
      subTab: data.filter,
    });
    if (apiQuery == this.state.search.search.apiQuery) {
      // console.log("in if =>", apiQuery);
      // loader.hide();
      return true;
    } else {
      return new Promise((resolve, reject) => {
        return axios
          .get(apiQuery)
          .then(function (response) {
            // console.log(response.data.data.responses);
            commit("commit_searchData", {
              data: response.data.data.responses,
              query: apiQuery,
            });
            resolve();
            // loader.hide();
          })
          .catch(function (error) {
            console.log(error.message);
            commit("commit_searchData", {
              data: [],
              query: "",
            });
            reject();
            // loader.hide();
          });
      });
    }
  },
  action_getCompaniesData({ commit }, data) {
    // const $loading = useLoading();
    // let loader = $loading.show();
    // console.log("action_getCompaniesData", data);
    let apiQuery = `search/${data.type}/?q=${data.query}&index[]=post&index[]=headline&index[]=document`;
    commit("commit_saveActiveTabs", {
      mainTab: appConstants.search_tabs.COMPANIES,
      subTab: data.filter,
    });
    if (apiQuery == this.state.search.companies.apiQuery) {
      // loader.hide();
      return true;
    } else {
      return new Promise((resolve, reject) => {
        return axios
          .get(apiQuery)
          .then(function (response) {
            // console.log(response.data.data.hits.hits);
            commit("commit_companiesData", {
              data: response.data.data.hits.hits,
              query: apiQuery,
            });
            resolve();
            // loader.hide();
          })
          .catch(function (error) {
            console.log(error.message);
            commit("commit_companiesData", {
              data: [],
              query: "",
            });
            reject();
            // loader.hide();
          });
      });
    }
  },
  action_getUsersData({ commit }, data) {
    // const $loading = useLoading();
    // let loader = $loading.show();
    //console.log("action_getCompaniesData", data);
    let apiQuery = `/search/users_noauth/?q=${data.query}`;
    //let apiQuery = `https://content.olous.app/api/v1/search/user_details/?q=${}`;

    commit("commit_saveActiveTabs", {
      mainTab: appConstants.search_tabs.USERS,
      subTab: data.filter,
    });
    if (apiQuery == this.state.search.users.apiQuery) {
      // loader.hide();
      return true;
    } else {
      return new Promise((resolve, reject) => {
        return axios
          .get(apiQuery)
          .then(function (response) {
            // console.log(response.data.data.hits.hits);
            commit("commit_usersData", {
              data: response.data.data.hits.hits,
              query: apiQuery,
            });
            resolve();
            // loader.hide();
          })
          .catch(function (error) {
            console.log(error.message);
            commit("commit_usersData", {
              data: [],
              query: "",
            });
            reject();
            // loader.hide();
          });
      });
    }
  },
  // action_setSearchString({ commit }, data) {
  //   commit("commit_setSearchString", { data });
  // },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
