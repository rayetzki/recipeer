<template>
  <div id="recipes">
    <h5 v-if="recipes && recipes.length === 0">No recipes, please add one</h5>
    <ul class="recipes__grid" v-if="recipes && recipes.length >= 0">
      <li
        class="recipes__preview"
        @click="showRecipesDetails(recipe.id)"
        :key="recipe.id"
        v-for="recipe in recipes"
      >
        <div class="recipes__info">
          <h5 class="recipes__info--header">{{ recipe.title }}</h5>
          <p class="recipes__info--description">{{ recipe.description }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getRecipes } from "../store/recipes/recipes.actions";

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
    }
  }
};
</script>

<style lang="scss">
@import "../styles/recipes.scss";
</style>
