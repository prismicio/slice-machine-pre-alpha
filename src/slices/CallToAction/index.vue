<template>
  <section class="canvas">
    <slot name="header" v-bind="slice.primary">
      <div class="header">
        <prismic-image :field="slice.primary.icon_image" />
        <h2>{{ $prismic.richTextAsPlain(slice.primary.title) }}</h2>
        <h4>{{ $prismic.richTextAsPlain(slice.primary.paragraph) }}</h4>
      </div>
    </slot>
    <div class="button">
      <slot name="call-to-action" :callToAction="slice.primary">
        <prismic-link :field="slice.primary.button_link">
          {{ slice.primary.button_label }}
        </prismic-link>
      </slot>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CallToAction',
  props: {
    slice: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';
.canvas {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  width: 80%;
  text-align: center;
}

.header {
  img {
    width: 68px;
    padding-bottom: 16px;
  }

  h2 {
    text-align: center;
    margin-bottom: 1rem;
  }

  h4 {
    padding-bottom: 2rem;
    margin: 0 auto;
  }
}

.button {
  margin: 0 auto;
}

a {
  -webkit-box-shadow: 0px 2px 4px 0px rgba(136, 136, 136, 0.24);
  -moz-box-shadow: 0px 2px 4px 0px rgba(136, 136, 136, 0.24);
  box-shadow: 0px 2px 4px 0px rgba(136, 136, 136, 0.24);
}
</style>
