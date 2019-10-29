<template>
  <section class="container container--full-height">
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
    <div class="grid">
      <div
        v-for="(item, index) in slice.items"
        :key="`grid__item-${index + 1}`"
        class="grid__item"
      >
        <slot :id="index" name="item" v-bind="item">
          <prismic-image
            class="grid__item__icon-image"
            :alt="item.alt"
            :field="item.icon_image"
          />
          <h3 class="grid__item__head">
            {{ $prismic.asText(item.head) }}
          </h3>
          <p class="grid__item__desc">
            {{ $prismic.asText(item.desc) }}
          </p>
          <div class="grid__item__button">
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
@import '../../styles/variables';

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

  &__image {
    width: 7vw;
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

.grid {
  display: grid;
  grid-auto-flow: row;
  grid-template-rows: 1fr 1fr 1fr;
  padding-bottom: 0;
  margin-top: 4vw;
  @include md {
    grid-auto-flow: column;
    grid-template-rows: 100%;
    padding-bottom: 100px;
  }

  &__item {
    padding: 6vw;
    border-bottom: 1px solid rgba(151, 151, 151, 0.2);
    border-right: 0;
    &:last-child {
      border-bottom: 0;
    }
    @include lg {
      padding: 60px;
      border-right: 1px solid rgba(151, 151, 151, 0.2);
      border-bottom: 0;
    }
    &__icon-image {
      max-width: 160px;
    }
    &__head {
      margin-top: 1rem;
    }
    &__desc {
      margin: 1rem 0;
      text-align: center;
      color: $gray-secondary;
    }

    &__button {
      margin: 0 auto;
    }

    &:last-child {
      border-right: 0;
    }
  }
}
</style>
