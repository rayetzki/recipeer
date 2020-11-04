<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/login">Login</router-link>
      <span v-if="isLoggedIn"> | <a @click="logout">Logout</a></span>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import store from './store'
import axios from 'axios'

export default {
  name: 'app',
  store,
  data() {
    return {
      isLoggedIn: !!localStorage.getItem('token') || false
    }
  },
  created: function () {
    axios.interceptors.request.use(function (config) {
        // eslint-disable-next-line no-unused-vars
        return new Promise(function (resolve, reject) {
          const token = localStorage.getItem('token') || null
          if (token !== null) {
            console.log(token)
            config.headers['Authorization'] = `Bearer ${token}`
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
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
        .then(() => this.$router.push('/login'))
        .catch(error => console.error(error))
    }
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
