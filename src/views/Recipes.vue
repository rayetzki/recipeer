<template>
  <div id="recipes">
    <header>
      <h1 class="recipes__title">Рецепты</h1>
      <div class="recipes__options">
        <span id="search"><i class="fas fa-search"></i></span>
        <span id="settings"><i class="fas fa-cog"></i></span>
      </div>
    </header>
    <h5 v-if="recipes && recipes.length === 0" class="recipes__empty-list">
      Не найдено рецептов
    </h5>
    <ul class="recipes__grid" v-if="recipes && recipes.length >= 0">
      <li
        class="recipes__preview"
        :key="recipe.id"
        v-for="(recipe, index) in recipes"
      >
        <div class="recipes__preview--view">
          <img
            src="https://keyassets-p2.timeincuk.net/wp/prod/wp-content/uploads/sites/53/2018/07/Cheap-family-meals-Recipes-under-%C2%A31-per-head-scaled.jpg"
            alt="Изображение рецепта"
            class="recipes__preview--banner"
          />
          <span
            @click="removeRecipe(index)"
            v-if="recipe.author.id === user.id"
            class="recipes__preview--remove"
          >
            <i class="fas fa-trash"></i>
          </span>
          <span
            @click="toggleSaved(index)"
            v-show="recipe.selected"
            class="recipes__preview--saved"
          >
            <i class="far fa-bookmark"></i>
          </span>
          <span
            @click="toggleSaved(index)"
            v-show="!recipe.selected"
            class="recipes__preview--saved"
          >
            <i class="fas fa-bookmark"></i>
          </span>
        </div>
        <div class="recipes__info">
          <h5 class="recipes__info--header">{{ recipe.title }}</h5>
          <div class="recipes__info--secondary">
            <div class="recipes__info--time">
              <i class="far fa-clock"></i>
              <p>{{ recipe.cookingTime }}</p>
            </div>
            <span class="recipes__info--cost">
              Примерная стоимость: {{ convertPrice(recipe.cost) }}
            </span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getRecipes } from "../store/recipes/recipes.actions";
import { parseBalance } from "../utils/parseBalance";

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
  computed: {
    ...mapGetters({
      user: "user/user"
    })
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
    },
    convertPrice(balance) {
      return parseBalance(balance);
    },
    toggleSaved(index) {
      const recipe = this.recipes[index];
      this.$set(this.recipes, index, {
        ...recipe,
        selected: !recipe.selected
      });
    },
    removeRecipe(index) {
      this.recipes.splice(index, 1);
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
