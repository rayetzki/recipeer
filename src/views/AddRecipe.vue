<template>
  <div class="add-recipe">
    <form class="form__centered">
      <h3 class="form__header">Добавь новый рецепт</h3>
      <FormInput
        name="title"
        type="text"
        placeholder="Введи название рецепта"
        v-model="values.title"
        :error="errors.title"
        @validate="validate('title')"
      />
      <FormInput
        name="description"
        type="textarea"
        placeholder="Введи описание рецепта"
        v-model="values.description"
        :error="errors.description"
        @validate="validate('description')"
      />
      <FormInput
        name="cost"
        type="number"
        placeholder="Введи примерную стоимость готового блюда"
        v-model="values.cost"
        :error="errors.cost"
        @validate="validate('cost')"
      />
      <FormInput
        name="cookingTime"
        type="text"
        placeholder="Введи примерное время приготовления"
        v-model="values.cookingTime"
        :error="errors.cookingTime"
        @validate="validate('cookingTime')"
        @append="appendTag(values.cookingTime)"
      >
        <div class="input__tags" v-if="!errors.cookingTime">
          <ul class="input__tags--list">
            <li
              v-for="tag in tags"
              :key="tag"
              @click="appendTag(tag, 'cookingTime')"
            >
              <el-tag type="info">{{ tag }}</el-tag>
            </li>
          </ul>
        </div>
      </FormInput>
      <ul class="ingredients__container">
        <h3 class="ingredients__header">Ингредиенты</h3>
        <li
          class="ingredients__item"
          v-for="(item, index) in values.ingredients"
          :key="index"
        >
          <FormInput
            :name="`unit--${index}`"
            type="text"
            placeholder="Ед. измер."
            v-model="item.unit"
            :error="errors.ingredients[index] && errors.ingredients[index].unit"
            @validate="
              validateNested(
                `ingredients[${index}].unit`,
                'unit',
                index,
                errors.ingredients
              )
            "
          >
            <span
              v-if="index === values.ingredients.length - 1"
              v-show="
                errors.ingredients[index] && !errors.ingredients[index].unit
              "
              @click="appendIngredient"
              class="ingredients__append"
            >
              <i class="far fa-plus-square"></i>
            </span>
          </FormInput>
          <FormInput
            :name="`ingredient--${index}`"
            type="text"
            placeholder="Ингредиент"
            v-model="item.ingredient"
            :error="
              errors.ingredients[index] && errors.ingredients[index].ingredient
            "
            @validate="
              validateNested(
                `ingredients[${index}].ingredient`,
                'ingredient',
                index,
                errors.ingredients
              )
            "
          >
            <span
              @click="removeIngredient(index)"
              v-if="
                values.ingredients.length > 1 &&
                  index === values.ingredients.length - 1
              "
              v-show="
                errors.ingredients[index] &&
                  !errors.ingredients[index].ingredient
              "
              class="ingredients__remove"
            >
              <i class="fas fa-trash"></i>
            </span>
          </FormInput>
        </li>
      </ul>
    </form>
    <Alert v-if="error" title="Произошла ошибка" show-icon type="error">
      {{ error }}
    </Alert>
  </div>
</template>

<script>
import { Alert, Tag } from "element-ui";
import { mapGetters } from "vuex";
import { validateField, validateObject } from "../utils/runValidation";
import FormInput from "../components/FormInput.vue";
import { AddRecipeValidationSchema } from "../validation-schemas/AddRecipe.schema";

export default {
  name: "AddRecipe",
  components: {
    Alert,
    FormInput,
    "el-tag": Tag
  },
  computed: {
    ...mapGetters({
      user: "user/user"
    })
  },
  data: () => ({
    loading: false,
    error: "",
    tags: ["минут", "час"],
    errors: {
      title: "",
      description: "",
      body: [],
      ingredients: [{ unit: "", ingredient: "" }],
      cost: "",
      cookingTime: "",
      banner: ""
    },
    values: {
      title: "",
      description: "",
      body: [],
      ingredients: [{ unit: "", ingredient: "" }],
      cost: "",
      cookingTime: "",
      banner: ""
    }
  }),
  methods: {
    validate(field) {
      return validateField(
        AddRecipeValidationSchema,
        field,
        this.values,
        this.errors
      );
    },
    validateNested(field, property, index, errors) {
      return validateObject(
        AddRecipeValidationSchema,
        field,
        property,
        index,
        this.values,
        errors,
        this
      );
    },
    appendTag(tag, name) {
      const value = this.values[name];
      if (/\D+/g.test(value)) {
        this.values[name] = value.replaceAll(/\D+/g, ` ${tag}`);
      } else {
        this.values[name] = value.concat(` ${tag}`);
      }
    },
    appendIngredient() {
      this.values.ingredients.push({ unit: "", ingredient: "" });
    },
    removeIngredient(index) {
      this.values.ingredients.splice(index, 1);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/forms.scss";

.add-recipe {
  margin-top: 128px;
}

.ingredients {
  &__container {
    margin: 32px 0 80px 0;
  }

  &__header {
    margin: 16px 0;
    font-size: 16px;
    font-weight: bold;
    text-align: left;
  }

  &__item {
    display: grid;
    grid-template-columns: 120px 1fr;
    align-items: center;
    grid-gap: 8px;
    margin-bottom: 8px;
  }

  &__append {
    position: absolute;
    left: 4px;
    top: 48px;
    bottom: 0;
  }

  &__remove {
    position: absolute;
    right: 4px;
    top: 48px;
    bottom: 0;
  }
}
</style>
