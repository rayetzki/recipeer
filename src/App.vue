<template>
  <div id="app">
    <router-view></router-view>
    <app-navigation v-if="isLoggedIn"></app-navigation>
  </div>
</template>

<script>
import axios from "axios";
import store from "./store";
import { mapGetters } from "vuex";
import { BASE_URL } from "./config/API";
import { checkToken } from "./utils/checkToken";
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
    const token = this.$store.getters["auth/token"];
    const refreshIn = token
      ? new Date(token.expiresIn).getTime() - new Date().getTime()
      : 0;

    if (token && !checkToken(token)) store.dispatch("auth/logout");

    if (refreshIn > 0) {
      setTimeout(() => {
        store.dispatch("auth/refresh", null, { root: true });
      }, refreshIn);
    }

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
  }
};
</script>

<style lang="scss">
@import "reset-css";
@import "./styles/theme.scss";

span,
p,
h1,
h2,
h3,
h4,
h5,
h6,
li,
time {
  font-family: $primary-font;
}

#app {
  font-family: $primary-font;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $textPrimary;
}

#app nav {
  display: flex;
  flex-direction: row;
  align-self: center;
  justify-content: space-around;
}

a {
  text-decoration: none;
  color: currentColor;
  font-size: 16px;
  margin: 8px 0;
}
</style>
