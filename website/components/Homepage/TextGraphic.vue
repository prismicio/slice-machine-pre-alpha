<template>
  <section class="grid">
    <div>
      <prismic-image :field="slice.primary.graphic" />
    </div>
    <div>
      <h3>{{ $prismic.asText(slice.primary.subtitle) }}</h3>
      <prismic-rich-text
        :field="slice.primary.sub_description"
        class="home_body_text"
      />
    </div>
  </section>
</template>

<script>
export default {
  name: 'GraphicBlock',
  props: {
    slice: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/_global';

.grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 4rem;

  * {
    width: 100%;

    img {
      object-fit: contain;
    }
  }

  @include lg {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
