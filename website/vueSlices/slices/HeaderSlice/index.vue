<template>
  <section class="container">
    <slot name="title">
      <prismic-rich-text v-if="isTextRich" :field="slice.primary.title" />
      <h1 v-else>
        {{ slice.primary.title }}
      </h1>
    </slot>
    <slot name="paragraph">
      <prismic-rich-text
        v-if="isParagraphRich"
        :field="slice.primary.paragraph"
      />
      <p v-else>
        {{ slice.primary.paragraph }}
      </p>
    </slot>
  </section>
</template>

<script>
import { isRichText } from '../../utils'

export default {
  name: 'HeaderSlice',
  props: {
    slice: {
      type: Object,
      required: true
    }
  },

  computed: {
    isTextRich: vm => isRichText(vm.slice.primary.title),
    isParagraphRich: vm => isRichText(vm.slice.primary.paragraph)
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

<Headerslice>
  <template v-slot:title>
    <div>
      <img />
      <h1>Mon titre</h1>
    </div>
  </template>
</Headerslice>
