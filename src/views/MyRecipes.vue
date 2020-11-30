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
        <fa-icon icon="fas fa-plus-circle"></fa-icon>
      </router-link>
    </header>
    <spinner :open="recipes === undefined"></spinner>
    <h5 v-if="recipes && recipes.length === 0" class="my-recipes__empty-list">
      Вы не добавили ни одного рецепта
      <router-link class="my-recipes__add-recipe-link" to="/add-recipe">
        <fa-icon icon="fas fa-plus-circle"></fa-icon> Добавить
      </router-link>
    </h5>
    <pagination
      :page="page"
      :limit="limit"
      :total="total"
      @increment="incrementPage"
      @decrement="decrementPage"
    ></pagination>
    <ul class="my-recipes__grid" v-if="recipes && recipes.length >= 0">
      <li
        class="my-recipes__preview"
        :key="recipe && recipe.id"
        v-for="recipe in recipes"
      >
        <recipe
          @favourite="toggleSaved"
          :edit="true"
          :favourite="recipe && recipe.favourite.length"
          :recipe="recipe"
          :delete="true"
        ></recipe>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getRecipesByUser } from "../store/recipes/recipes.actions";
import Recipe from "../components/Recipe";
import Pagination from "../components/Pagination.vue";
import Spinner from "../components/Spinner";
import FaIcon from "../components/FaIcon.vue";
import {
  addFavourite,
  removeFavourite
} from "../store/favourites/favourites.actions";

export default {
  name: "MyRecipes",
  components: {
    recipe: Recipe,
    spinner: Spinner,
    pagination: Pagination,
    FaIcon
  },
  data: () => ({
    page: 0,
    recipes: undefined,
    total: undefined,
    limit: 5
  }),
  computed: {
    ...mapGetters({
      user: "user/user"
    })
  },
  mounted() {
    getRecipesByUser(this.user.id, this.page, this.limit).then(response => {
      this.recipes = response.recipes;
      this.total = response.total;
    });
  },
  watch: {
    page() {
      this.getRecipesByUser(
        this.user.id,
        this.page,
        this.total - this.limit * (this.page + 1) < 0
          ? this.total - this.limit
          : this.limit
      ).then(data => {
        this.recipes = data.recipes;
        this.total = data.total;
      });
    }
  },
  methods: {
    getRecipesByUser,
    toggleSaved(id) {
      const index = this.recipes.findIndex(recipe => recipe.id === id);
      const recipe = this.recipes[index];
      if (!recipe.favourite) {
        addFavourite(id).then(() => {
          this.$set(this.recipes, index, {
            ...recipe,
            favourite: !recipe.favourite
          });
        });
      } else {
        removeFavourite(id).then(() => {
          this.$set(this.recipes, index, {
            ...recipe,
            favourite: !recipe.favourite
          });
        });
      }
    },
    incrementPage() {
      if (this.page * this.limit >= this.total) return;
      this.page = this.page + 1;
    },
    decrementPage() {
      if (this.page < 1) return;
      this.page = this.page - 1;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/modules/my-recipes.scss";
</style>
