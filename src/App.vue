<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import axios from "axios";
import store from "./store";
import { BASE_URL } from "./config/API";
import { checkToken } from "./utils/checkToken";

export default {
  name: "app",
  store,
  created() {
    const token = JSON.parse(localStorage.getItem("token")) || null;
    if (token && !checkToken(token)) {
      this.$store.dispatch("auth/logout");
    }

    axios.defaults.baseURL = BASE_URL;
    axios.interceptors.request.use(
      config => {
        const token = JSON.parse(localStorage.getItem("token")) || null;
        // eslint-disable-next-line no-unused-vars
        return new Promise((resolve, reject) => {
          if (token !== null && checkToken(token)) {
            config.headers["Authorization"] = `Bearer ${token.jwt}`;
          }
          resolve(config);
        });
      },
      error => Promise.reject(error)
    );

    axios.interceptors.response.use(undefined, error => {
      return new Promise((resolve, reject) => {
        if (
          error.status >= 401 &&
          error.config &&
          !error.config.__isRetryRequest
        ) {
          resolve(this.$store.dispatch("auth/logout"));
        }
        reject(error);
      });
    });
  }
};
</script>

<style lang="scss">
@import "reset-css";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
