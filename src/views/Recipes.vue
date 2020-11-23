<template>
  <div id="recipes">
    <header>
      <h1 class="recipes__title">Рецепты</h1>
      <div class="recipes__options">
        <span id="search"><i class="fas fa-search"></i></span>
        <span id="settings"><i class="fas fa-plus-circle"></i></span>
      </div>
    </header>
    <section class="recipes__categories">
      <el-tag v-for="item in items" :key="item.label" :type="item.type">
        {{ item.label }}
      </el-tag>
    </section>
    <h5 v-if="recipes && recipes.length === 0" class="recipes__empty-list">
      Не найдено рецептов
    </h5>
    <ul class="recipes__grid" v-if="recipes && recipes.length >= 0">
      <li class="recipes__preview" :key="recipe.id" v-for="recipe in recipes">
        <router-link :to="{ path: 'recipe', query: { id: recipe.id } }">
          <recipe
            @remove="removeRecipe"
            @favourite="toggleSaved"
            :favourite="recipe.favourite"
            :recipe="recipe"
            :delete="recipe.author.id === user.id"
            :userId="user.id"
          ></recipe>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Recipe from "../components/Recipe";
import { Tag } from "element-ui";
import { getRecipes, deleteRecipe } from "../store/recipes/recipes.actions";
import {
  removeFavourite,
  addFavourite
} from "../store/favourites/favourites.actions";

export default {
  name: "recipes-list",
  components: {
    "el-tag": Tag,
    recipe: Recipe
  },
  data: () => ({
    recipes: undefined,
    page: 0,
    items: [
      { type: "", label: "Завтрак" },
      { type: "success", label: "Обед" },
      { type: "info", label: "Полудник" },
      { type: "danger", label: "Перекус" },
      { type: "warning", label: "Ужин" }
    ]
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
    getRecipes(page) {
      return getRecipes(page);
    },
    setRecipes(recipesData) {
      this.recipes = recipesData;
    },
    setPage(page) {
      this.page = page;
    },
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
    },
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
@import "../styles/modules/recipes.scss";

#recipes {
  padding: 24px;
}
</style>
