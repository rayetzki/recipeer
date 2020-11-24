<template>
  <div class="recipe" v-if="recipe">
    <header class="recipe__header">
      <img
        :src="recipe.banner"
        alt="Баннер рецепта"
        class="recipe__header--banner"
      />
      <span class="recipe__header--back" @click="$router.go(-1)">
        <i class="fas fa-arrow-left"></i>
      </span>
      <span class="recipe__header--options">
        <i class="fas fa-ellipsis-h"></i>
      </span>
      <span
        @click="addBookmark(recipe.id)"
        v-show="!recipe.favourite"
        class="recipe__header--saved"
      >
        <i class="far fa-bookmark"></i>
      </span>
      <span
        @click="addBookmark(recipe.id)"
        v-show="recipe.favourite"
        class="recipe__header--saved"
      >
        <i class="fas fa-bookmark"></i>
      </span>
    </header>
    <main class="recipe__body">
      <section class="recipe__basic">
        <h2 class="recipe__basic--title">{{ recipe.title }}</h2>
        <ul class="recipe__basic--list">
          <li class="recipe__basic--time">
            <div class="recipe__basic--additional">
              <span class="recipe__basic--icon">
                <i class="far fa-clock"></i>
              </span>
              <h4>Время готовки</h4>
            </div>
            <div class="recipe__basic--main">
              <p>{{ recipe.cookingTime }}</p>
            </div>
          </li>
          <li class="recipe__basic--dayTime">
            <div class="recipe__basic--additional">
              <span class="recipe__basic--icon">
                <i class="fas fa-sun"></i>
              </span>
              <h4>Время суток</h4>
            </div>
            <div class="recipe__basic--main">
              <p>{{ capitalize(recipe.dayTime) }}</p>
            </div>
          </li>
          <li class="recipe__basic--cost">
            <div class="recipe__basic--additional">
              <span class="recipe__basic--icon">
                <i class="fas fa-wallet"></i>
              </span>
              <h4>Cтоимость</h4>
            </div>
            <div class="recipe__basic--main">
              <p>{{ parseBalance(recipe.cost) }}</p>
            </div>
          </li>
          <li class="recipe__basic--nutrition">
            <div class="recipe__basic--additional">
              <span class="recipe__basic--icon">
                <i class="fas fa-seedling"></i>
              </span>
              <h4>Тип питания</h4>
            </div>
            <div class="recipe__basic--main">
              <p>{{ convertNutritionType(recipe.nutritionType) }}</p>
            </div>
          </li>
          <li class="recipe__basic--author">
            <div class="recipe__basic--additional">
              <span class="recipe__basic--icon">
                <i class="fas fa-user-edit"></i>
              </span>
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
            v-for="(description, index) in recipe.body.split('. ')"
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
import { addFavourite } from "../store/favourites/favourites.actions";
import { getRecipeById } from "../store/recipes/recipes.actions";
import { parseBalance } from "../utils/parseBalance";
import { convertNutritionType } from "../utils/convertNutritionType";

export default {
  name: "Recipe",
  data() {
    return {
      id: this.$route.query.id,
      recipe: null
    };
  },
  mounted() {
    getRecipeById(this.id).then(recipe => {
      this.recipe = recipe;
    });
  },
  methods: {
    addBookmark(id) {
      return addFavourite(id).then(() => {
        this.recipe = { ...this.recipe, favourite: !this.recipe.favourite };
      });
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
