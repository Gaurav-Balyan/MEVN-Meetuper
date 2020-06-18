import axios from "axios";
import axiosInstance from "@/services/axios";
import Vue from "vue";

import { applyFilters } from "@/helpers";

export default {
  namespaced: true,
  state: {
    isAllThreadsLoaded: false,
    threads: []
  },
  getters: {},
  actions: {
    fetchThreads({ state, commit }, { meetupId, filter = {}, init }) {
      // Check if need to reset threads in page revisit after load more threads has loaded many threads
      if (init) {
        commit("threads/setThreads", [], { root: true });
      }
      const url = applyFilters(`/api/v1/threads?meetupId=${meetupId}`, filter);
      return axios.get(url).then(res => {
        const { threads, isAllDataLoaded } = res.data;
        commit("setAllDataLoaded", isAllDataLoaded);
        commit("threads/mergeThreads", threads, { root: true });
        return state.threads;
      });
    },
    postThread({ state, commit }, payload) {
      const thread = {};
      thread.title = payload.title;
      thread.meetup = payload.meetupId;

      return axiosInstance.post("/api/v1/threads", thread).then(res => {
        const createdThread = res.data;
        const index = state.threads.length;

        commit(
          "threads/addThreadToArray",
          { item: createdThread, index },
          { root: true }
        );
        return createdThread;
      });
    },
    sendPost({ dispatch }, payload) {
      const post = {
        text: payload.text,
        thread: payload.threadId
      };
      return axiosInstance.post("/api/v1/posts", post).then(res => {
        const createdPost = res.data;
        dispatch(
          "threads/addPostToThread",
          { post: createdPost, threadId: payload.threadId },
          {
            root: true
          }
        );
        return createdPost;
      });
    },
    addPostToThread({ commit, state }, { post, threadId }) {
      const threadIndex = state.threads.findIndex(
        thread => thread._id === threadId
      );
      if (threadIndex > -1) {
        const posts = state.threads[threadIndex].posts;
        posts.unshift(post);
        commit("savePostToThread", { posts, index: threadIndex });
      }
    }
  },
  mutations: {
    setThreads(state, threads) {
      state.threads = threads;
    },
    addThreadToArray(state, { item, index }) {
      Vue.set(state.threads, index, item);
    },
    savePostToThread(state, { posts, index }) {
      Vue.set(state.threads[index], "posts", posts);
    },
    setAllDataLoaded(state, isAllDataLoaded) {
      state.isAllThreadsLoaded = isAllDataLoaded;
    },
    mergeThreads(state, threads) {
      state.threads = [...state.threads, ...threads];
    }
  }
};
