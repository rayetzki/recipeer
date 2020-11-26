<template>
  <section :class="[banner ? 'banner' : 'banner__border']">
    <img
      :src="banner"
      class="banner__image"
      v-if="banner"
      alt="Баннер рецепта"
    />
    <label class="banner__input" v-if="!banner">
      {{ title }}
      <input type="file" name="banner" @change="$emit('fileload', $event)" />
    </label>
  </section>
</template>

<script>
export default {
  name: "BannerUpload",
  props: ["banner", "title"]
};
</script>

<style scoped lang="scss">
.banner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-height: 160px;

  &__image {
    object-fit: cover;
    width: inherit;
    height: inherit;
    max-height: inherit;
  }

  &__input {
    position: relative;
    left: 0;
    font-size: 16px;
    font-weight: bold;
    top: calc(50% - 16px);

    input[type="file"] {
      border: none;
      visibility: hidden;
      z-index: 10000;
    }
  }
}

.banner__border {
  @extend .banner;
  width: calc(100% - 10px);
  max-height: 155px;
  border: 5px dashed black;
}
</style>
