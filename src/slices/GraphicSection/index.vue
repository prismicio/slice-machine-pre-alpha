<template>
  <section class="container container--large">
    <div class="grid">
      <div class="grid__info">
        <slot name="info" v-bind="slice.primary">
          <h2 class="title">
            {{ $prismic.asText(slice.primary.title) }}
          </h2>
          <p class="paragraph">
            {{ $prismic.asText(slice.primary.paragraph) }}
          </p>
          <prismic-link class="link" :field="slice.primary.cta_link">
            {{ slice.primary.cta_label }}
          </prismic-link>
        </slot>
      </div>
      <div class="image">
        <slot name="image" v-bind="slice.primary">
          <prismic-image :field="slice.primary.graphic_image" />
        </slot>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'GraphicSection',
  props: {
    slice: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables';

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 2rem 0;
  width: 90%;
  min-height: 50vh;
  max-width: $screen-lg-min;
  text-align: center;
  &--large {
    max-width: $screen-xl-min;
  }
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  padding-top: 6vw;
  @include md {
    grid-template-columns: 1fr 1fr;
    padding-top: 0;
  }

  &__info {
    text-align: center;
    padding: 20px;
    @include md {
      text-align: left;
      padding-right: 20px;
    }

    * {
      margin: 0 auto;
      margin-bottom: 1rem;
      width: 100%;
    }

    .paragraph {
      width: 80%;
      @include md {
        margin-left: 0;
      }
    }

    .link {
      color: $color-primary;
      text-decoration: none;
    }

    .title {
      font-size: 48px;
      line-height: 64px;
      font-weight: bold;
    }
  }
}

.info {
  .cta {
    &:after {
      content: '\00003E';
      color: $blue-primary;
      padding: 4px;
      display: inline-block;
      box-sizing: border-box;
      transition: transform 150ms linear;
      transform: scaleY(1.5);
    }
    &:hover:after {
      transform: scaleY(1.5) scale(1.3);
    }
  }
}
.image {
  img {
    width: 100%;
  }
}
</style>
