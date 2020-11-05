<template>
  <div id="login">
    <h3 class="form__header">Введите email или пароль</h3>
    <form>
      <Input
        class="form__input"
        autocomplete="email"
        clearable
        required
        autofocus
        label="email"
        name="email"
        placeholder="Введите email"
        v-model="email"
      />
      <Input
        class="form__input"
        clearable
        required
        label="password"
        name="password"
        placeholder="Введите пароль"
        v-model="password"
        type="password"
      />
      <Button
        @click.prevent="login"
        class="form__submit el-fade-in-linear"
        type="submit"
        :disabled="disabled"
      >
        Залогиниться
      </Button>
    </form>
    <Alert
      v-if="error"
      title="Sorry, there is an error occured"
      show-icon
      type="error"
    >
      {{ error }}
    </Alert>
    <router-link class="form__signup" to="/signup">
      Cоздать новый аккаунт
    </router-link>
  </div>
</template>

<script>
import { Input, Button, Alert } from "element-ui";
import { mapGetters } from "vuex";

export default {
  name: "Login",
  components: {
    Input,
    Button,
    Alert
  },
  data() {
    return {
      email: "",
      password: ""
    };
  },
  computed: {
    ...mapGetters({
      user: "user/user",
      loading: "user/loading",
      error: "user/error"
    }),
    disabled() {
      return this.loading || !this.email || !this.password;
    }
  },
  methods: {
    login() {
      return this.$store.dispatch("user/login", {
        email: this.email,
        password: this.password
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/forms.scss";

#login {
  @include centered-form;

  .form__header {
    @include form-header;
  }

  .form__input {
    @include form-input;
  }

  .form__signup {
    text-decoration: underline;
  }
}
</style>
