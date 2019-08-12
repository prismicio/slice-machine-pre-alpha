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
  // Will match slice_type 'test_a' in your Prismic API
  name: 'TestA',
  props: {
    // Example prop
    paragraph: {
      type: [String, Array],
      default: null,
      validator: maybeRichTextValidator
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
