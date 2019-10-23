<template>
  <section class="canvas">
    <div class="grid">
      <div class="info">
        <slot name="info" v-bind="slice.primary">
          <h2>{{ $prismic.asText(slice.primary.title) }}</h2>
          <p>{{ $prismic.asText(slice.primary.paragraph) }}</p>
          <prismic-link class="cta" :field="slice.primary.cta_link">
            {{ slice.primary.cta_label }}
          </prismic-link>
        </slot>
      </div>
      <div class="graphic">
        <slot name="graphic" v-bind="slice.primary">
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
@import '../../styles/_slices.scss';

.canvas {
  height: auto;
  margin: 0 auto;
  width: 90%;
  text-align: center;
}

.grid {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 50px;
  height: 80vh;
  @include md {
    justify-content: space-around;
    flex-direction: row;
    padding-top: 0;
  }
}

.info {
  text-align: center;
  padding: 20px;
  @include md {
    text-align: left;
    padding-right: 20px;
  }

  p {
    width: 412px;
  }

  a {
    color: #484d52;
    text-decoration: none;
  }

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
.graphic {
  img {
    width: 100%;
  }
  @mixin xl {
    width: auto;
  }
}
</style>
