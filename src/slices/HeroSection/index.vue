<template>
  <section class="container">
    <div class="header">
      <slot name="top-content" />
      <slot name="header" v-bind="slice.primary">
        <h1 class="header__title">
          {{ $prismic.asText(slice.primary.title) }}
        </h1>
        <h4 class="header__subtitle">
          {{ $prismic.asText(slice.primary.paragraph) }}
        </h4>
      </slot>
    </div>
    <div class="call-to-action">
      <slot name="call-to-action" v-bind="slice.primary">
        <button @click="e => handleLink(e, slice.primary.button_link)">
          {{ slice.primary.button_label }}
        </button>
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
  },
  methods: {
    handleLink(e, data) {
      if (data.link_type === 'Web') {
        return location.replace(this.$prismic.asLink(data))
      }
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/_slices.scss';

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  padding-top: 2rem;
  min-height: 100vh;
  width: 90%;
  max-width: 940px;
  text-align: center;
}

.header {
  * {
    margin: 0 auto;
    margin-bottom: 2rem;
    width: 100%;
  }
  &__title {
    font-size: 42px;
    line-height: 48px;
    @include md {
      font-size: 5vw;
    }
    @include lg {
      font-size: 70px;
      line-height: 84px;
    }
  }
  &__subtitle {
    width: 90%;
    max-width: calc((940px / 3) * 2);
  }
}

.call-to-action {
  margin: 0 auto;
  @include md {
    width: 80%;
  }
}
</style>
