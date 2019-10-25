<template>
  <section class="auto-grid">
    <div>
      <h3>{{ $prismic.asText(slice.primary.subtitle) }}</h3>
      <p>{{ $prismic.asText(slice.primary.sub_description) }}</p>
    </div>
    <div>
      <video :src="slice.primary.video.url" controls />
    </div>
  </section>
</template>

<script>
export default {
  name: 'VideoBlock',
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

    video {
      object-fit: contain;
    }
  }
}
</style>
