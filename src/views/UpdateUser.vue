<template>
  <div id="update-user">
    <form class="form__centered">
      <h3 class="form__header">Здесь можно обновить данные о себе</h3>
      <ImageUpload
        @upload="uploadAvatar"
        title="Выбери аватарку"
        :avatar="user.avatar"
      />
      <FormInput
        name="email"
        type="email"
        placeholder="Новый email"
        v-model="user.email"
        :error="errors.email"
        @validate="validate('email')"
      />
      <FormInput
        name="name"
        type="text"
        placeholder="Новое имя (да?)"
        v-model="user.name"
        :error="errors.name"
        @validate="validate('name')"
      />
      <FormInput
        name="age"
        type="number"
        placeholder="Сколько тебе уже?"
        v-model="user.age"
        :error="errors.age"
        @validate="validate('age')"
      />
      <Select
        size="large"
        name="nutrition"
        class="form__select"
        v-model="user.nutrition"
        placeholder="Изменил тип питания?"
      >
        <Option
          v-for="item in nutritionTypes"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </Select>
      <Button
        @click.prevent="load"
        class="el-fade-in-linear"
        :disabled="disabled"
      >
        Обновить
      </Button>
    </form>
    <Alert v-if="error" title="Произошла ошибка" show-icon type="error">
      {{ error }}
    </Alert>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FormInput from "../components/FormInput.vue";
import ImageUpload from "../components/ImageUpload.vue";
import { Button, Alert, Select, Option } from "element-ui";
import { nutritionTypes } from "../data/nutritionTypes";
import { validateField } from "../utils/runValidation";
import { UpdateUserValidationSchema } from "../validation-schemas/UpdateUser.schema";

export default {
  name: "UpdateUser",
  components: {
    FormInput,
    Button,
    Alert,
    Select,
    Option,
    ImageUpload
  },
  computed: {
    ...mapGetters({
      user: "user/user"
    }),
    disabled() {
      return Object.values(this.errors).some(error => error.length > 0);
    }
  },
  data: () => ({
    nutritionTypes,
    error: "",
    errors: {
      email: "",
      name: "",
      age: ""
    }
  }),
  methods: {
    validate(field) {
      return validateField(
        UpdateUserValidationSchema,
        field,
        this.user,
        this.errors
      );
    },
    uploadAvatar(event) {
      this.$store.dispatch("user/uploadAvatar", {
        id: this.user.id,
        avatar: event.target.files[0]
      });
    },
    load() {
      this.$store.dispatch("user/update", this.user);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/forms.scss";

.form__header {
  font-size: 16px;
}
</style>
