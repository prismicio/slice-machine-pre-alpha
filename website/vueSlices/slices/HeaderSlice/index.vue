<template>
  <section class="container">
    <slot name="title">
      <h1>{{ title }}</h1>
    </slot>
    <slot name="paragraph">
      <p>{{ paragraph }}</p>
    </slot>
  </section>
</template>

<script>
import { isRichText, maybeRichTextValidator } from '../../utils'

export default {
  name: 'HeaderSlice',
  props: {
    paragraph: {
      type: [String, Array],
      default: 'paragraph',
      validator: maybeRichTextValidator
    },
    title: {
      type: String,
      default: 'title'
    }
  },
  data() {
    return {
      isRichText
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables';

.container {
  max-width: $section-container;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: tomato;
  &__center {
    width: 100%;
  }
}

@media only screen and (min-width: $desktop-min) {
  .container {
    background: $c-green-primary;
  }
}
</style>
