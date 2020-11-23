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
        <span id="settings" v-show="!openSearch">
          <i class="fas fa-plus-circle"></i>
        </span>
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
    <section class="recipes__categories">
      <el-tag
        @click="toggleLabel(item.label)"
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
import Recipe from "../components/Recipe";
import FormInput from "../components/FormInput";
import { Tag } from "element-ui";
import {
  getRecipes,
  deleteRecipe,
  findRecipe
} from "../store/recipes/recipes.actions";
import {
  removeFavourite,
  addFavourite
} from "../store/favourites/favourites.actions";

export default {
  name: "recipes-list",
  components: {
    "form-input": FormInput,
    "el-tag": Tag,
    recipe: Recipe
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
    toggleLabel(label) {
      this.filterCondition = label;
    },
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
