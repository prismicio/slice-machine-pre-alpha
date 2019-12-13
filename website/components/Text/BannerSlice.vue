<template>
  <section class="banner">
    <Body variant="body--white">
      <div class="banner-content">
        <!-- <prismic-image :field="slice.primary.banner_image" /> -->
        <h2>
          {{ $prismic.asText(slice.primary.banner_title) }}
        </h2>
        <p>
          {{ $prismic.asText(slice.primary.banner_text) }}
        </p>
      </div>
    </Body>
  </section>
</template>

<script>
import Body from '@/components/Body'

export default {
  name: 'BannerSlice',
  components: {
    Body
  },
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

.banner {
  background-color: $grey-secondary;
  &-content {
    max-width: 450px;
    min-height: 240px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
