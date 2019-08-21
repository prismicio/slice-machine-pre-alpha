<template>
  <section>
    <slot name="paragraph">
      <p>
        {{ isRichText(paragraph) ? paragraph : paragraph }}
      </p>
    </slot>
  </section>
</template>

<script>
import { isRichText, maybeRichTextValidator } from '../../utils'

export default {
  name: 'PascalCase',
  props: {
    // Example prop
    paragraph: {
      type: [String, Array],
      validator: maybeRichTextValidator,
      default: null
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

/* Your SCSS style here */
</style>
