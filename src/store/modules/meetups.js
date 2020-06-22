import axios from "axios";
import Vue from "vue";
import axiosInstance from "@/services/axios";

import { applyFilters } from "@/helpers";

export default {
  namespaced: true,
  state: {
    meetups: [],
    meetup: {},
    pagination: {
      count: 0,
      pageCount: 0,
      pageSize: 3,
      pageNum: 1
    }
  },
  getters: {},
  actions: {
    fetchMeetups({ state, commit }, options = { reset: true }) {
      if (options.reset) {
        commit("meetups/setMeetups", [], { root: true });
      }
      const url = applyFilters("/api/v1/meetups", options.filter);
      return axios.get(url).then(res => {
        const { meetups, count, pageCount } = res.data;
        commit("meetups/setMeetups", meetups, { root: true });
        commit("setPagination", { count, pageCount });
        return state.meetups;
      });
    },
    fetchMeetupById({ state, commit }, payload) {
      commit("setMeetup", {});
      return axios.get(`/api/v1/meetups/${payload.meetupId}`).then(res => {
        const meetup = res.data;
        commit("setMeetup", meetup);
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
    },
    updateMeetup({ commit, rootState }, meetup) {
      meetup.meetupCreator = rootState.auth.user;
      meetup.processedLocation = meetup.location
        .toLowerCase()
        .replace(/[\s,]+/g, "")
        .trim();

      return axiosInstance
        .patch(`/api/v1/meetups/${meetup._id}`, meetup)
        .then(res => {
          const updatedMeetup = res.data;
          commit("mergeMeetup", updatedMeetup);
          return updatedMeetup;
        });
    },
    deleteMeetup(_, meetupId) {
      return axiosInstance.delete(`/api/v1/meetups/${meetupId}`).then(res => {
        const meetupId = res.data;
        return meetupId;
      });
    },
    initializePagesFromQuery({ commit }, { pageSize, pageNum }) {
      commit("setPage", pageNum);
      commit("setPageSize", pageSize);
    }
  },
  mutations: {
    setMeetups(state, meetups) {
      state.meetups = meetups;
    },
    setMeetup(state, meetup) {
      state.meetup = meetup;
    },
    mergeMeetup(state, updatedMeetup) {
      state.meetup = { ...state.meetup, ...updatedMeetup };
    },
    addUsersToMeetup(state, joinedPeople) {
      Vue.set(state.meetup, "joinedPeople", joinedPeople);
    },
    setPagination(state, { count, pageCount }) {
      Vue.set(state.pagination, "count", count);
      Vue.set(state.pagination, "pageCount", pageCount);
    },
    setPage(state, pageNum) {
      Vue.set(state.pagination, "pageNum", +pageNum);
    },
    setPageSize(state, pageSize) {
      Vue.set(state.pagination, "pageSize", pageSize);
    }
  }
};
