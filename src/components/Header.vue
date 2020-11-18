<template>
  <header>
    <div @click="$emit('toggle-drawer')">
      <i class="fas fa-bars"></i>
    </div>
    <h1>Книга рецептов</h1>
    <section class="info">
      <router-link to="/update-user">
        <img class="avatar" v-if="avatar" :src="avatar" />
      </router-link>
    </section>
  </header>
</template>

<script>
export default {
  name: "app-header",
  props: {
    avatar: String || null
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
      width: 36px;
      height: 36px;
      object-fit: cover;
    }

    .name {
      font-size: 14px;
      margin-top: 8px;
    }
  }
}
</style>
