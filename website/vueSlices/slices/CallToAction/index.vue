<template>
  <section class="canvas">
    <slot name="header" :header="slice.primary">
      <div class="header">
        <prismic-image :field="slice.primary.icon_image" />
        <h1>{{ $prismic.asText(slice.primary.title) }}</h1>
        <p>{{ $prismic.asText(slice.primary.paragraph) }}</p>
      </div>
    </slot>
    <div class="call-to-action">
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
.canvas {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  width: 70%;
  text-align: center;
}

.header {
  img {
    width: 68px;
    padding-bottom: 15px;
  }

  h1 {
    font-weight: 700;
    font-size: 48px;
    line-height: 64px;
  }

  p {
    font-size: 22px;
    line-height: 38px;
    width: 65%;
    margin: 0 auto;
    margin-bottom: 2rem;
  }
}

.call-to-action {
  width: 80%;
  margin: 0 auto;
}

input {
  -webkit-box-shadow: 0px 2px 4px 0px rgba(136, 136, 136, 0.24);
  -moz-box-shadow: 0px 2px 4px 0px rgba(136, 136, 136, 0.24);
  box-shadow: 0px 2px 4px 0px rgba(136, 136, 136, 0.24);
}

input[type='button'] {
  background-color: #007aff;
  color: white;
  text-decoration: none;
  width: 134px;
  height: 52px;
  border: 1px solid rgb(2, 89, 182);
  border-radius: 3px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  line-height: 30px;
  &:hover {
    background-color: rgb(2, 89, 182);
    cursor: pointer;
  }
  &:active {
    box-shadow: none;
    top: 5px;
  }
}

@media (max-width: 1200px) {
  .header {
    p {
      width: 80%;
    }
  }
}

@media (max-width: 850px) {
  .header {
    h1 {
      font-size: 45px;
      line-height: 56px;
    }

    p {
      font-size: 16px;
      line-height: 30px;
    }
  }
}

@media (max-width: 757px) {
  input[type='button'] {
    width: 278px;
  }
}
</style>
