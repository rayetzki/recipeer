<template>
  <div class="my-recipes">
    <header>
      <h1 class="my-recipes__title">Мои Рецепты</h1>
      <div class="my-recipes__options"></div>
      <router-link
        v-if="recipes && recipes.length > 0"
        id="add"
        to="/add-recipe"
      >
        <i class="fas fa-plus-circle"></i>
      </router-link>
    </header>
    <spinner :open="recipes === undefined"></spinner>
    <h5 v-if="recipes && recipes.length === 0" class="my-recipes__empty-list">
      Вы не добавили ни одного рецепта
      <router-link class="my-recipes__add-recipe-link" to="/add-recipe">
        <i class="fas fa-plus-circle"></i> Добавить
      </router-link>
    </h5>
    <ul class="my-recipes__grid" v-if="recipes && recipes.length >= 0">
      <li
        class="my-recipes__preview"
        :key="recipe && recipe.id"
        v-for="recipe in recipes"
      >
        <recipe
          @favourite="toggleSaved"
          :favourite="recipe && recipe.favourite"
          :recipe="recipe"
          :delete="recipe && recipe.author && recipe.author.id === user.id"
          :userId="user.id"
        ></recipe>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getRecipes } from "../store/recipes/recipes.actions";
import Recipe from "../components/Recipe";
import Spinner from "../components/Spinner";
import {
  addFavourite,
  removeFavourite
} from "../store/favourites/favourites.actions";

export default {
  name: "MyRecipes",
  components: {
    recipe: Recipe,
    spinner: Spinner
  },
  data: () => ({
    page: 0,
    recipes: undefined
  }),
  computed: {
    ...mapGetters({
      user: "user/user"
    })
  },
  mounted() {
    getRecipes(this.page, this.user.id).then(response => {
      this.recipes = response.recipes;
    });
  },
  methods: {
    getRecipes,
    toggleSaved(id) {
      const index = this.recipes.findIndex(recipe => recipe.id === id);
      const recipe = this.recipes[index];
      if (!recipe.favourite) {
        addFavourite(this.user.id, id).then(() => {
          this.$set(this.recipes, index, {
            ...recipe,
            favourite: !recipe.favourite
          });
        });
      } else {
        removeFavourite(this.user.id, id).then(() => {
          this.$set(this.recipes, index, {
            ...recipe,
            favourite: !recipe.favourite
          });
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/modules/my-recipes.scss";
</style>
