import { data } from "autoprefixer";
import axios from "axios";
import { order } from "../../modelClasses/PricingModel.js";

const defaultState = () => {
  return {};
};

const state = defaultState();

const getters = {};

const mutations = {};

const actions = {
  action_getOrderDetails({ commit }, order_id) {
    return new Promise((resolve, reject) => {
      return axios
        .get(`/vendors/order_new/payment_page/${order_id}/`)
        .then(function (response) {
          var order_object = new order(response["data"]["data"]);
          resolve(order_object);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  },
  action_applyCoupon({ commit }, obj) {
    let coupon = obj["coupon"];
    let module_type = obj["module_type"];
    let module_id = obj["module_id"];
    let amount = obj["amount"];

    return new Promise((resolve, reject) => {
      return axios
        .get(
          `/vendors/coupon/apply/?coupon=${coupon}&module_type=${module_type}&module_id=${module_id}&amount=${amount}`
        )
        .then(function (response) {
          resolve(response["data"]["data"]);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  },

  action_orderUpdateToTransaction({ commit }, obj) {
    let order_id = obj["order_id"];

    return new Promise((resolve, reject) => {
      return axios
        .patch(`/vendors/order_new/update/as_transaction/${order_id}/`, obj)
        .then(function (response) {
          resolve(response["data"]["data"]);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  },

  action_orderPaymentDone({ commit }, obj) {
    console.log("payload for payment done =>", obj);
    let order_id = obj["order_id"];
    console.log("after payload =>", obj);
    return new Promise((resolve, reject) => {
      return axios
        .post(`/vendors/order_new/payment_done/`, obj)
        .then(function (response) {
          resolve(response["data"]["data"]);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  },

  action_orderPaymentFail({ commit }, obj) {
    let order_id = obj["order_id"];

    return new Promise((resolve, reject) => {
      return axios
        .post(`/vendors/order_new/payment_fail/`, obj)
        .then(function (response) {
          resolve(response["data"]["data"]);
        })
        .catch(function (error) {
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
