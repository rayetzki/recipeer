<template>
  <div id="login">
    <form>
      <h3 class="form__header">Введите email или пароль</h3>
      <FormInput
        name="email"
        type="email"
        placeholder="Введите email"
        v-model="values.email"
        :error="errors.email"
        @validate="validate('email')"
      />
      <FormInput
        name="password"
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
import { Button, Alert } from "element-ui";
import { mapGetters } from "vuex";
import FormInput from "../components/FormInput";
import { LoginValidationSchema } from "../validation-schemas/Login.schema";
import { validateField } from "../utils/runValidation";

export default {
  name: "Login",
  components: {
    FormInput,
    Button,
    Alert
  },
  data() {
    return {
      values: {
        email: "",
        password: ""
      },
      errors: {
        email: "",
        password: ""
      }
    };
  },
  computed: {
    ...mapGetters({
      user: "user/user",
      loading: "user/loading",
      error: "user/error"
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
      return this.$store.dispatch("user/login", this.values);
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
  @include centered-form;

  .form__header {
    @include form-header;
  }

  .form__signup {
    text-decoration: underline;
  }
}
</style>
