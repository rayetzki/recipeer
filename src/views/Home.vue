<template>
  <div class="home">
    <app-header
      :avatar="user && user.avatar"
      :isLoggedIn="isLoggedIn"
    ></app-header>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters } from "vuex";
import Header from "../components/Header";

const Home = new Vue({
  name: "Home",
  components: {
    "app-header": Header
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "auth/isLoggedIn",
      user: "user/user"
    })
  }
});

export default Home;
</script>
