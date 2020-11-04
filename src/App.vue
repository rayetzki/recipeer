<template>
  <div id="app">
    <Header />
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import { BASE_URL } from './config/API'
import Header from './components/Header'
import store from './store'

export default {
  name: 'app',
  store,
  components: {
    Header
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/isLoggedIn'
    })
  },
  created: function () {
    axios.defaults.baseURL = BASE_URL;
    axios.interceptors.request.use(function (config) {
        // eslint-disable-next-line no-unused-vars
        return new Promise(function (resolve, reject) {
          const token = JSON.parse(localStorage.getItem('token')) || null
          if (token !== null) {
            config.headers['Authorization'] = `Bearer ${token.jwt}`
          }
          resolve(config)
        })
    }, function(error) {
        return Promise.reject(error)
      }
    )
    
    axios.interceptors.response.use(undefined, function (error) {
      return new Promise(function (resolve, reject) {
        if (error.status === 401 && error.config && !error.config.__isRetryRequest) {
          resolve(this.$store.dispatch("logout"))
        }
        reject(error);
      });
    });
  }
}
</script>

<style lang="scss">
@import 'reset-css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
