import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("../views/Signup.vue")
  },
  {
    path: "/recipes",
    name: "Recipes",
    component: () => import("../views/Recipes.vue"),
    props: true,
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth)) {
    const isLoggedIn = store.getters["auth/isLoggedIn"];
    if (isLoggedIn === false) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
