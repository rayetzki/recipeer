<template>
  <div class="add-edit-recipe">
    <spinner :open="recipe === undefined"></spinner>
    <banner-upload
      v-if="recipe"
      :banner="values.banner === 'string' ? values.banner : bannerPreview"
      title="Загрузи картинку рецепта"
      @fileload="addBanner"
      @clearfile="clearBanner"
    ></banner-upload>
    <form class="add-edit-recipe__form" v-if="recipe">
      <h3 class="add-edit-recipe__title">Обновить данные о рецепте</h3>
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
      <Select
        size="large"
        name="nutritionType"
        class="add-edit-recipe__nutrition-type"
        v-model="values.nutritionType"
        placeholder="Тип питания"
      >
        <Option
          v-for="type in nutritionTypes"
          :key="type.value"
          :label="type.label"
          :value="type.value"
        />
      </Select>
      <Select
        size="large"
        name="nutritionType"
        class="add-edit-recipe__dayTime"
        v-model="values.dayTime"
        placeholder="Время суток"
      >
        <Option
          v-for="dayTime in dayTimes"
          :key="dayTime"
          :label="capitalize(dayTime)"
          :value="dayTime"
        />
      </Select>
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
      <ul class="ingredients">
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
            <fa-icon
              v-if="index === values.ingredients.length - 1"
              v-show="
                errors.ingredients[index] && !errors.ingredients[index].unit
              "
              @action="appendIngredient"
              class="ingredients__append"
              icon="far fa-plus-square"
            >
            </fa-icon>
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
            <fa-icon
              @action="removeIngredient(index)"
              v-if="
                values.ingredients.length > 1 &&
                  index === values.ingredients.length - 1
              "
              v-show="
                errors.ingredients[index] &&
                  !errors.ingredients[index].ingredient
              "
              class="ingredients__remove"
              icon="fas fa-trash"
            >
            </fa-icon>
          </FormInput>
        </li>
      </ul>
      <ul class="steps">
        <h3 class="steps__header">Шаги приготовления</h3>
        <li
          class="steps__item"
          v-for="(step, index) in values.body"
          :key="index"
        >
          <FormInput
            type="textarea"
            v-model="values.body[index]"
            :name="`step--${index}`"
            :placeholder="`${index + 1}-й шаг`"
            :error="errors.body[index]"
            @validate="validateCollection(`body.${index}`, index, errors.body)"
          >
            <fa-icon
              v-if="index === values.body.length - 1"
              v-show="!errors.body[index]"
              @action="appendStep"
              class="steps__append"
              icon="far fa-plus-square"
            >
            </fa-icon>
            <fa-icon
              @action="removeStep(index)"
              v-if="values.body.length > 1 && index === values.body.length - 1"
              v-show="!errors.body[index]"
              class="steps__remove"
              icon="fas fa-trash"
            >
            </fa-icon>
          </FormInput>
        </li>
      </ul>
      <Button @click.prevent="updateRecipe" class="add-edit-recipe__submit">
        Обновить
      </Button>
    </form>
    <Alert v-if="error" title="Произошла ошибка" show-icon type="error">
      {{ error }}
    </Alert>
  </div>
</template>

<script>
import { editRecipe, getRecipeById } from "../store/recipes/recipes.actions";
import { nutritionTypes } from "../data/nutritionTypes";
import { AddRecipeValidationSchema } from "../validation-schemas/AddRecipe.schema";
import { Select, Option, Button, Alert, Tag } from "element-ui";
import FormInput from "../components/FormInput";
import Spinner from "../components/Spinner.vue";
import BannerUpload from "../components/BannerUpload.vue";
import {
  validateArray,
  validateField,
  validateObject
} from "../utils/runValidation";
import FaIcon from "../components/FaIcon.vue";

export default {
  name: "EditRecipe",
  components: {
    FormInput,
    Button,
    Alert,
    Select,
    Option,
    spinner: Spinner,
    "el-tag": Tag,
    "banner-upload": BannerUpload,
    FaIcon
  },
  data: () => ({
    recipe: undefined,
    error: "",
    tags: ["минут", "час(а)"],
    bannerPreview: "",
    nutritionTypes,
    dayTimes: ["завтрак", "обед", "полудник", "перекус", "ужин"],
    errors: {
      title: "",
      description: "",
      body: [""],
      ingredients: [{ unit: "", ingredient: "" }],
      cost: "",
      cookingTime: "",
      banner: "",
      nutritionType: "any"
    },
    values: {
      title: "",
      description: "",
      body: [""],
      ingredients: [{ unit: "", ingredient: "" }],
      cost: "",
      cookingTime: "",
      banner: ""
    }
  }),
  mounted() {
    getRecipeById(this.$route.query.id).then(recipe => {
      this.recipe = recipe;
      this.values = {
        title: recipe.title,
        description: recipe.description,
        body: recipe.body.split(". "),
        ingredients: recipe.ingredients,
        cost: recipe.cost,
        cookingTime: recipe.cookingTime,
        banner: recipe.banner,
        dayTime: recipe.dayTime,
        nutritionType: recipe.nutritionType
      };
    });
  },
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
    validateCollection(field, index, errors) {
      return validateArray(
        AddRecipeValidationSchema,
        field,
        index,
        this.values,
        errors,
        this
      );
    },
    updateRecipe() {
      editRecipe(this.$route.query.id, this.values).catch(
        error => (this.error = error.message)
      );
    },
    addBanner(event) {
      const file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.addEventListener("load", event => {
        this.bannerPreview = event.target.result;
        this.values.banner = file;
      });
      fileReader.readAsDataURL(file);
    },
    appendTag(tag, name) {
      const value = this.values[name];
      if (/\D+/g.test(value)) {
        this.values[name] = value.replaceAll(/\D+/g, ` ${tag}`);
      } else {
        this.values[name] = value.concat(` ${tag}`);
      }
    },
    clearBanner() {
      this.bannerPreview = "";
      this.$set(this.values, "banner", "");
    },
    appendIngredient() {
      this.values.ingredients.push({ unit: "", ingredient: "" });
    },
    removeIngredient(index) {
      this.values.ingredients.splice(index, 1);
    },
    appendStep() {
      this.values.body.push("");
    },
    removeStep(index) {
      this.values.body.splice(index, 1);
    },
    capitalize(text) {
      return text
        .slice(0, 1)
        .toUpperCase()
        .concat(text.slice(1));
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/modules/add-edit-recipe.scss";
</style>
