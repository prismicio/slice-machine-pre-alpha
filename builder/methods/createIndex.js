const template = ({ tagName }) => `<template>
  <section>
    <slot name="paragraph">
      <p>
        {{ isRichText(paragraph) ? paragraph /> : paragraph }}
      </p>
    </slot>
  </section>
</template>

<script>
import { isRichText, maybeRichTextValidator } from "../../utils";

export default {
  // Will match slice_type '${tagName.replace('-', '_')}' in your Prismic API
  name: "${tagName}",
  props: {
    // Example prop
    paragraph: {
      type: [String, Array],
      validator: maybeRichTextValidator
    }
  },
  data: function() {
    return {
      isRichText
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

/* Your SCSS style here */
</style>
`

module.exports = template
