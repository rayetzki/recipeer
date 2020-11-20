<template>
  <section class="upload">
    <img :src="avatar" class="upload__preview" alt="Загруженная картинка" />
    <label class="upload__label">
      {{ title }}
      <input
        name="upload__button"
        accept="image/*"
        title=" "
        @change="$emit('upload', $event)"
        type="file"
      />
    </label>
  </section>
</template>

<script>
export default {
  name: "ImageUpload",
  props: ["title", "avatar"]
};
</script>

<style lang="scss" scoped>
@import "../styles/theme.scss";

.upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  top: 16px;
  overflow: hidden;

  &__preview {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 8px;
  }

  &__label {
    width: 105px;
    height: 18px;
    padding-top: 8px;
    display: inline-block;
    border: 1px solid $borderColor;
    border-radius: $borderRadius;
    cursor: pointer;
    user-select: none;
    font-size: 10px;
    font-weight: 300;
    margin-bottom: 16px;

    input[type="file"] {
      border: none;
      visibility: hidden;
      z-index: 10000;
    }
  }
}
</style>
