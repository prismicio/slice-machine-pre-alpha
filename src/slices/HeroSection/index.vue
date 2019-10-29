<template>
  <section class="container container--full-height">
    <div class="header">
      <slot name="top-content" v-bind="slice" />
      <slot name="header" v-bind="slice.primary">
        <h1 class="header__title">
          {{ $prismic.asText(slice.primary.title) }}
        </h1>
        <p class="header__subtitle">
          {{ $prismic.asText(slice.primary.paragraph) }}
        </p>
      </slot>
    </div>
    <div v-if="slice.items" class="cta">
      <slot name="cta" v-bind="slice.items">
        <button
          v-for="(item, i) in slice.items"
          :key="`button-item-${i + 1}`"
          :class="
            `cta__button ${
              item.variant === 'secondary' ? 'cta__button--secondary' : ''
            }`
          "
          @click="e => handleLink(e, item.button_link)"
        >
          {{ item.button_label }}
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
    handleLink({ metaKey }, linkData) {
      /** Logic could be extracted from prismic-vue/Link */
      const link = this.$prismic.asLink(linkData)
      if (linkData.link_type === 'Web') {
        if (metaKey) {
          return window.open(link, '_newtab')
        }
        return (location.href = link)
      }
      return this.$router.push(link)
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
  margin: 0 auto;
  padding: 2rem 0;
  width: 90%;
  max-width: $screen-lg-min;
  text-align: center;
  &--full-height {
    min-height: 100vh;
  }
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

.cta {
  margin: 0 auto;
  max-width: 640px; // Should be sm
  *:not(:last-child) {
    margin-right: 0.6rem;
  }
  &__button {
    background: $color-primary;
    border: 1px solid $color-primary;
    cursor: pointer;
    padding: 12px 16px;
    border-radius: 3px;
    font-size: $font-size-button;
    color: #fff;
    -webkit-box-shadow: 0 2px 4px 0 rgba(136, 136, 136, 0.24);
    -moz-box-shadow: 0 2px 4px 0 rgba(136, 136, 136, 0.24);
    box-shadow: 0 2px 4px 0 rgba(136, 136, 136, 0.24);

    &--secondary {
      background: #fff;
      border: 1px solid #fff;
      color: $text-primary;
    }
  }
}
</style>
