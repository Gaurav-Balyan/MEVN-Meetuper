import axios from "axios";
import Vue from "vue";
import jwt from "jsonwebtoken";
import axiosInstance from "@/services/axios";
import { rejectError } from "@/helpers";

function checkTokenValidity(token) {
  if (token) {
    const decodedToken = jwt.decode(token);
    return decodedToken && decodedToken.exp * 1000 > new Date().getTime();
  }
  return false;
}

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
    },
    isMeetupOwner: state => meetupCreatorId => {
      if (!state.user) {
        return false;
      }
      return state.user._id === meetupCreatorId;
    },
    isMember: state => meetupId => {
      return (
        state.user &&
        state.user["joinedMeetups"] &&
        state.user["joinedMeetups"].includes(meetupId)
      );
    }
  },
  actions: {
    loginWithEmailAndPassword({ state, commit }, payload) {
      return axios
        .post("/api/v1/users/login", payload.userData)
        .then(res => {
          const user = res.data;
          localStorage.setItem("meetuper-jwt", user.token);
          commit("auth/setAuthUser", user, { root: true });
          return state.user;
        })
        .catch(err => rejectError(err));
    },
    registerUser(context, payload) {
      return axios
        .post("/api/v1/users/register", payload.userData)
        .catch(err => rejectError(err));
    },
    getAuthUser({ commit, getters }) {
      const authUser = getters["authUser"];
      const token = localStorage.getItem("meetuper-jwt");
      const isTokenValid = checkTokenValidity(token);
      if (authUser && isTokenValid) {
        return Promise.resolve(authUser);
      }

      const config = {
        headers: {
          "Cache-Control": "no-cache"
        }
      };

      return axiosInstance
        .get("/api/v1/users/me", config)
        .then(res => {
          const user = res.data;
          localStorage.setItem("meetuper-jwt", user.token);
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
    updateUser({ commit }, payload) {
      return axiosInstance
        .patch(`/api/v1/users/${payload.user._id}`, payload.user)
        .then(res => {
          const updatedUser = res.data;
          commit("auth/setAuthUser", updatedUser);
          return updatedUser;
        });
    },
    logout({ commit }) {
      // Uncomment to use Passport Authentication
      // return axios
      //   .post("/api/v1/users/logout")
      //   .then(() => commit("auth/setAuthUser", null, { root: true }))
      //   .catch(err => {
      //     commit("auth/setAuthUser", null, { root: true });
      //     return err;
      //   });
      return new Promise(resolve => {
        localStorage.removeItem("meetuper-jwt");
        commit("auth/setAuthUser", null, { root: true });
        resolve(true);
      });
    },
    addMeetupToAuthUser({ commit, state }, meetupId) {
      const userMeetups = [...state.user["joinedMeetups"], meetupId];
      commit("setMeetupsToAuthUser", userMeetups);
    },
    removeMeetupFromAuthUser({ commit, state }, meetupId) {
      const userMeetupIds = [...state.user["joinedMeetups"]];
      const index = userMeetupIds.findIndex(
        userMeetupId => userMeetupId === meetupId
      );
      userMeetupIds.splice(index, 1);
      commit("setMeetupsToAuthUser", userMeetupIds);
    }
  },
  mutations: {
    setAuthUser(state, user) {
      state.user = user;
    },
    setAuthState(state, authState) {
      state.isAuthResolved = authState;
    },
    setMeetupsToAuthUser(state, meetups) {
      return Vue.set(state.user, "joinedMeetups", meetups);
    }
  }
};
