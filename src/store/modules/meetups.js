import axios from "axios";
import Vue from "vue";
import axiosInstance from "@/services/axios";

export default {
  namespaced: true,
  state: {
    meetups: [],
    meetup: {}
  },
  getters: {},
  actions: {
    fetchMeetups({ state, commit }) {
      commit("meetups/setMeetups", [], { root: true });
      return axios.get("/api/v1/meetups").then(res => {
        const meetups = res.data;
        commit("meetups/setMeetups", meetups, { root: true });
        return state.meetups;
      });
    },
    fetchMeetupById({ state, commit }, payload) {
      commit("setMeetup", {}, { root: true });
      return axios.get(`/api/v1/meetups/${payload.meetupId}`).then(res => {
        const meetup = res.data;
        commit("meetups/setMeetup", meetup, { root: true });
        return state.meetup;
      });
    },
    joinMeetup({ state, rootState, commit, dispatch }, payload) {
      const user = rootState.auth.user;
      return axiosInstance
        .post(`/api/v1/meetups/${payload.meetupId}/join`)
        .then(() => {
          dispatch("auth/addMeetupToAuthUser", payload.meetupId, {
            root: true
          });

          const joinedPeople = state.meetup.joinedPeople;
          commit("addUsersToMeetup", [...joinedPeople, user]);
          return true;
        });
    },
    leaveMeetup({ state, rootState, commit, dispatch }, payload) {
      const user = rootState.auth.user;

      return axiosInstance
        .post(`/api/v1/meetups/${payload.meetupId}/leave`)
        .then(() => {
          dispatch("auth/removeMeetupFromAuthUser", payload.meetupId, {
            root: true
          });

          const joinedPeople = state.meetup.joinedPeople;
          const index = joinedPeople.findIndex(jUser => jUser._id === user._id);
          joinedPeople.splice(index, 1);
          commit("addUsersToMeetup", joinedPeople);
        });
    },
    createMeetup({ rootState }, payload) {
      payload.meetupToCreate.meetupCreator = rootState.auth.user;
      payload.meetupToCreate.processedLocation = payload.meetupToCreate.location
        .toLowerCase()
        .replace(/[\s,]+/g, "")
        .trim();

      return axiosInstance
        .post("/api/v1/meetups", payload.meetupToCreate)
        .then(res => res.data);
    }
  },
  mutations: {
    setMeetups(state, meetups) {
      state.meetups = meetups;
    },
    setMeetup(state, meetup) {
      state.meetup = meetup;
    },
    addUsersToMeetup(state, joinedPeople) {
      Vue.set(state.meetup, "joinedPeople", joinedPeople);
    }
  }
};
