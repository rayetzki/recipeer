<template>
  <div class="favourites">
    <header class="favourites__header">
      <h1 class="favourites__title">Избранное</h1>
    </header>
    <h5
      class="favourites__empty-list"
      v-if="favourites && favourites.length === 0"
    >
      Нету избранных рецептов
    </h5>
    <spinner :open="!favourites"></spinner>
    <ul class="favourites__grid" v-if="favourites && favourites.length > 0">
      <li
        class="favourite__preview"
        :key="favourite.recipeId"
        v-for="favourite in favourites"
      >
        <router-link
          v-if="favourite.recipe"
          :to="{
            path: 'recipe',
            query: { id: favourite.recipe.id }
          }"
        >
          <recipe
            v-if="favourite.recipe"
            @favourite="removeSaved"
            :recipe="favourite.recipe"
            :favourite="true"
            :delete="false"
          ></recipe>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  getFavourites,
  removeFavourite
} from "../store/favourites/favourites.actions";
import Recipe from "../components/Recipe";
import Spinner from "../components/Spinner";

export default {
  name: "Favourites",
  components: {
    recipe: Recipe,
    spinner: Spinner
  },
  data: () => ({
    favourites: undefined
  }),
  mounted() {
    return getFavourites().then(favourites => {
      this.favourites = favourites;
    });
  },
  methods: {
    removeSaved(id) {
      const index = this.favourites.findIndex(recipe => recipe.id === id);
      removeFavourite(id).then(() => {
        this.favourites.splice(index, 1);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/modules/favourites.scss";
</style>
