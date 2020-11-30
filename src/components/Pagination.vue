<template>
  <div class="pagination">
    <fa-icon
      @click="$emit('decrement')"
      icon="fas fa-long-arrow-alt-left"
      :class="[page < 1 && 'pagination__disabled', 'pagination__backwards']"
    >
    </fa-icon>
    <fa-icon
      @click="$emit('increment')"
      icon="fas fa-long-arrow-alt-right"
      :class="[
        (page + 1) * limit >= total && 'pagination__disabled',
        'pagination__forwards'
      ]"
    >
    </fa-icon>
  </div>
</template>

<script>
import FaIcon from "./FaIcon";

export default {
  name: "Pagination",
  components: {
    FaIcon
  },
  props: ["page", "total", "limit"]
};
</script>

<style lang="scss" scoped>
.pagination {
  position: absolute;
  right: 24px;
  padding-top: 16px;

  & > * {
    cursor: pointer;
  }

  &__backwards {
    margin-right: 16px;
  }

  &__disabled {
    opacity: 0.1;
  }
}
</style>
