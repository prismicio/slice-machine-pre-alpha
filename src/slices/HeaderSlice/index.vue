<template>
  <section class="container">
    <slot name="title">
      <prismic-rich-text v-if="isTextRich" :field="title" />
      <h1 v-else>
        {{ title }}
      </h1>
    </slot>
    <slot name="paragraph">
      <prismic-rich-text v-if="isParagraphRich" :field="paragraph" />
      <p v-else>
        {{ paragraph }}
      </p>
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
      type: [String, Array],
      required: true
    }
  },

  computed: {
    isTextRich: (vm) => isRichText(vm.title),
    isParagraphRich: (vm) => isRichText(vm.paragraph)
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables';

.container {
  max-width: $section-container;
  height: 50vh;
  border-bottom: 4px solid #111;
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
