<template>
  <div class="home">
    <el-drawer
      title="Рецепты других пользователей"
      :visible.sync="openDrawer"
      :direction="'ltr'"
      :size="'300px'"
    >
      <router-link to="" v-if="isLoggedIn">
        <span class="logout" @click="logout">Выйти</span>
      </router-link>
    </el-drawer>
    <app-header
      :avatar="user && user.avatar"
      @toggle-drawer="openDrawer = !openDrawer"
    ></app-header>
  </div>
</template>

<script>
import { Drawer } from "element-ui";
import { mapGetters } from "vuex";
import Header from "../components/Header";

export default {
  name: "Home",
  components: {
    "app-header": Header,
    "el-drawer": Drawer
  },
  data() {
    return {
      openDrawer: false
    };
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "auth/isLoggedIn",
      user: "user/user"
    })
  },
  methods: {
    logout() {
      return this.$store.dispatch("auth/logout", null, { root: true });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/theme.scss";

.logout {
  position: absolute;
  bottom: 32px;
  margin-left: -36px;
  border: 1px dotted $borderRed;
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
</style>
