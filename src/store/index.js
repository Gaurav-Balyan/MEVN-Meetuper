import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import meetups from "./modules/meetups";
import categories from "./modules/categories";
import threads from "./modules/threads";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    meetups,
    categories,
    threads
  }
});

export default store;
