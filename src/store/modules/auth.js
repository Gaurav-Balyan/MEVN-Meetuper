import axios from "axios";

export default {
  namespaced: true,
  state: {
    user: null,
    isAuthResolved: false
  },
  getters: {
    authUser(state) {
      return state.user || null;
    },
    isAuthenticated(state) {
      return !!state.user;
    }
  },
  actions: {
    loginWithEmailAndPassword({ state, commit }, payload) {
      return axios.post("/api/v1/users/login", payload.userData).then(res => {
        const user = res.data;
        commit("auth/setAuthUser", user, { root: true });
        return state.user;
      });
    },
    registerUser(context, payload) {
      return axios.post("/api/v1/users/register", payload.userData);
    },
    getAuthUser({ commit, getters }) {
      const authUser = getters["authUser"];
      if (authUser) {
        return Promise.resolve(authUser);
      }

      const config = {
        headers: {
          "Cache-Control": "no-cache"
        }
      };

      return axios
        .get("/api/v1/users/me", config)
        .then(res => {
          const user = res.data;
          commit("auth/setAuthUser", user, { root: true });
          commit("auth/setAuthState", true, { root: true });
          return user;
        })
        .catch(err => {
          commit("auth/setAuthUser", null, { root: true });
          commit("auth/setAuthState", true, { root: true });
          return err;
        });
    },
    logout({ commit }) {
      return axios
        .post("/api/v1/users/logout")
        .then(() => commit("auth/setAuthUser", null, { root: true }))
        .catch(err => {
          commit("auth/setAuthUser", null, { root: true });
          return err;
        });
    }
  },
  mutations: {
    setAuthUser(state, user) {
      state.user = user;
    },
    setAuthState(state, authState) {
      state.isAuthResolved = authState;
    }
  }
};
