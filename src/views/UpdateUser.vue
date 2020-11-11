<template>
  <div id="update-user">
    <form class="form__centered">
      <h3 class="form__header">Здесь можно обновить данные о себе</h3>
      <section class="form__avatar">
        <img
          :src="
            user.avatar ||
              'https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Cat-512.png'
          "
          alt="Твоя аватарка"
        />
        <label class="form__file-label">
          Выбери аватарку
          <input
            name="avatar"
            title=" "
            accept="image/jpeg, image/png"
            @change="uploadAvatar"
            type="file"
          />
        </label>
      </section>
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
    <Alert
      v-if="error"
      title="Sorry, there is an error occured"
      show-icon
      type="error"
    >
      {{ error }}
    </Alert>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FormInput from "../components/FormInput.vue";
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
    Option
  },
  computed: {
    ...mapGetters({
      user: "user/user"
    }),
    disabled() {
      return Object.values(this.errors).some(error => error.length > 0);
    }
  },
  data() {
    return {
      nutritionTypes,
      error: "",
      errors: {
        email: "",
        name: "",
        age: ""
      }
    };
  },
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
      this.$store
        .dispatch("user/uploadAvatar", event.target.files[0])
        .then(avatar => {
          this.$set(this.user, "avatar", avatar);
        })
        .catch(error => {
          console.error(error);
          this.error = "Could'nt set an avatar";
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
