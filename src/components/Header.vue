<template>
  <header>
    <img
      class="header__avatar"
      v-if="!user || !user.avatar"
      src="https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Cat-512.png"
      alt="User avatar"
    />
    <img class="header__avatar" v-if="user && user.avatar" :src="user.avatar" />
    <router-link to="/">Home</router-link>
    <router-link to="/login" v-if="!isLoggedIn">Login</router-link>
    <router-link to="" v-if="isLoggedIn" @click="logout">Logout</router-link>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Header",
  computed: {
    ...mapGetters({
      isLoggedIn: "auth/isLoggedIn",
      user: "user/user"
    })
  },
  methods: {
    logout() {
      return this.$store.dispatch("auth/logout");
    }
  }
};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  .header__avatar {
    border-radius: 50%;
    max-width: 48px;
    max-height: 48px;
    object-fit: cover;
  }
}
</style>
