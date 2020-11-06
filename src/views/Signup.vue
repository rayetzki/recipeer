<template>
  <div id="signup">
    <form>
      <h3 class="form__header">
        Регистрация в книге рецептов
      </h3>
      <Select
        size="large"
        name="nutrition"
        class="form__input"
        v-model="values.nutrition"
        placeholder="Тип питания"
      >
        <Option
          v-for="item in nutritionTypes"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </Select>
      <Select
        size="large"
        name="role"
        class="form__input"
        v-model="values.role"
        placeholder="Тип питания"
      >
        <Option
          v-for="role in roles"
          :key="role.value"
          :label="role.label"
          :value="role.value"
        />
      </Select>
      <FormInput
        type="text"
        name="name"
        :error="errors.name"
        v-model="values.name"
        placeholder="Укажи своё имя"
        @validate="validate('name')"
      />
      <FormInput
        type="number"
        name="age"
        inputmode="decimal"
        v-model="values.age"
        placeholder="Возраст"
        :error="errors.age"
        @validate="validate('age')"
      />
      <FormInput
        type="email"
        name="email"
        v-model="values.email"
        placeholder="Почтовый адрес"
        :error="errors.email"
        @validate="validate('email')"
      />
      <FormInput
        type="password"
        name="password"
        v-model="values.password"
        placeholder="Придумай пароль"
        :error="errors.password"
        inputMode="decimal"
        @validate="validate('password')"
      />
      <Button
        @click.prevent="register"
        class="el-fade-in-linear"
        type="submit"
        :disabled="disabled"
      >
        Дальше
      </Button>
    </form>
  </div>
</template>

<script>
import { Select, Option, Button } from "element-ui";
import FormInput from "../components/FormInput";
import { nutritionTypes } from "../data/nutritionTypes";
import { validateField } from "../utils/runValidation";
import { SignupValidationSchema } from "../validation-schemas/Singup.schema";
import store from "../store";

export default {
  store,
  name: "Signup",
  components: {
    FormInput,
    Select,
    Option,
    Button
  },
  data() {
    return {
      values: {
        name: "",
        age: "",
        email: "",
        nutrition: "any",
        password: "",
        role: "user"
      },
      nutritionTypes,
      roles: [
        { value: "editor", label: "Редактор" },
        { value: "user", label: "Пользователь" }
      ],
      errors: {
        name: "",
        age: "",
        email: "",
        password: ""
      }
    };
  },
  computed: {
    disabled() {
      return (
        this.loading ||
        Object.values(this.values).some(value => value.length === 0)
      );
    }
  },
  methods: {
    validate(field) {
      validateField(SignupValidationSchema, field, this.values, this.errors);
    },
    register() {
      return this.$store.dispatch("user/register", this.values, { root: true });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/forms.scss";

#signup {
  @include centered-form;

  .el-select {
    min-width: 100%;
  }

  .form__header {
    @include form-header;
  }
}
</style>
