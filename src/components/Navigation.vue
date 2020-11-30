<template>
  <nav id="navigation">
    <router-link
      v-slot="{ isExactActive, navigate, href }"
      to="/"
      class="navigation__link"
    >
      <a
        :href="href"
        v-show="isExactActive"
        class="navigation__link"
        @click="navigate"
      >
        <fa-icon icon="fas fa-building"></fa-icon>
        Домой
      </a>
      <a
        :href="href"
        v-show="!isExactActive"
        class="navigation__link"
        @click="navigate"
      >
        <fa-icon icon="far fa-building"></fa-icon>
        Домой
      </a>
    </router-link>
    <router-link v-slot="{ isExactActive, navigate, href }" to="/recipes">
      <a
        :href="href"
        class="navigation__link"
        @click="navigate"
        v-show="isExactActive"
      >
        <fa-icon icon="fas fa-map"></fa-icon>
        Все рецепты
      </a>
      <a
        :href="href"
        v-show="!isExactActive"
        class="navigation__link"
        @click="navigate"
      >
        <fa-icon icon="far fa-map"></fa-icon>
        Все рецепты
      </a>
    </router-link>
    <router-link
      v-if="role !== 'user'"
      v-slot="{ isExactActive, navigate, href }"
      to="/my-recipes"
    >
      <a
        :href="href"
        class="navigation__link"
        @click="navigate"
        v-show="isExactActive"
      >
        <fa-icon icon="fas fa-plus-square"></fa-icon>
        Мои рецепты
      </a>
      <a
        :href="href"
        v-show="!isExactActive"
        class="navigation__link"
        @click="navigate"
      >
        <fa-icon icon="far fa-plus-square"></fa-icon>
        Мои рецепты
      </a>
    </router-link>
    <router-link v-slot="{ isExactActive, navigate, href }" to="/favourites">
      <a
        :href="href"
        v-show="isExactActive"
        class="navigation__link"
        @click="navigate"
      >
        <fa-icon icon="fas fa-bookmark"></fa-icon>
        Избранное
      </a>
      <a
        :href="href"
        v-show="!isExactActive"
        class="navigation__link"
        @click="navigate"
      >
        <fa-icon icon="far fa-bookmark"></fa-icon>
        Избранное
      </a>
    </router-link>
  </nav>
</template>

<script>
import FaIcon from "./FaIcon.vue";
export default {
  name: "Navigation",
  components: {
    FaIcon
  },
  props: ["role"]
};
</script>

<style lang="scss" scoped>
@import "../styles/theme.scss";

#navigation {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  background-color: white;
  box-shadow: $borderBoxShadow;

  .navigation__link {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;

    span {
      margin-bottom: 4px;
      font-size: 1.5em;
    }
  }
}
</style>
