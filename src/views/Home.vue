<template>
  <div class="home">
    <el-drawer
      title="Рецепты других пользователей"
      :visible.sync="openDrawer"
      :direction="'ltr'"
    >
    </el-drawer>
    <app-header
      :avatar="user && user.avatar"
      :isLoggedIn="isLoggedIn"
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
  }
};
</script>
