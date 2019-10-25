<template>
  <section class="auto-grid">
    <div>
      <prismic-image :field="slice.primary.graphic" />
    </div>
    <div>
      <h3>{{ $prismic.asText(slice.primary.subtitle) }}</h3>
      <p>{{ $prismic.asText(slice.primary.sub_description) }}</p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'GraphicBlock',
  props: ['slice']
}
</script>

<style lang="scss" scoped>
@import '../style/_variables';

.auto-grid {
  --auto-grid-min-size: 16rem;
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(var(--auto-grid-min-size), 1fr)
  );
  grid-gap: 1rem;

  * {
    width: 100%;

    img {
      object-fit: contain;
    }
  }
}
</style>
