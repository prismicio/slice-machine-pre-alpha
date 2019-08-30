<template>
  <section class="container">
    <slot name="title">
      <prismic-rich-text
        v-if="slice.primary && slice.primary.title"
        :field="slice.primary.title"
      />
    </slot>
    <slot name="paragraph">
      <prismic-rich-text
        v-if="slice.primary && slice.primary.paragraph"
        :field="slice.primary.paragraph"
      />
    </slot>
  </section>
</template>

<script>
export default {
  name: 'HeaderSlice',
  props: {
    slice: {
      type: Object,
      validator: function(slice) {
        return slice && slice.primary && typeof slice.primary === 'object'
      },
      description: '',
      required: true
    }
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
    background: var(--c-green-primary, $c-green-primary);
  }
}
</style>
