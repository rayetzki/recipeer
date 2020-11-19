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
        <div class="favourite__preview--view">
          <img
            :src="favourite.recipe.banner"
            alt="Изображение рецепта"
            class="favourite__preview--banner"
          />
          <span
            @click="removeSaved(favourite.recipeId)"
            class="favourite__preview--saved"
          >
            <i class="fas fa-bookmark"></i>
          </span>
        </div>
        <div class="favourite__info">
          <h5 class="favourite__info--header">{{ favourite.recipe.title }}</h5>
          <div class="favourite__info--secondary">
            <div class="favourite__info--time">
              <i class="far fa-clock"></i>
              <p>{{ favourite.recipe.cookingTime }}</p>
            </div>
            <span class="favourite__info--cost">
              Примерная стоимость: {{ convertPrice(favourite.recipe.cost) }}
            </span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  getFavourites,
  removeFavourite
} from "../store/favourites/favourites.actions";
import { parseBalance } from "../utils/parseBalance";

export default {
  name: "Favourites",
  data() {
    return {
      favourites: []
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
    convertPrice(balance) {
      return parseBalance(balance);
    },
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
}
</style>
