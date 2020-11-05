<template>
  <div id="signup">
    <form>
      <h3 class="form__header">
        Регистрация в книге рецептов
      </h3>
      <Select
        size="large"
        name="nutrition"
        class="signup__input"
        v-model="nutrition"
        placeholder="Тип питания"
      >
        <Option
          v-for="item in nutritionTypes"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </Select>
      <Input
        type="text"
        name="name"
        label="name"
        class="signup__input"
        v-model="name"
        placeholder="Имя"
      />
      <Input
        type="number"
        name="age"
        label="age"
        class="signup__input"
        inputmode="decimal"
        v-model="age"
        placeholder="Возраст"
      />
      <Input
        type="email"
        name="email"
        class="signup__input"
        label="email"
        v-model="email"
        placeholder="Почтовый адрес"
      />
      <Input
        type="password"
        name="password"
        class="signup__input"
        label="password"
        v-model="password"
        placeholder="Придумай пароль"
      />
    </form>
  </div>
</template>

<script>
import { Input, Select, Option } from "element-ui";
import { required, numeric, email } from "vuelidate/lib/validators";
import { nutritionTypes } from "../data/nutritionTypes";

export default {
  name: "Signup",
  components: {
    Input,
    Select,
    Option
  },
  data() {
    return {
      name: "",
      age: "",
      email: "",
      nutrition: "any",
      password: "",
      nutritionTypes
    };
  },
  validations: {
    name: {
      required
    },
    age: {
      required,
      numeric
    },
    password: {
      required
    },
    email: {
      email
    }
  }
};
</script>

<style lang="scss" scoped>
#signup {
  display: grid;
  grid-gap: 24px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% - 32px);
  padding: 0 16px;

  .signup__input {
    margin-bottom: 10px;
  }

  .form__header {
    font-size: 24px;
    color: currentColor;
    font-weight: bold;
    margin-bottom: 16px;
  }
}
</style>
