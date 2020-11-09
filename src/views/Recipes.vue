<template>
  <div id="recipes">
    <h5 v-if="recipes && recipes.length === 0">No recipes, please add one</h5>
    <ul v-if="recipes && recipes.length >= 0">
      <li :key="recipe.id" v-for="recipe in recipes">
        <h5>{{ recipe.title }}</h5>
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
    }
  }
};
</script>

<style></style>
