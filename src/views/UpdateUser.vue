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
            @change="previewImage"
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
      <Button
        @click.prevent="login"
        class="el-fade-in-linear"
        :disabled="disabled"
      >
        Обновить
      </Button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FormInput from "../components/FormInput.vue";
import { Button } from "element-ui";
import { validateField } from "../utils/runValidation";
import { UpdateUserValidationSchema } from "../validation-schemas/UpdateUser.schema";

export default {
  name: "UpdateUser",
  components: {
    FormInput,
    Button
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
      error: "",
      errors: {
        email: "",
        name: "",
        age: "",
        avatar: ""
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
    previewImage(event) {
      const reader = new FileReader();
      const file = event.target.files[0];

      reader.addEventListener("load", event => {
        this.$set(this.user, "avatar", event.target.result);
      });

      reader.readAsDataURL(file);
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
