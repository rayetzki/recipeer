<template>
  <div class="home">
    <el-drawer
      title="Рецепты других пользователей"
      :visible.sync="openDrawer"
      :direction="'ltr'"
      :size="'300px'"
    >
      <router-link to="" v-if="isLoggedIn">
        <span class="logout" @click="logout">Выйти</span>
      </router-link>
    </el-drawer>
    <app-header
      :avatar="user && user.avatar"
      @toggle-drawer="openDrawer = !openDrawer"
    ></app-header>
    <main class="recipe-recommendation" :class="recommendationBg">
      <h3 class="recipe-recommendation__header" v-if="randomRecipe">
        Рекомендуем если проголодался:
      </h3>
      <h3 class="recipe-recommendation__night-header" v-else>
        Мы не рекомендуем кушать на ночь, потому что это очень вредно для
        здоровья.
      </h3>
      <h5 class="recipe-recommendation__title" v-if="randomRecipe">
        {{ randomRecipe && randomRecipe.title }}
      </h5>
      <img
        class="recipe-recommendation__preview-image"
        v-if="randomRecipe"
        alt="Картинка рецепта"
        :src="randomRecipe && randomRecipe.banner"
      />
      <p class="recipe-recommendation__description">
        {{ randomRecipe && randomRecipe.description }}
      </p>
      <div class="recipe-recommendation__secondary-info" v-if="randomRecipe">
        <div class="secondary__info--time">
          <i class="far fa-clock"></i>
          <p>{{ randomRecipe && randomRecipe.cookingTime }}</p>
        </div>
        <span class="secondary__info--cost">
          Cтоимость:
          {{ convertPrice(randomRecipe && randomRecipe.cost) }}
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
        v-if="randomRecipe && randomRecipe.dayTime === 'завтрак'"
      />
      <img
        class="recipe-recommendation__banner"
        src="../assets/sunrise-svgrepo-com.svg"
        alt="Recommendation banner"
        v-else-if="
          (randomRecipe && randomRecipe.dayTime === 'обед') ||
            (randomRecipe && randomRecipe.dayTime === 'перекус')
        "
      />
      <img
        class="recipe-recommendation__banner"
        src="../assets/partially-sunny-svgrepo-com.svg"
        alt="Recommendation banner"
        v-else-if="randomRecipe && randomRecipe.dayTime === 'полудник'"
      />
      <img
        class="recipe-recommendation__banner"
        src="../assets/sunset-svgrepo-com.svg"
        alt="Recommendation banner"
        v-else-if="randomRecipe && randomRecipe.dayTime === 'ужин'"
      />
      <img
        class="recipe-recommendation__banner"
        src="../assets/night-svgrepo-com.svg"
        alt="Recommendation banner"
        v-else
      />
    </main>
  </div>
</template>

<script>
import { Drawer } from "element-ui";
import Header from "../components/Header";
import { mapGetters } from "vuex";
import { getRandomRecipe } from "../store/recipes/recipes.actions";
import { parseBalance } from "../utils/parseBalance";

export default {
  name: "Home",
  components: {
    "app-header": Header,
    "el-drawer": Drawer
  },
  data() {
    return {
      openDrawer: false,
      randomRecipe: null
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

.recipe-recommendation {
  position: relative;
  margin-top: 36px;
  margin: 0 auto;
  width: calc(100% - 24px);
  height: 70vh;
  border-radius: $borderRadius;
  border: 1px dashed cadetblue;

  &.morning {
    background-color: cornsilk;
    color: peru;
  }

  &.evening {
    background-color: violet;
    color: white;
  }

  &.day {
    background-color: beige;
    color: teal;
  }

  &.night {
    background-color: darkslateblue;
    color: white;
  }

  &__header {
    font-family: $secondary-font;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    margin: 4vh 16px 16px;
    letter-spacing: 0.3px;
  }

  &__title {
    font-family: $secondary-font;
    font-size: 14px;
    padding: 4px;
    border: 1px solid rosybrown;
    border-radius: 13px;
    width: calc(100% - 108px);
    margin: 8px auto;
  }

  &__preview-image {
    width: calc(100% - 32px);
    object-fit: cover;
    height: 200px;
    margin-top: 16px;
    border-radius: $borderRadius;
  }

  &__description {
    font-family: $secondary-font;
    margin: 8px 16px;
    text-align: left;
    font-size: 14px;
    max-height: 28px;
    text-overflow: ellipsis;
    overflow: hidden;
    position: relative;

    &::before {
      content: "...";
      position: absolute;
      right: 24px;
      bottom: 0;
    }
  }

  &__secondary-info {
    margin: 16px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;

    .secondary__info--time {
      font-family: $secondary-font;
      display: flex;
      flex-direction: row;
      font-size: 12px;

      > p {
        font-family: $secondary-font;
      }

      svg {
        margin-right: 4px;
      }
    }

    .secondary__info--cost {
      font-family: $secondary-font;
      font-size: 12px;
    }
  }

  &__night-header {
    @extend .recipe-recommendation__header;
    font-weight: 100;
  }

  &__night-banner {
    width: 200px;
    height: 200px;
    margin-top: 24px;
  }

  &__banner {
    width: 48px;
    height: 48px;
    position: absolute;
    left: 16px;
    bottom: 16px;
  }

  &:hover {
    box-shadow: $boxShadow;
  }
}

.logout {
  position: absolute;
  bottom: 32px;
  margin-left: -36px;
  border: 1px dotted $borderRed;
  border-radius: 13px;
  padding: 16px;
  color: $textError;
  background-color: $whiteBg;

  &:hover {
    background-color: $borderRed;
    color: $textWhite;
    transition: background-color 0.7s ease,
      color 0.7s cubic-bezier(0.075, 0.82, 0.165, 1);
  }
}
</style>
