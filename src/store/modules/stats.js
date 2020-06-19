import axiosInstance from "@/services/axios";

export default {
  namespaced: true,
  state: {
    meetups: {
      data: [],
      count: null
    },
    threads: {
      data: [],
      count: null
    },
    posts: {
      data: [],
      count: null
    }
  },
  getters: {},
  actions: {
    fetchUserStats({ commit }) {
      return axiosInstance.get("/api/v1/users/me/activity").then(res => {
        const stats = res.data;
        commit("stats/setStats", stats, { root: true });
        return stats;
      });
    }
  },
  mutations: {
    setStats(state, stats) {
      return Object.assign(state, {}, stats);
    }
  }
};
