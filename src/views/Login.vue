<template>
  <div id="login">
    <spinner :open="loading"></spinner>
    <form class="form__centered">
      <h3 class="form__header">Задай email и пароль</h3>
      <FormInput
        name="email"
        type="email"
        inputmode="email"
        placeholder="Введите email"
        v-model="values.email"
        :error="errors.email"
        @validate="validate('email')"
      />
      <FormInput
        name="password"
        inputmode="password"
        placeholder="Введите пароль"
        v-model="values.password"
        type="password"
        :error="errors.password"
        @validate="validate('password')"
      />
      <Button
        @click.prevent="login"
        class="el-fade-in-linear"
        :disabled="disabled"
      >
        Залогиниться
      </Button>
      <router-link class="form__signup" to="/signup">
        Cоздать новый аккаунт
      </router-link>
    </form>
    <Alert v-if="error" title="Произошла ошибка" show-icon type="error">
      {{ error }}
    </Alert>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Button, Alert } from "element-ui";
import { LoginValidationSchema } from "../validation-schemas/Login.schema";
import { validateField } from "../utils/runValidation";
import Spinner from "../components/Spinner";
import FormInput from "../components/FormInput";

export default {
  name: "Login",
  components: {
    FormInput,
    Button,
    Alert,
    spinner: Spinner
  },
  data: () => ({
    values: {
      email: "",
      password: ""
    },
    errors: {
      email: "",
      password: ""
    }
  }),
  computed: {
    ...mapGetters({
      user: "user/user",
      loading: "auth/loading",
      error: "auth/error"
    }),
    disabled() {
      return (
        this.loading ||
        Object.values(this.values).some(value => value.length === 0) ||
        Object.values(this.errors).some(error => error.length > 0)
      );
    }
  },
  methods: {
    login() {
      return this.$store.dispatch("auth/login", this.values, { root: true });
    },
    validate(field) {
      return validateField(
        LoginValidationSchema,
        field,
        this.values,
        this.errors
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/forms.scss";

#login {
  .form__signup {
    text-decoration: underline;
  }
}
</style>
