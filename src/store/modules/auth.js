import axios from "axios";

export default {
  namespaced: true,
  state: {},
  getters: {},
  actions: {
    loginWithEmailAndPassword({ state, commit }, payload) {
      console.log(payload);
    },
    registerUser({ state, commit }, payload) {
      console.log(payload);
    }
  },
  mutations: {}
};
