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
  </div>
</template>

<script>
import { addFavourite } from "../store/favourites/favourites.actions";
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
  },
  methods: {
    addBookmark(id) {
      return addFavourite(id).then(() => {
        this.recipe = { ...this.recipe, favourite: !this.recipe.favourite };
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/modules/recipe.scss";
</style>
