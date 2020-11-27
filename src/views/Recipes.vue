<template>
  <div id="recipes">
    <header>
      <h1 class="recipes__title" v-show="!openSearch">Рецепты</h1>
      <div class="recipes__options">
        <span
          id="search"
          v-show="!openSearch"
          @click="openSearch = !openSearch"
        >
          <i class="fas fa-search"></i>
        </span>
        <router-link
          id="add"
          v-if="user.role !== 'user'"
          to="/add-recipe"
          v-show="!openSearch"
        >
          <i class="fas fa-plus-circle"></i>
        </router-link>
      </div>
      <div class="recipes__search" v-show="openSearch">
        <form-input
          error=""
          type="text"
          name="search-recipe"
          placeholder="Найди рецепт"
          v-model.lazy="searchCondition"
        ></form-input>
        <span id="close" @click="openSearch = !openSearch">
          <i class="far fa-times-circle"></i>
        </span>
      </div>
    </header>
    <spinner :open="recipes === undefined"></spinner>
    <section class="recipes__categories">
      <el-tag
        @click="filterCondition = item.label"
        v-for="item in items"
        :key="item.label"
        :type="item.type"
      >
        {{ item.label }}
      </el-tag>
    </section>
    <h5 v-if="recipes && recipes.length === 0" class="recipes__empty-list">
      Не найдено рецептов
    </h5>
    <ul class="recipes__grid" v-if="recipes && recipes.length >= 0">
      <li
        class="recipes__preview"
        :key="recipe && recipe.id"
        v-for="recipe in recipes"
      >
        <recipe
          @favourite="toggleSaved"
          :favourite="
            recipe &&
              recipe.favourite &&
              recipe.favourite.userId === this.user.id
          "
          :recipe="recipe"
          :delete="false"
          :userId="user.id"
        ></recipe>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Recipe from "../components/Recipe";
import FormInput from "../components/FormInput";
import Spinner from "../components/Spinner";
import { Tag } from "element-ui";
import { getRecipes, findRecipe } from "../store/recipes/recipes.actions";
import {
  removeFavourite,
  addFavourite
} from "../store/favourites/favourites.actions";

export default {
  name: "recipes-list",
  components: {
    "form-input": FormInput,
    "el-tag": Tag,
    recipe: Recipe,
    spinner: Spinner
  },
  watch: {
    async searchCondition() {
      if (this.searchCondition.trim().length === 0) {
        this.searchCondition = "";
        return;
      }
      const recipes = await findRecipe(this.searchCondition);
      this.recipes = recipes;
    },
    async filterCondition() {
      const dayTime = this.filterCondition.toLowerCase().trim();

      if (dayTime.length === 0) {
        this.filterCondition = "";
        return;
      }

      const response = await getRecipes(
        this.page,
        null,
        dayTime === "все" ? null : dayTime
      );

      this.recipes = response.recipes;
    }
  },
  data: () => ({
    recipes: undefined,
    page: 0,
    searchCondition: "",
    filterCondition: "",
    items: [
      { type: "warning", label: "Все" },
      { type: "", label: "Завтрак" },
      { type: "success", label: "Обед" },
      { type: "info", label: "Полудник" },
      { type: "danger", label: "Перекус" },
      { type: "warning", label: "Ужин" }
    ],
    openSearch: false
  }),
  computed: {
    ...mapGetters({
      user: "user/user"
    })
  },
  mounted() {
    this.getRecipes(this.page).then(data => {
      this.recipes = data.recipes;
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
@import "../styles/modules/recipes.scss";
</style>
