<template>
  <div id="#recipe">
    <div class="recipe__preview--view">
      <img
        :src="recipe.banner"
        alt="Изображение рецепта"
        class="recipe__preview--banner"
      />
      <span
        @click="$emit('remove', recipe.id)"
        v-show="showDelete"
        class="recipe__preview--remove"
      >
        <i class="fas fa-trash"></i>
      </span>
      <span
        @click="$emit('favourite', recipe.id)"
        class="recipe__preview--saved"
        v-show="!showFavourite"
      >
        <i class="far fa-bookmark"></i>
      </span>
      <span
        @click="$emit('favourite', recipe.id)"
        v-show="showFavourite"
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
          Примерная стоимость: {{ convertPrice(recipe.cost) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { parseBalance } from "../utils/parseBalance";
export default {
  name: "Recipe",
  props: ["recipe", "delete", "favourite"],
  data() {
    return {
      showDelete: this.delete,
      showFavourite: this.favourite
    };
  },
  methods: {
    convertPrice(balance) {
      return parseBalance(balance);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/theme.scss";
@import "../styles/mixins.scss";

.recipe__preview {
  &--view {
    position: relative;
  }

  &--banner {
    object-fit: cover;
    width: 100%;
    max-height: 200px;
    border-radius: $borderRadius;
  }

  &--remove {
    @include action(16px, 16px, null, null);
  }

  &--saved {
    @include action(null, 16px, 16px, null);
  }
}

.recipe__info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  margin: 12px 0 8px 0;
  $this: &;

  &--header {
    width: fit-content;
    font-size: 16px;
    font-weight: 400;
    color: $textPrimary;
  }

  &--secondary {
    display: flex;
    flex-direction: row;
    opacity: 0.6;
    align-items: flex-end;
    justify-content: space-between;

    #{$this}--time {
      display: flex;
      flex-direction: row;
      font-size: 12px;
      margin-top: 8px;

      svg {
        margin-right: 4px;
      }
    }

    #{$this}--cost {
      font-size: 12px;
    }
  }
}
</style>
