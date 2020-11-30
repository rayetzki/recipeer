<template>
  <span @click="$emit('action')" :class="name || null">
    <i :class="icon"></i>
  </span>
</template>

<script>
export default {
  name: "FaIcon",
  props: ["name", "icon"]
};
</script>
