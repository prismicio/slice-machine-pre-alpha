<template>
  <button :class="`button button--${variant}`" :type="type" v-on="$listeners">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'Container',
  props: {
    variant: {
      type: String,
      default: 'default',
      required: false
    },
    type: {
      type: String,
      default: 'button',
      required: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../style/_global';

.button {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: $black-primary;
  text-decoration: none;
  border: 1px solid $black-secondary;
  border-radius: 3px;
  text-align: center;
  min-width: 250px;
  height: 70px;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  transition-duration: 0.2s;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.6, 0, 0.3, 0.67);
  border-radius: 3px;
  outline: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-decoration: none;
  text-rendering: optimizeLegibility;
  -webkit-box-shadow: 0 2px 4px 0 rgba(136, 136, 136, 0.24);
  -moz-box-shadow: 0 2px 4px 0 rgba(136, 136, 136, 0.24);
  box-shadow: 0 2px 4px 0 rgba(136, 136, 136, 0.24);
  cursor: pointer;
  &--default {
    background: #f9f9fb;
    color: #1d2230;
    border: 1px solid #c9d0d8;
  }
  &--icon {
    background: transparent;
    border: none;
    padding: 7px 10px;
    box-shadow: none;
    &:hover {
      background-color: transparent;
    }
    &:active {
      box-shadow: none;
    }
  }
  &--success {
    background: $black-primary;
    border: 1px solid $black-primary;
    color: #fff;
  }
  &--reverse {
    color: $text-primary;
    border: 1px solid #fff;
    background: #fff;
  }
  &--text-white {
    color: #fff;
    border: none;
    a {
      color: #fff;
    }
  }
  &--text-black {
    color: $text-dark;
    border: none;
    background: transparent;
  }
  &:hover {
    background-color: $black-secondary;
    cursor: pointer;
  }
  &:active {
    box-shadow: none;
    top: 5px;
  }
}
</style>
