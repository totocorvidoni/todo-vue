import Vue from "vue";
import Router from "vue-router";
import Quick from "@/views/Quick.vue";
import Full from "@/views/Full.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "quick",
      component: Quick
    },
    {
      path: "/full",
      name: "full",
      component: Full
    }
  ]
});
