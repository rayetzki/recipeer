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
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/recipe",
    name: "Recipe",
    exact: true,
    component: () => import("../views/Recipe.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/my-recipes",
    name: "MyRecipes",
    component: () => import("../views/MyRecipes.vue"),
    meta: {
      requiresAuth: true,
      forEditors: true
    }
  },
  {
    path: "/update-user",
    name: "UpdateUser",
    component: () => import("../views/UpdateUser.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/favourites",
    name: "Favourites",
    component: () => import("../views/Favourites.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/add-recipe",
    name: "AddRecipe",
    component: () => import("../views/AddRecipe.vue"),
    meta: {
      requiresAuth: true,
      forEditors: true
    }
  },
  {
    path: "/edit-recipe",
    name: "EditRecipe",
    component: () => import("../views/EditRecipe.vue"),
    meta: {
      requiresAuth: true,
      forEditors: true
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
  } else if (to.matched.some(route => route.meta.forEditors)) {
    const user = store.getters["user/user"];
    if (user.role === "user") {
      next("recipes");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
