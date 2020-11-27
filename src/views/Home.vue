<template>
  <div class="home">
    <app-header
      v-if="user"
      :avatar="user.avatar"
      @toggle-drawer="openDrawer = !openDrawer"
      @logout="logout"
    ></app-header>
    <spinner :open="randomRecipe === undefined"></spinner>
    <router-link
      v-if="randomRecipe"
      :to="{ path: 'recipe', query: { id: randomRecipe.id } }"
    >
      <main class="recipe-recommendation" :class="recommendationBg">
        <h3 class="recipe-recommendation__header">
          Рекомендуем если проголодался:
        </h3>
        <h3
          v-if="!randomRecipe.title"
          class="recipe-recommendation__night-header"
        >
          Мы не рекомендуем кушать на ночь, потому что это очень вредно для
          здоровья.
        </h3>
        <h5 class="recipe-recommendation__title">
          {{ randomRecipe.title }}
        </h5>
        <img
          class="recipe-recommendation__preview-image"
          v-if="randomRecipe"
          alt="Картинка рецепта"
          :src="randomRecipe.banner"
        />
        <p class="recipe-recommendation__description">
          {{ randomRecipe.description }}
        </p>
        <div class="recipe-recommendation__secondary-info">
          <div class="secondary__info--time">
            <i class="far fa-clock"></i>
            <p>{{ randomRecipe.cookingTime }}</p>
          </div>
          <span class="secondary__info--cost">
            Cтоимость:
            {{ convertPrice(randomRecipe.cost) }}
          </span>
        </div>
        <img
          class="recipe-recommendation__night-banner"
          v-if="!randomRecipe"
          alt="Спящий мишка"
          src="../assets/Sleeping_Bear.png"
        />
        <img
          class="recipe-recommendation__banner"
          src="../assets/sunrise-svgrepo-com.svg"
          alt="Recommendation banner"
          v-if="randomRecipe.dayTime === 'завтрак'"
        />
        <img
          class="recipe-recommendation__banner"
          src="../assets/sunrise-svgrepo-com.svg"
          alt="Recommendation banner"
          v-else-if="['обед', 'перекус'].includes(randomRecipe.dayTime)"
        />
        <img
          class="recipe-recommendation__banner"
          src="../assets/partially-sunny-svgrepo-com.svg"
          alt="Recommendation banner"
          v-else-if="randomRecipe.dayTime === 'полудник'"
        />
        <img
          class="recipe-recommendation__banner"
          src="../assets/sunset-svgrepo-com.svg"
          alt="Recommendation banner"
          v-else-if="randomRecipe.dayTime === 'ужин'"
        />
        <img
          class="recipe-recommendation__banner"
          src="../assets/night-svgrepo-com.svg"
          alt="Recommendation banner"
          v-else
        />
      </main>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getRandomRecipe } from "../store/recipes/recipes.actions";
import { parseBalance } from "../utils/parseBalance";
import Spinner from "../components/Spinner";
import Header from "../components/Header.vue";

export default {
  name: "Home",
  components: {
    "app-header": Header,
    spinner: Spinner
  },
  data() {
    return {
      openDrawer: false,
      randomRecipe: undefined
    };
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "auth/isLoggedIn",
      user: "user/user"
    }),
    recommendationBg() {
      if (!this.randomRecipe) {
        return { night: true };
      } else {
        return {
          evening: this.randomRecipe.dayTime === "ужин",
          day: ["обед", "перекус"].includes(this.randomRecipe.dayTime),
          morning: this.randomRecipe.dayTime === "завтрак"
        };
      }
    }
  },
  mounted() {
    getRandomRecipe().then(recipe => {
      this.randomRecipe = recipe;
    });
  },
  methods: {
    logout() {
      return this.$store.dispatch("auth/logout", null, { root: true });
    },
    convertPrice(balance) {
      return parseBalance(balance);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/theme.scss";
@import "../styles/modules/recommendation.scss";
</style>
