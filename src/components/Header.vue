<template>
  <header>
    <div @click="$emit('toggle-drawer')">
      <i class="fas fa-bars"></i>
    </div>
    <h1>Книга рецептов</h1>
    <section class="info">
      <img
        class="avatar"
        v-if="!avatar"
        src="https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Cat-512.png"
        alt="User avatar"
      />
      <img class="avatar" v-if="avatar" :src="avatar" />
    </section>
    <router-link to="/login" v-if="!isLoggedIn">Login</router-link>
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

  h1 {
    font-size: 24px;
    font-weight: bold;
  }

  .fa-bars {
    cursor: pointer;
  }

  .info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    .avatar {
      border-radius: 50%;
      max-width: 48px;
      max-height: 48px;
      object-fit: cover;
    }

    .name {
      font-size: 14px;
      margin-top: 8px;
    }
  }
}
</style>
