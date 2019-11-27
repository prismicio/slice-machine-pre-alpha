<template>
  <div class="banner">
    <prismic-image :field="slice.primary.banner_image" />
    <h2>
      {{ $prismic.asText(slice.primary.banner_title) }}
    </h2>
    <p>
      {{ $prismic.asText(slice.primary.banner_text) }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'BannerSlice',
  props: ['slice']
}
</script>
