import axios from "axios";

export default {
  namespaced: true,
  state: {
    threads: []
  },
  getters: {},
  actions: {
    fetchThreads({ state, commit }, payload) {
      return axios
        .get(`/api/v1/threads?meetupId=${payload.meetupId}`)
        .then(res => {
          const threads = res.data;
          commit("threads/setThreads", threads, { root: true });
          return state.threads;
        });
    }
  },
  mutations: {
    setThreads(state, threads) {
      state.threads = threads;
    }
  }
};
