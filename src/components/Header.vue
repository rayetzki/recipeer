<template>
  <header>
    <img
      class="header__avatar"
      v-if="!avatar"
      src="https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Cat-512.png"
      alt="User avatar"
    />
    <img class="header__avatar" v-if="avatar" :src="avatar" />
    <router-link to="/">Home</router-link>
    <router-link to="/login" v-if="!isLoggedIn">Login</router-link>
    <router-link to="" v-if="isLoggedIn">
      <span @click="logout">Logout</span>
    </router-link>
  </header>
</template>

<script>
export default {
  name: "app-header",
  props: {
    avatar: String || null,
    isLoggedIn: Boolean
  },
  methods: {
    logout() {
      return this.$store.dispatch("auth/logout", null, { root: true });
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
  padding: 16px;

  .header__avatar {
    border-radius: 50%;
    max-width: 48px;
    max-height: 48px;
    object-fit: cover;
  }
}
</style>
