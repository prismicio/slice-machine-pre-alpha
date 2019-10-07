<template>
  <section class="canvas">
    <div class="grid">
      <div class="info">
        <slot name="info" :info="slice.primary">
          <h1> {{ $prismic.richTextAsPlain(slice.primary.title) }} </h1>
          <p> {{ $prismic.richTextAsPlain(slice.primary.paragraph) }} </p>
          <prismic-link class="cta" :field="slice.primary.cta_link">
            {{ slice.primary.cta_label }}
          </prismic-link>
        </slot>
      </div>
      <div class="graphic">
        <slot name="graphic" :graphic="slice.primary">
          <prismic-image :field="slice.primary.graphic_image "/>
        </slot>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['slice'],
  name: 'graphic-section',
}
</script>

<style lang="scss" scoped>
.canvas{
  height: auto;
  margin: 0 auto;
  width: 90%;
  text-align: center;
}

.grid{
  display: flex;
  align-items: center;
  height: 80vh;
}

.info{
  text-align: left;
  padding-right: 20px;

  h1 {
    font-size: 48px;
    line-height: 64px;
  }

  p {
    font-size: 16px;
    line-height: 24px;
  }

  a {
    color: #484D52;
    text-decoration: none;
  }

  .cta {
    &:after {
      content: "\00003E";
      color: #007AFF;
      padding: 4px;
      display: inline-block;
      box-sizing: border-box;
      transition: transform 150ms linear;
      transform: scaleY(1.5);
    }
    &:hover:after{
      transform: scaleY(1.5) scale(1.3);
    }
  }
}

@media (max-width: 800px) {
  .grid{
    padding-top: 50px;
    flex-direction: column;
  }
  .info{
    text-align: center;
    padding: 20px;
  }
}
</style>
