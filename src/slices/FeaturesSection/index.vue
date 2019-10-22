<template>
  <section class="canvas">
    <div class="header">
      <slot name="header" v-bind="slice.primary">
        <h2>{{ $prismic.richTextAsPlain(slice.primary.title) }}</h2>
        <h4>{{ $prismic.richTextAsPlain(slice.primary.paragraph) }}</h4>
      </slot>
    </div>
    <div class="grid">
      <div
        v-for="(item, index) in slice.items"
        :key="'item-' + index"
        class="grid-item"
      >
        <slot :id="index" name="item" v-bind="item">
          <prismic-image :alt="item.alt" :field="item.icon_image" />
          <h3>{{ $prismic.richTextAsPlain(item.head) }}</h3>
          <p>{{ $prismic.richTextAsPlain(item.desc) }}</p>
          <div class="button">
            <prismic-link :field="item.button_link">
              {{ item.button_label }}
            </prismic-link>
          </div>
        </slot>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FeaturesSection',
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
  height: auto;
  margin: 0 auto;
  width: 90%;
  text-align: center;
}

.header {
  padding: 75px 50px 0 50px;
  margin: 0 auto;

  h2 {
    text-align: center;
    margin-bottom: 1rem;
  }

  h4 {
    margin: 0 auto;
  }
}

.grid {
  display: grid;
  grid-auto-flow: row;
  grid-template-rows: 1fr 1fr 1fr;
  padding-bottom: 0;
}

.grid-item {
  padding: 60px 0;
  border-bottom: 1px solid rgba(151, 151, 151, 0.2);
  border-right: 0;
  &:last-child {
    border-bottom: 0;
  }

  h3 {
    margin-top: 1rem;
  }

  p {
    margin: 1rem 0;
    text-align: center;
    color: $grey-secondary;
  }

  .button {
    margin: 0 auto;
  }

  &:last-child {
    border-right: 0;
  }
}
</style>
