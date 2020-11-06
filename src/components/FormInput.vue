<template>
  <div :class="['form__group', !!error && 'form__error']">
    <label class="form__label" v-if="label" :for="name">{{ label }}</label>
    <Input
      :id="name"
      :name="name"
      :type="type"
      :inputmode="inputmode"
      :value="value"
      clearable
      :placeholder="placeholder"
      class="form__input"
      @input="$emit('input', $event)"
      @keypress="$emit('validate')"
    />
    <span v-if="!!error" class="form__input--error">{{ error }}</span>
  </div>
</template>

<script>
import { Input } from "element-ui";

export default {
  name: "FormInput",
  inheritAttrs: false,
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
    placeholder: { required: true }
  }
};
</script>

<style lang="scss">
@import "../styles/forms.scss";

.form__input {
  @include form-input;
}
</style>
