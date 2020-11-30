<template>
  <div class="recipe" v-if="recipe">
    <header class="recipe__header">
      <img
        :src="recipe.banner"
        alt="Баннер рецепта"
        class="recipe__header--banner"
      />
      <fa-icon
        icon="fas fa-arrow-left"
        name="recipe__header--back"
        @click="$router.go(-1)"
      >
      </fa-icon>
      <fa-icon
        @click="toggleSaved(recipe.id)"
        v-if="!recipe.favourite"
        class="recipe__header--saved"
        icon="far fa-bookmark"
      >
      </fa-icon>
      <fa-icon
        @click="toggleSaved(recipe.id)"
        v-else-if="recipe && recipe.favourite"
        class="recipe__header--saved"
        icon="fas fa-bookmark"
      >
      </fa-icon>
    </header>
    <spinner :open="recipe === undefined"></spinner>
    <main class="recipe__body">
      <section class="recipe__basic">
        <h2 class="recipe__basic--title">{{ recipe.title }}</h2>
        <ul class="recipe__basic--list">
          <li class="recipe__basic--time">
            <div class="recipe__basic--additional">
              <fa-icon icon="far fa-clock" class="recipe__basic--icon">
              </fa-icon>
              <h4>Время готовки</h4>
            </div>
            <div class="recipe__basic--main">
              <p>{{ recipe.cookingTime }}</p>
            </div>
          </li>
          <li class="recipe__basic--dayTime">
            <div class="recipe__basic--additional">
              <fa-icon icon="fas fa-sun" class="recipe__basic--icon"></fa-icon>
              <h4>Время суток</h4>
            </div>
            <div class="recipe__basic--main">
              <p>{{ capitalize(recipe.dayTime) }}</p>
            </div>
          </li>
          <li class="recipe__basic--cost">
            <div class="recipe__basic--additional">
              <fa-icon icon="fas fa-wallet" class="recipe__basic--icon">
              </fa-icon>
              <h4>Cтоимость</h4>
            </div>
            <div class="recipe__basic--main">
              <p>{{ parseBalance(recipe.cost) }}</p>
            </div>
          </li>
          <li class="recipe__basic--nutrition">
            <div class="recipe__basic--additional">
              <fa-icon icon="fas fa-seedling" class="recipe__basic--icon">
              </fa-icon>
              <h4>Тип питания</h4>
            </div>
            <div class="recipe__basic--main">
              <p>{{ convertNutritionType(recipe.nutritionType) }}</p>
            </div>
          </li>
          <li class="recipe__basic--author">
            <div class="recipe__basic--additional">
              <fa-icon
                icon="fas fa-user-edit"
                class="recipe__basic--icon"
              ></fa-icon>
              <h4>Автор</h4>
            </div>
            <div class="recipe__basic--main">
              <p>{{ recipe.author.name }}</p>
            </div>
          </li>
        </ul>
      </section>
      <section class="recipe__ingredients">
        <h2 class="recipe__ingredients--title">Ингредиенты</h2>
        <ul class="recipe__ingredients--list">
          <li
            class="recipe__ingredients--item"
            :key="item.ingredient"
            v-for="item in recipe.ingredients"
          >
            <span class="recipe__ingredients--ingredient">
              {{ item.ingredient }}
            </span>
            <span class="recipe__ingredients--unit">{{ item.unit }}</span>
          </li>
        </ul>
      </section>
      <section class="recipe__steps">
        <h2 class="recipe__steps--title">Описание</h2>
        <ul class="recipe__steps--list">
          <li
            :key="index"
            class="recipe__steps--item"
            v-for="(description, index) in recipe.body
              .split('. ')
              .filter(step => step.length > 0)"
          >
            <span class="recipe__steps--index">{{ `${++index}-й шаг` }}</span>
            <span class="recipe__steps--description">{{ description }}</span>
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script>
import Spinner from "../components/Spinner";
import {
  addFavourite,
  removeFavourite
} from "../store/favourites/favourites.actions";
import { getRecipeById } from "../store/recipes/recipes.actions";
import { parseBalance } from "../utils/parseBalance";
import { convertNutritionType } from "../utils/convertNutritionType";
import FaIcon from "../components/FaIcon.vue";

export default {
  name: "Recipe",
  components: {
    spinner: Spinner,
    FaIcon
  },
  data() {
    return {
      id: this.$route.query.id,
      recipe: undefined
    };
  },
  mounted() {
    getRecipeById(this.id).then(recipe => {
      this.recipe = recipe;
    });
  },
  methods: {
    toggleSaved(id) {
      if (!this.recipe.favourite) {
        addFavourite(id).then(() => {
          this.recipe.favourite = !this.recipe.favourite;
        });
      } else {
        removeFavourite(id).then(() => {
          this.recipe.favourite = !this.recipe.favourite;
        });
      }
    },
    capitalize(text) {
      return text
        .slice(0, 1)
        .toUpperCase()
        .concat(text.slice(1));
    },
    parseBalance,
    convertNutritionType
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/modules/recipe.scss";
</style>
