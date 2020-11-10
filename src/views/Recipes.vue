<template>
  <div id="recipes">
    <header>
      <h1 class="recipes__title">Рецепты</h1>
      <div class="recipes__options">
        <span id="search"><i class="fas fa-search"></i></span>
        <span id="settings"><i class="fas fa-cog"></i></span>
      </div>
    </header>
    <h5 v-if="recipes && recipes.length === 0" class="recipes__empty-list">
      No recipes, please add one
    </h5>
    <ul class="recipes__grid" v-if="recipes && recipes.length >= 0">
      <li
        class="recipes__preview"
        @click="showRecipesDetails(recipe.id)"
        :key="recipe.id"
        v-for="recipe in recipes"
      >
        <img
          src="https://keyassets-p2.timeincuk.net/wp/prod/wp-content/uploads/sites/53/2018/07/Cheap-family-meals-Recipes-under-%C2%A31-per-head-scaled.jpg"
          alt="Recipe banner"
          class="recipes__preview--banner"
        />
        <div class="recipes__info">
          <h5 class="recipes__info--header">{{ recipe.title }}</h5>
          <div class="recipes__info--secondary">
            <div class="recipes__info--time">
              <i class="far fa-clock"></i>
              <p>{{ recipe.cookingTime }}</p>
            </div>
            <span class="recipes__info--cost">
              Примерная стоимость: {{ convertPrice(recipe.cost) }}
            </span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getRecipes } from "../store/recipes/recipes.actions";
import { parseBalance } from "../utils/parseBalance";

export default {
  name: "recipes-list",
  data() {
    return {
      recipes: [],
      page: 1
    };
  },
  watch: {
    page() {
      return this.getRecipes(this.page);
    }
  },
  mounted() {
    getRecipes().then(recipesData => {
      this.setRecipes(recipesData.recipes);
    });
  },
  methods: {
    setRecipes(recipesData) {
      this.recipes = recipesData;
    },
    setPage(page) {
      this.page = page;
    },
    getRecipes(page) {
      return getRecipes(page);
    },
    showRecipesDetails(id) {
      this.$router.push({
        name: "Recipe",
        query: { id }
      });
    },
    convertPrice(balance) {
      return parseBalance(balance);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/modules/recipes.scss";

#recipes {
  padding: 24px;
}
</style>
