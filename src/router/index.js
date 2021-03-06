import Vue from "vue";
import Router from "vue-router";
import store from "@/store";

import PageHome from "@/pages/PageHome";
import PageMeetupDetail from "@/pages/PageMeetupDetail";
import PageMeetupCreate from "@/pages/PageMeetupCreate";
import PageMeetupFind from "@/pages/PageMeetupFind";
import PageMeetupEdit from "@/pages/PageMeetupEdit";
import PageLogin from "@/pages/PageLogin";
import PageRegister from "@/pages/PageRegister";
import PageSecret from "@/pages/PageSecret";
import PageNotFound from "@/pages/PageNotFound";
import PageNotAuthenticated from "@/pages/PageNotAuthenticated";
import PageProfile from "@/pages/PageProfile";
import PageActivateUser from "@/pages/PageActivateUser";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "",
      name: "PageHome",
      component: PageHome
    },
    {
      path: "/login",
      name: "PageLogin",
      component: PageLogin,
      meta: { onlyGuestUser: true }
    },
    {
      path: "/me",
      name: "PageProfile",
      component: PageProfile,
      meta: { onlyAuthUser: true }
    },
    {
      path: "/register",
      name: "PageRegister",
      component: PageRegister,
      meta: { onlyGuestUser: true }
    },
    {
      path: "/users/:hash/activate",
      name: "PageActivateUser",
      component: PageActivateUser,
      meta: { onlyGuestUser: true }
    },
    {
      path: "/meetups/new",
      name: "PageMeetupCreate",
      component: PageMeetupCreate,
      // Providing additional information to this route
      meta: { onlyAuthUser: true }
    },
    {
      path: "/meetups/secret",
      name: "PageSecret",
      component: PageSecret,
      // Providing additional information to this route
      meta: { onlyAuthUser: true }
    },
    {
      path: "/meetups/:meetupId/edit",
      name: "PageMeetupEdit",
      component: PageMeetupEdit,
      props: true,
      // Providing additional information to this route
      meta: { onlyAuthUser: true }
    },
    {
      path: "/meetups/:id",
      name: "PageMeetupDetail",
      component: PageMeetupDetail
    },
    {
      path: "/find/:category",
      name: "PageMeetupFindCategory",
      component: PageMeetupFind,
      props: true
    },
    {
      path: "/find",
      name: "PageMeetupFind",
      component: PageMeetupFind
    },
    {
      path: "/401",
      name: "PageNotAuthenticated",
      component: PageNotAuthenticated
    },
    {
      path: "*",
      name: "PageNotFound",
      component: PageNotFound
    }
  ],
  mode: "history"
});

// Making auth check on every route transition
router.beforeEach((to, from, next) => {
  store.dispatch("auth/getAuthUser").then(() => {
    const isAuthenticated = store.getters["auth/isAuthenticated"];
    if (to.meta.onlyAuthUser) {
      if (isAuthenticated) {
        next();
      } else {
        next({ name: "PageNotAuthenticated" });
      }
    } else if (to.meta.onlyGuestUser) {
      if (isAuthenticated) {
        next({ name: "PageHome" });
      } else {
        next();
      }
    } else {
      next();
    }
  });
});

export default router;
