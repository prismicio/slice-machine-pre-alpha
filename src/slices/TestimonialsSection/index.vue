<template>
  <section class="canvas">
    <slot name="title" v-bind="slice.primary.title">
      <h2>{{ $prismic.asText(slice.primary.title) }}</h2>
    </slot>
    <div class="card-carousel-wrapper">
      <div class="carousel-controls" @click="previous">
        <div class="carousel-controls--nav__left" />
      </div>
      <div class="card-carousel">
        <div class="card-carousel--overflow-container">
          <transition-group
            name="carousel"
            class="card-carousel-cards"
            tag="div"
          >
            <div
              v-for="(item, index) in items"
              :key="item.id"
              class="card-carousel--card"
            >
              <slot :id="index" name="item" v-bind="item">
                <prismic-image :field="item.logo_image" />
                <p>{{ $prismic.asText(item.paragraph) }}</p>
              </slot>
            </div>
          </transition-group>
        </div>
      </div>
      <div class="carousel-controls" @click="next">
        <div class="carousel-controls--nav__right" />
      </div>
    </div>
    <slot
      name="title"
      :link="slice.primary.link"
      :linkText="slice.primary.link_text"
    >
      <prismic-link class="call-to-action" :field="slice.primary.link">
        {{ $prismic.asText(slice.primary.link_text) }}
      </prismic-link>
    </slot>
  </section>
</template>

<script>
export default {
  name: 'TestimonialsSection',
  props: {
    slice: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      items: this.slice.items.map(item => ({
        ...item,
        id:
          Math.random()
            .toString(36)
            .substring(2) + Date.now().toString(36)
      }))
    }
  },
  methods: {
    next() {
      const first = this.items.shift()
      this.items = this.items.concat(first)

      const mover = document.querySelector(
        '.card-carousel-cards > div:first-of-type'
      )
      mover.style.opacity = 0
      mover.addEventListener('transitionend', () => {
        mover.style.opacity = 1
      })
    },
    previous() {
      const last = this.items.pop()
      this.items = [last].concat(this.items)

      const mover = document.querySelector(
        '.card-carousel-cards > div:last-of-type'
      )
      mover.style.opacity = 0
      mover.addEventListener('transitionend', () => {
        mover.style.opacity = 1
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables';

.canvas {
  height: 80vh;
  margin-top: 100px;
  padding: 50px 0;
  // background-color: #f8fafb;

  h2 {
    text-align: center;
    margin-bottom: 2rem;
  }

  a {
    display: flex;
    justify-content: center;
  }
}

.card-carousel-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0 40px;
}

.card-carousel {
  display: flex;
  justify-content: center;
  width: 85%;
  cursor: ew-resize;

  &--overflow-container {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
}

.card-carousel-cards {
  display: inline-flex;
  margin: 5px;
  margin-bottom: 20px;
  transition: transform 150ms ease-out;
  transform: translatex(0px);

  .card-carousel--card {
    background-color: #ffffff;
    margin: 0 10px;
    cursor: ew-resize;
    -webkit-box-shadow: 0px 2px 4px 0px rgba(136, 136, 136, 0.24);
    -moz-box-shadow: 0px 2px 4px 0px rgba(136, 136, 136, 0.24);
    box-shadow: 0px 2px 4px 0px rgba(136, 136, 136, 0.24);
    border: 1px solid #f2f2f2;
    border-radius: 4px;
    width: 390px;
    height: 326px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease-in-out;

    img {
      padding: 0 0 20px 0;
    }

    p {
      line-height: 24px;
      width: 70%;
      text-align: center;
      padding: 3px 0;
      margin: 0;
      margin-bottom: 2px;
      user-select: none;
      color: $gray-primary;
      font-size: $body-font-size-desktop;
      font-family: $body-font-family-primary;
      font-weight: $body-font-weight-primary;

      &:nth-of-type(2) {
        font-size: 12px;
        font-weight: 300;
        padding: 6px;
        background: rgba(40, 44, 53, 0.06);
        display: inline-block;
        position: relative;
        margin-left: 4px;

        &:before {
          content: '';
          float: left;
          position: absolute;
          top: 0;
          left: -12px;
          width: 0;
          height: 0;
          border-color: transparent rgba(40, 44, 53, 0.06) transparent;
          border-style: solid;
          border-width: 12px 12px 12px 0;
        }

        &:after {
          content: '';
          position: absolute;
          top: 10px;
          left: -1px;
          float: left;
          width: 4px;
          height: 4px;
          border-radius: 2px;
          background: white;
          box-shadow: -0px -0px 0px #004977;
        }
      }
    }

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }
}

.carousel-controls {
  margin: 2em;
  background-color: rgba(0, 123, 255, 0.09);
  border-radius: 100%;

  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }

  &--nav__left,
  &--nav__right {
    position: relative;
    display: none;
    vertical-align: middle;
    color: $blue-primary;
    box-sizing: border-box;
    width: 14px;
    height: 14px;
    border-width: 4px 4px 0 0;
    border-style: solid;
    margin: 16px;

    &:after,
    &:before {
      content: '';
      box-sizing: border-box;
    }
  }

  &--nav__left {
    left: 2px;
    transform: rotate(-135deg);
  }
  &--nav__right {
    right: 2px;
    transform: rotate(45deg);
  }
}
</style>
