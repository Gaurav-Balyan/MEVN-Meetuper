import axios from "axios";

export default {
  namespaced: true,
  state: {
    categories: []
  },
  getters: {},
  actions: {
    fetchCategories({ state, commit }) {
      return axios.get("/api/v1/categories").then(res => {
        const categories = res.data;
        commit("categories/setCategories", categories, { root: true });
        return state.categories;
      });
    }
  },
  mutations: {
    setCategories(state, categories) {
      state.categories = categories;
    }
  }
};
