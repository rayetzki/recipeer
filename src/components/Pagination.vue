<template>
  <div class="pagination">
    <span
      @click="$emit('decrement')"
      :class="[page < 1 && 'pagination__disabled', 'pagination__backwards']"
    >
      <i class="fas fa-long-arrow-alt-left"></i>
    </span>
    <span
      @click="$emit('increment')"
      :class="[
        (page + 1) * limit >= total && 'pagination__disabled',
        'pagination__forwards'
      ]"
    >
      <i class="fas fa-long-arrow-alt-right"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: "Pagination",
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
