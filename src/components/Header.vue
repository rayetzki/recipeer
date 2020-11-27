<template>
  <header>
    <Button class="logout" @click="$emit('logout')">Выйти</Button>
    <h1>Книга рецептов</h1>
    <router-link to="/update-user">
      <img class="avatar" v-if="avatar" :src="avatar" />
    </router-link>
  </header>
</template>

<script>
import { Button } from "element-ui";

export default {
  name: "app-header",
  components: {
    Button
  },
  props: {
    avatar: String || null
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/theme.scss";

header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;

  h1 {
    font-size: 24px;
    font-weight: bold;
  }

  .fa-bars {
    cursor: pointer;
  }

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

  .logout {
    border-radius: 13px;
    padding: 16px;
    color: $textError;
    background-color: $whiteBg;

    &:hover {
      background-color: $borderRed;
      color: $textWhite;
      transition: background-color 0.7s ease,
        color 0.7s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
  }
}
</style>
