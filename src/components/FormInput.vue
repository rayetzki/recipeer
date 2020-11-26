<template>
  <div :class="['input__container', !!error && 'input__container--with-error']">
    <label class="input__label" v-if="label" :for="name">{{ label }}</label>
    <Input
      :id="name"
      :name="name"
      :type="type"
      :inputmode="inputmode"
      :value="value"
      :clearable="clearable"
      :accept="accept"
      :title="title"
      :placeholder="placeholder"
      :class="['input', !!error && 'input__error']"
      @blur="$emit('validate')"
      @keydown="$emit('validate')"
      @input="$emit('input', $event)"
    />
    <span v-if="!!error" class="input__error--message">{{ error }}</span>
    <slot></slot>
  </div>
</template>

<script>
import { Input } from "element-ui";

export default {
  name: "FormInput",
  components: {
    Input
  },
  props: {
    type: { required: true },
    label: { required: false },
    name: { required: true },
    value: { required: true },
    error: { required: true },
    inputmode: { required: false },
    placeholder: { required: true },
    title: { required: false },
    clearable: { required: false, default: true },
    accept: { required: false }
  }
};
</script>

<style lang="scss">
@import "../styles/forms.scss";
@import "../styles/theme.scss";

.input {
  &__container {
    position: relative;

    & .el-textarea {
      & > textarea {
        resize: none;
        height: 60px;
        font-family: $primary-font;

        &::placeholder {
          font-family: $primary-font;
        }
      }
    }
  }

  &__error {
    border: 1px solid $borderError;
    border-radius: 10px;
    margin-bottom: 8px;

    & .el-input__inner {
      border: none;
      border-radius: 50%;
    }

    &--message {
      font-size: 12px;
      color: $textError;
      position: absolute;
      left: 4px;
    }
  }

  &__tags {
    margin-top: 8px;

    &--list {
      display: inline-flex;
      position: absolute;
      left: 4px;

      & > li {
        margin-right: 8px;
      }
    }
  }
}
</style>
