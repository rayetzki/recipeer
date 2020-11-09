<template>
  <div></div>
</template>

<script>
import { getRecipeById } from "../store/recipes/recipes.actions";

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
  }
};
</script>

<style></style>
