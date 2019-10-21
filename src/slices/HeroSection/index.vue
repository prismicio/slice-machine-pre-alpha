<template>
  <section class="canvas">
    <slot name="header" v-bind="slice.primary">
      <div class="header">
        <h1>{{ $prismic.richTextAsPlain(slice.primary.title) }}</h1>
        <h4>{{ $prismic.richTextAsPlain(slice.primary.paragraph) }}</h4>
      </div>
    </slot>
    <div class="call-to-action">
      <slot name="call-to-action" v-bind="slice.primary">
        <!-- eslint-disable-next-line -->
        <input type="text" :placeholder="slice.primary.placeholder" />
        <div class="button">
          <prismic-link :field="slice.primary.button_link">
            {{ slice.primary.button_label }}
          </prismic-link>
        </div>
      </slot>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroSection',
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
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  width: 90%;
  text-align: center;
}

.header {
  h4 {
    padding-bottom: 2rem;
    width: 90%;
    margin: 0 auto;
  }
}

.call-to-action {
  margin: 0 auto;
  @include md {
    width: 80%;
  }
}

input {
  -webkit-box-shadow: 0px 2px 4px 0px rgba(136, 136, 136, 0.24);
  -moz-box-shadow: 0px 2px 4px 0px rgba(136, 136, 136, 0.24);
  box-shadow: 0px 2px 4px 0px rgba(136, 136, 136, 0.24);
}

input[type='text'] {
  padding: 0 1em;
  margin-right: 0;
  margin-bottom: 20px;
  text-decoration: none;
  width: 250px;
  height: 52px;
  border: 1px solid #f2f2f2;
  border-radius: 3px;
  text-align: left;
  font-size: 14px;
  line-height: 30px;
  @include md {
    width: 370px;
    margin-right: 20px;
  }
}
</style>
