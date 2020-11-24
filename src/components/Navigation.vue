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
        <i class="fas fa-building"></i>
        Домой
      </a>
      <a
        :href="href"
        v-show="!isExactActive"
        class="navigation__link"
        @click="navigate"
      >
        <i class="far fa-building"></i>
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
        <i class="fas fa-book-open"></i>
        Рецепты
      </a>
      <a
        :href="href"
        v-show="!isExactActive"
        class="navigation__link"
        @click="navigate"
      >
        <i class="fas fa-book"></i>
        Рецепты
      </a>
    </router-link>
    <router-link v-slot="{ isExactActive, navigate, href }" to="/favourites">
      <a
        :href="href"
        v-show="isExactActive"
        class="navigation__link"
        @click="navigate"
      >
        <i class="fas fa-bookmark"></i>
        Избранное
      </a>
      <a
        :href="href"
        v-show="!isExactActive"
        class="navigation__link"
        @click="navigate"
      >
        <i class="far fa-bookmark"></i>
        Избранное
      </a>
    </router-link>
  </nav>
</template>

<script>
export default {
  name: "Navigation"
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

    svg {
      margin-bottom: 4px;
      font-size: 1.5em;
    }
  }
}
</style>
