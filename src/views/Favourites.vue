<template>
  <div id="favourites">
    <header>
      <h1 class="favourites__title">Избранное</h1>
    </header>
    <h5
      v-if="favourites && favourites.length === 0"
      class="favourites__empty-list"
    >
      Нету избранных рецептов
    </h5>
    <ul class="favourites__grid" v-if="favourites && favourites.length > 0">
      <li
        class="favourite__preview"
        :key="favourite.recipeId"
        v-for="favourite in favourites"
      >
        <recipe
          @favourite="removeSaved"
          :recipe="favourite.recipe"
          :favourite="true"
          :delete="false"
        ></recipe>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Recipe from "../components/Recipe";
import {
  getFavourites,
  removeFavourite
} from "../store/favourites/favourites.actions";

export default {
  name: "Favourites",
  components: {
    recipe: Recipe
  },
  data() {
    return {
      favourites: undefined
    };
  },
  computed: {
    ...mapGetters({
      user: "user/user"
    })
  },
  mounted() {
    return getFavourites(this.user.id).then(favourites => {
      this.favourites = favourites;
    });
  },
  methods: {
    removeSaved(id) {
      const index = this.favourites.findIndex(recipe => recipe.id === id);
      removeFavourite(this.user.id, id).then(() => {
        this.favourites.splice(index, 1);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/modules/favourites.scss";
#favourites {
  padding: 24px;
  position: relative;
}
</style>
