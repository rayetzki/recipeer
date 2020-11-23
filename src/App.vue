<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view :key="$route.path"></router-view>
    </transition>
    <app-navigation v-if="isLoggedIn"></app-navigation>
  </div>
</template>

<script>
import axios from "axios";
import store from "./store";
import { mapGetters } from "vuex";
import { BASE_URL } from "./config/API";
import Navigation from "./components/Navigation.vue";

export default {
  name: "app",
  store,
  components: {
    "app-navigation": Navigation
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "auth/isLoggedIn"
    })
  },
  created() {
    axios.defaults.baseURL = BASE_URL;
    axios.interceptors.request.use(config => {
      const token = this.$store.getters["auth/token"];
      if (token !== null) {
        config.headers["Authorization"] = `Bearer ${token.accessToken}`;
      }
      return Promise.resolve(config);
    });
    axios.interceptors.response.use(undefined, error => {
      return new Promise((resolve, reject) => {
        if (error.status >= 401) {
          store.dispatch("auth/logout", null, { root: true });
          resolve();
        }
        reject(error);
      });
    });
  },
  beforeMount() {
    const user = this.$store.getters["user/user"];
    const access = this.$store.getters["auth/token"];
    const refresh = this.$store.getters["auth/refreshToken"];
    const expiration = access && access.expiresIn - Date.now();
    const refreshExpiration = refresh && refresh.refreshExpiresIn - Date.now();

    if (expiration > 0 && refreshExpiration > 0) {
      setTimeout(() => {
        store.dispatch(
          "auth/refresh",
          { userId: user.id, refreshToken: refresh.refreshToken },
          { root: true }
        );
      }, expiration);
    }

    if (expiration < 0 && refreshExpiration > 0) {
      store.dispatch(
        "auth/refresh",
        { userId: user.id, refreshToken: refresh.refreshToken },
        { root: true }
      );
    }

    if (expiration < 0 && refreshExpiration < 0) {
      store.dispatch("auth/logout", null, { root: true });
    }
  }
};
</script>

<style lang="scss">
@import "./styles/globals.scss";
</style>
