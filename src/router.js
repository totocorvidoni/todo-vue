import Vue from "vue";
import Store from "@/store";
import Router from "vue-router";
import Quick from "@/views/Quick.vue";
import Full from "@/views/Full.vue";

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "quick",
      component: Quick,
      beforeEnter(to, from, next) {
        Store.dispatch("setActiveProject", "0");
        next();
      }
    },
    {
      path: "/full",
      name: "full",
      component: Full,
      beforeEnter(to, from, next) {
        Store.dispatch("resetView");
        next();
      }
    }
  ]
});
