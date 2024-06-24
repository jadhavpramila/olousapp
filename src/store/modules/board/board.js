import axios from "axios";
import appConstants from "../../../appConstants.js";
import { useLoading } from "vue-loading-overlay";
import { Board, BoardClips } from "../../modelClasses/BoardModel.js";
const defaultState = () => {
  return {
    board: {},
    publicBoard: [],
    singleBoard: [],
    activeTab: 0,
    singleBoardDetails: {},
  };
};

const state = defaultState();

const getters = {
  getter_boardData: (state) => state.board,
  getter_publicBoardData: (state) => state.publicBoard,
  getter_singleBoardData: (state) => state.singleBoard,
  getter_activeTab: (state) => state.activeTab,
  getter_singleBoardDetails: (state) => state.singleBoardDetails,
  getter_scrollBarPosition: (state) => state.scrollBarPosition,
};

const mutations = {
  commit_scrollBarPosition: (state, data) => {
    state.scrollBarPosition = data;
  },

  commit_boardData: (state, boardData) => {
    state.board = boardData;
  },
  commit_publicBoardData: (state, obj) => {
    // console.log(obj);
    if (obj.data == null) {
      state.publicBoard = [];
      return;
    }
    if (obj.page == 1) {
      state.publicBoard = [];
      for (let board of obj.data) {
        let newBoard = new Board(board);
        //console.log("newBoard", newBoard);
        //if (!state.publicBoard.includes(board)) {
        state.publicBoard.push(newBoard);
        //}
      }
    } else {
      for (let board of obj.data) {
        let newBoard = new Board(board);
        // if (!state.publicBoard.includes(board)) {
        state.publicBoard.push(newBoard);
        // }
      }
    }
  },
  commit_singleBoardData: (state, data) => {
    //console.log("newBoardClip", data);
    state.singleBoardDetails = data.data.board;
    if (data == null) {
      state.singleBoard = [];
      return;
    }
    //state.singleBoard = {};
    if (data.page == 1) {
      state.singleBoard = [];
      for (let clip of data.data.clips) {
        let newBoardClip = new BoardClips(clip);
        state.singleBoard.push(newBoardClip);
      }
    } else {
      for (let clip of data.data.clips) {
        let newBoardClip = new BoardClips(clip);
        state.singleBoard.push(newBoardClip);
      }
    }
    // console.log("data.data", data);
  },
  commit_activeTab: (state, data) => {
    state.activeTab = data;
  },

  // state.companiesData
  //Add this mutation in every store module
  reset(state) {
    Object.assign(state, defaultState());
  },
};

const actions = {
  action_getBoardData({ commit }, data) {
    // const $loading = useLoading();
    // let loader = $loading.show();
    //console.log(data);
    let apiQuery = `clips/boards/myboards/?page=${data.page}&offset=${data.offset}&limit=${data.limit}`;

    return new Promise((resolve, reject) => {
      return axios
        .get(apiQuery)
        .then(function (response) {
          // console.log(response.data.results);
          commit("commit_boardData", response.data.results);
          resolve(true);
          // loader.hide();
        })
        .catch(function (error) {
          console.log(error.message);
          commit("commit_boardData");
          reject();
          // loader.hide();
        });
    });
  },

  action_getPublicBoardData({ commit }, data) {
    // const $loading = useLoading();
    // let loader = $loading.show();
    let apiQuery = `clips/boards/top/?page=${data.page}&offset=${data.offset}&limit=${data.limit}`;

    return new Promise((resolve, reject) => {
      return axios
        .get(apiQuery)
        .then(function (response) {
          let obj = {
            page: data.page,
            data: response.data.results.boards,
          };
          commit("commit_publicBoardData", obj);
          let res = {
            currentPage: data.page,
            next: response.data.results.next,
          };
          resolve(res);
        })
        .catch(function (error) {
          console.log(error.message);
          let obj = {
            page: 1,
            data: null,
          };
          commit("commit_publicBoardData", obj);
          reject();
          // loader.hide();
        });
    });
  },

  action_getSingleBoardData({ commit }, data) {
    // const $loading = useLoading();
    // let loader = $loading.show();

    let apiQuery = `clips/boardencoded/?board=${data.id}&page=${data.page}&offset=${data.offset}&limit=${data.limit}`;

    return new Promise((resolve, reject) => {
      return axios
        .get(apiQuery)
        .then(function (response) {
          let obj = {
            data: response.data.data,
            page: data.page,
          };

          commit("commit_singleBoardData", obj);
          resolve(response.data.data);
          // loader.hide();
        })
        .catch(function (error) {
          //console.log(error.response.data);
          // commit("commit_singleBoardData");
          reject(error.response);
          // loader.hide();
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
