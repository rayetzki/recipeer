<template>
  <div class="home">
    <el-drawer
      title="Рецепты других пользователей"
      :visible.sync="openDrawer"
      :direction="'ltr'"
    ></el-drawer>
    <app-header
      :avatar="user && user.avatar"
      :isLoggedIn="isLoggedIn"
      @toggle-drawer="openDrawer = !openDrawer"
    ></app-header>
    <recipes-list></recipes-list>
  </div>
</template>

<script>
import { Drawer } from "element-ui";
import { mapGetters } from "vuex";
import Header from "../components/Header";
import Recipes from "../views/Recipes";

export default {
  name: "Home",
  components: {
    "app-header": Header,
    "el-drawer": Drawer,
    "recipes-list": Recipes
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
  }
};
</script>
