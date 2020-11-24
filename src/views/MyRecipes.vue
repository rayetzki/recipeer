<template>
  <div class="my-recipes">
    <header>
      <h1 class="my-recipes__title">Мои Рецепты</h1>
      <div class="my-recipes__options"></div>
      <router-link id="add" to="add-recipe">
        <i class="fas fa-plus-circle"></i>
      </router-link>
    </header>
    <h5 v-if="recipes && recipes.length === 0" class="my-recipes__empty-list">
      Вы не добавили ни одного рецепта
      <router-link class="my-recipes__add-recipe-link" to="/add-recipe">
        <i class="fas fa-plus-circle"></i> Добавить
      </router-link>
    </h5>
    <ul class="my-recipes__grid" v-if="!recipes || recipes.length >= 0">
      <li
        class="my-recipes__preview"
        :key="recipe && recipe.id"
        v-for="recipe in recipes"
      >
        <router-link
          :to="{ path: 'recipe', query: { id: recipe && recipe.id } }"
        >
          <recipe
            @remove="removeRecipe"
            @favourite="toggleSaved"
            :favourite="recipe && recipe.favourite"
            :recipe="recipe"
            :delete="recipe && recipe.author && recipe.author.id === user.id"
            :userId="user.id"
          ></recipe>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { deleteRecipe, getRecipes } from "../store/recipes/recipes.actions";
import Recipe from "../components/Recipe";

export default {
  name: "MyRecipes",
  components: {
    recipe: Recipe
  },
  data: () => ({
    page: 0,
    recipes: null
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
    removeRecipe(id) {
      const index = this.recipes.findIndex(recipe => recipe.id === id);
      deleteRecipe(id).then(() => {
        this.recipes.splice(index, 1);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/modules/my-recipes.scss";
</style>
