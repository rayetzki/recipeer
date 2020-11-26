<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view :key="$route.path"></router-view>
    </transition>
    <app-navigation :role="user.role" v-if="isLoggedIn"></app-navigation>
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
      isLoggedIn: "auth/isLoggedIn",
      user: "user/user",
      token: "auth/token",
      refresh: "auth/refreshToken"
    })
  },
  created() {
    const expiration = this.token && this.token.expiresIn - Date.now();
    const refreshExpiration =
      this.refresh && this.refresh.refreshExpiresIn - Date.now();

    if (expiration > 0 && refreshExpiration > 0) {
      setTimeout(() => {
        store.dispatch(
          "auth/refresh",
          { userId: this.user.id, refreshToken: this.refresh.refreshToken },
          { root: true }
        );
      }, expiration);
    }

    if (expiration < 0 && refreshExpiration < 0) {
      store.dispatch("auth/logout", null, { root: true });
    }

    axios.defaults.baseURL = BASE_URL;

    axios.interceptors.request.use(config => {
      if (this.token !== null) {
        const token = this.token.accessToken;
        axios.defaults.headers["Authorization"] = `Bearer ${token}`;
      }
      return Promise.resolve(config);
    });

    axios.interceptors.response.use(undefined, error => {
      if (error.response.status === 401) {
        const originalRequest = error.config;
        store
          .dispatch(
            "auth/refresh",
            { userId: this.user.id, refreshToken: this.refresh.refreshToken },
            { root: true }
          )
          .then(() => {
            const token = this.token.accessToken;
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return new Promise((resolve, reject) => {
              axios
                .request(originalRequest)
                .then(response => {
                  resolve(response);
                })
                .catch(error => {
                  reject(error);
                });
            });
          });
      }
      return Promise.reject(error);
    });
  }
};
</script>

<style lang="scss">
@import "./styles/globals.scss";
</style>
