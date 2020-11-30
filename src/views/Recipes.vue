<template>
  <div id="recipes">
    <header>
      <h1 class="recipes__title" v-show="!openSearch">Рецепты</h1>
      <div class="recipes__options">
        <fa-icon
          id="search"
          icon="fas fa-search"
          v-show="!openSearch"
          @click="openSearch = !openSearch"
        >
        </fa-icon>
        <router-link
          id="add"
          v-if="user.role !== 'user'"
          to="/add-recipe"
          v-show="!openSearch"
        >
          <fa-icon icon="fas fa-plus-circle"></fa-icon>
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
        <fa-icon
          icon="far fa-times-circle"
          id="close"
          @click="openSearch = !openSearch"
        >
        </fa-icon>
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
    <pagination
      :page="page"
      :limit="limit"
      :total="total"
      @increment="incrementPage"
      @decrement="decrementPage"
    ></pagination>
    <ul class="recipes__grid" v-if="recipes && recipes.length >= 0">
      <li
        class="recipes__preview"
        :key="recipe && recipe.id"
        v-for="recipe in recipes"
      >
        <recipe
          @favourite="toggleSaved"
          :favourite="recipe && recipe.favourite.length"
          :recipe="recipe"
          :delete="false"
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
import Pagination from "../components/Pagination.vue";
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
    spinner: Spinner,
    pagination: Pagination
  },
  watch: {
    page() {
      this.getRecipes(
        this.page,
        this.total - this.limit * (this.page + 1) < 0
          ? this.total - this.limit
          : this.limit,
        null
      ).then(data => {
        this.recipes = data.recipes;
        this.total = data.total;
      });
    },
    searchCondition() {
      if (this.searchCondition.trim().length === 0) {
        this.searchCondition = "";
        return;
      }
      findRecipe(this.searchCondition).then(response => {
        this.recipes = response.recipes;
        this.total = response.total;
      });
    },
    filterCondition() {
      const dayTime = this.filterCondition.toLowerCase().trim();
      if (dayTime.length === 0) {
        this.filterCondition = "";
        return;
      }
      getRecipes(
        this.page,
        this.limit,
        dayTime === "все" ? null : dayTime
      ).then(response => {
        this.recipes = response.recipes;
        this.total = response.total;
      });
    }
  },
  data: () => ({
    recipes: undefined,
    page: 0,
    total: undefined,
    limit: 5,
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
      this.total = data.total;
    });
  },
  methods: {
    getRecipes,
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
@import "../styles/modules/recipes.scss";
</style>
