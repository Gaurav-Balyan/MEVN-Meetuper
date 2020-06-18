import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import meetups from "./modules/meetups";
import categories from "./modules/categories";
import threads from "./modules/threads";
import stats from "./modules/stats";
import meta from "./modules/meta";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    meetups,
    categories,
    threads,
    stats,
    meta
  }
});

export default store;
