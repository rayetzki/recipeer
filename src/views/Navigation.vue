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
      </a>
      <a
        :href="href"
        v-show="!isExactActive"
        class="navigation__link"
        @click="navigate"
      >
        <i class="far fa-building"></i>
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
      </a>
      <a
        :href="href"
        v-show="!isExactActive"
        class="navigation__link"
        @click="navigate"
      >
        <i class="fas fa-book"></i>
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
      </a>
      <a
        :href="href"
        v-show="!isExactActive"
        class="navigation__link"
        @click="navigate"
      >
        <i class="far fa-bookmark"></i>
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
#navigation {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 16px;

  .navigation__link {
    i {
      font-size: 2em;
    }
  }
}
</style>
