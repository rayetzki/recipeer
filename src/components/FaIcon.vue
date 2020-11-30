<template>
  <span :class="name">
    <i :class="icon"></i>
  </span>
</template>

<script>
export default {
  name: "FaIcon",
  props: ["name", "icon"]
};
</script>
