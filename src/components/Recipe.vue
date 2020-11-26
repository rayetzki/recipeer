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
      <span
        @click="$emit('remove', recipe.id)"
        v-show="showDelete"
        class="recipe__preview--remove"
      >
        <i class="fas fa-trash"></i>
      </span>
      <router-link v-if="edit" :to="{ path: 'edit', query: { id: recipe.id } }">
        <span class="recipe__preview--edit">
          <i class="far fa-edit"></i>
        </span>
      </router-link>
      <span
        @click="$emit('favourite', recipe.id)"
        class="recipe__preview--saved"
        v-show="!this.favourite"
      >
        <i class="far fa-bookmark"></i>
      </span>
      <span
        @click="$emit('favourite', recipe.id)"
        v-show="this.favourite"
        class="recipe__preview--saved"
      >
        <i class="fas fa-bookmark"></i>
      </span>
    </div>
    <div class="recipe__info">
      <h5 class="recipe__info--header">{{ recipe.title }}</h5>
      <div class="recipe__info--secondary">
        <div class="recipe__info--time">
          <i class="far fa-clock"></i>
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
export default {
  name: "Recipe",
  props: ["recipe", "delete", "favourite", "edit"],
  data() {
    return {
      showDelete: this.delete
    };
  },
  methods: {
    parseBalance
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/theme.scss";
@import "../styles/mixins.scss";

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
  }

  &--secondary {
    font-family: $primary-font;
    display: flex;
    flex-direction: row;
    opacity: 0.6;
    align-items: flex-end;
    justify-content: space-between;

    #{$this}--time {
      font-family: $primary-font;
      display: flex;
      flex-direction: row;
      font-size: 12px;
      margin-top: 8px;

      svg {
        margin-right: 4px;
      }
    }

    #{$this}--cost {
      font-family: $primary-font;
      font-size: 12px;
    }
  }
}
</style>
