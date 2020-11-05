<template>
  <div class="home">
    <app-header
      :avatar="user && user.avatar"
      :isLoggedIn="isLoggedIn"
    ></app-header>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Header from "../components/Header";

export default {
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
};
</script>
