<template>
  <div id="#recipe" class="recipe__preview" v-if="recipe">
    <div class="recipe__preview--view">
      <router-link :to="{ path: 'recipe', query: { id: recipe.id } }">
        <img
          :src="recipe.banner"
          alt="Изображение рецепта"
          class="recipe__preview--banner"
        />
      </router-link>
      <fa-icon
        class="recipe__preview--remove"
        @click="$emit('remove', recipe.id)"
        v-show="this.delete"
        icon="fas fa-trash"
      >
      </fa-icon>
      <router-link
        v-if="edit"
        :to="{ path: '/edit-recipe', query: { id: recipe.id } }"
      >
        <fa-icon icon="far fa-edit" class="recipe__preview--edit"></fa-icon>
      </router-link>
      <fa-icon
        class="recipe__preview--saved"
        @click="$emit('favourite', recipe.id)"
        v-show="!this.favourite"
        icon="far fa-bookmark"
      >
      </fa-icon>
      <fa-icon
        class="recipe__preview--saved"
        @click="$emit('favourite', recipe.id)"
        v-show="this.favourite"
        icon="fas fa-bookmark"
      >
      </fa-icon>
    </div>
    <div class="recipe__info">
      <h5 class="recipe__info--header">{{ recipe.title }}</h5>
      <div class="recipe__info--secondary">
        <div class="recipe__info--time">
          <fa-icon icon="far fa-clock"></fa-icon>
          <p>{{ recipe.cookingTime }}</p>
        </div>
        <span class="recipe__info--cost">
          Примерная стоимость: {{ parseBalance(recipe.cost) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { parseBalance } from "../utils/parseBalance";
import FaIcon from "./FaIcon.vue";

export default {
  name: "Recipe",
  components: {
    FaIcon
  },
  props: ["recipe", "delete", "favourite", "edit"],
  methods: {
    parseBalance
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/theme.scss";
@import "../styles/mixins.scss";
@import "../styles/breakpoints.scss";

.recipe__preview {
  cursor: pointer;

  &--view {
    position: relative;
  }

  &--banner {
    object-fit: cover;
    width: 100%;
    max-height: 200px;
    border-radius: $borderRadius;
    border-bottom-left-radius: unset;
    border-bottom-right-radius: unset;
  }

  &--remove {
    @include action(16px, 16px, null, null);
  }

  &--saved {
    @include action(null, 16px, 16px, null);
  }

  &--edit {
    @include action(16px, null, null, 16px);
  }

  &:hover {
    transform: scale(1.05);
    border-radius: $borderRadius;
    box-shadow: $boxShadow;
  }
}

.recipe__info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  margin: 8px 0;
  padding: 4px 12px 16px;
  $this: &;

  &--header {
    font-family: $primary-font;
    width: fit-content;
    font-size: 16px;
    font-weight: 400;
    color: $textPrimary;

    @media screen and (max-width: $mobileS) {
      font-size: 14px;
    }
  }

  &--secondary {
    font-family: $primary-font;
    display: flex;
    flex-direction: row;
    opacity: 0.6;
    margin-top: 12px;
    justify-content: space-between;

    #{$this}--time {
      font-family: $primary-font;
      display: flex;
      flex-direction: row;
      font-size: 12px;

      @media screen and (max-width: $mobileS) {
        font-size: 10px;
      }

      span {
        margin-right: 4px;
      }
    }

    #{$this}--cost {
      font-family: $primary-font;
      font-size: 12px;

      @media screen and (max-width: $mobileS) {
        font-size: 10px;
      }
    }
  }
}
</style>
