<template>
  <section>
    <div class="container">
      <div class="header">
        <slot name="header" v-bind="slice.primary">
          <h1 class="header__title">
            {{ $prismic.asText(slice.primary.title) }}
          </h1>
          <h4 class="header__subtitle">
            {{ $prismic.asText(slice.primary.paragraph) }}
          </h4>
        </slot>
      </div>
    </div>
    <div class="container-carousel">
      <transition-group
        name="carousel"
        :class="`carousel ${slides.length === 2 ? 'carousel--vertical' : ''}`"
        tag="div"
      >
        <div
          v-for="(slide, index) in slides"
          :key="slide.id"
          ref="slides"
          class="slide"
          :class="{ 'slide--active': activeIndex === index }"
        >
          <video
            class="slide__video"
            :class="{ 'video--active': activeIndex === index }"
            :src="slide.video.url"
            controls
            @click="setActive(index, $event)"
          />
        </div>
      </transition-group>
      <div
        v-if="slides.length >= 3 || !!this.$slots['group-control']"
        :class="
          `container-carousel__group-control ${
            !!this.$slots['group-control'] ? 'display' : ''
          }`
        "
      >
        <slot
          name="group-control"
          v-bind="Object.assign(slice.primary, { previous, next })"
        >
          <button class="control" @click="previous">
            <div
              class="carousel__control__icon carousel__control__icon--left"
            />
          </button>
          <button class="control" @click="next">
            <div
              class="carousel__control__icon carousel__control__icon--right"
            />
          </button>
        </slot>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'VideoCarousel',
  props: {
    slice: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      slides: this.slice.items.map((slice, i) => ({
        ...slice,
        id: `carousel-slide-${slice.video.url}-${i + 1}`
      })),
      activeIndex: Math.floor(this.slice.items.length / 2)
    }
  },
  methods: {
    next() {
      const first = this.slides.shift()
      this.slides = this.slides.concat(first)

      const mover = document.querySelector('.carousel > div:first-of-type')
      mover.style.opacity = 0
      mover.addEventListener('transitionend', () => (mover.style.opacity = 1))
      this.$refs.slides.map(slide => slide.firstChild.pause())
    },
    previous() {
      const last = this.slides.pop()
      this.slides = [last].concat(this.slides)

      const mover = document.querySelector('.carousel > div:last-of-type')
      mover.style.opacity = 0
      mover.addEventListener('transitionend', () => (mover.style.opacity = 1))
      this.$refs.slides[this.activeIndex].firstChild.pause()
    },
    setActive(index, $event) {
      if ($event.target.className.includes('--active')) {
        return
      }
      this.$refs.slides.map(slide => {
        if (slide.firstChild.className !== '--active') {
          slide.firstChild.pause()
        }
      })
      if (this.slides.length > 2 && index > this.activeIndex) {
        this.next()
      }
      if (this.slides.length > 2 && index < this.activeIndex) {
        this.previous()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables';

section {
  margin-bottom: 4vw;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  padding: 2rem 0;
  width: 90%;
  max-width: $screen-lg-min;
  text-align: center;
}

.container-carousel {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  width: 100vw;
  text-align: center;
  margin: auto;
  position: relative;

  @include md {
    min-height: 70vh;
  }
  @include lg {
    padding-bottom: 6vw;
  }
  &__group-control {
    display: none;
    position: absolute;
    max-width: none;
    justify-content: space-between;
    margin: auto;
    bottom: 0;
    left: 20%;
    width: 60%;
    &.display {
      display: flex;
    }
    @include lg {
      display: flex;
    }
    button.control {
      background: transparent;
      border: none;
      outline: none;
      cursor: pointer;
    }
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

.carousel {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
  overflow: hidden;
  padding-bottom: 2vw;
  scroll-snap-type: x mandatory;

  &--vertical {
    flex-direction: column;
    .slide {
      video {
        width: 80vw;
        max-width: none;
        @include md {
          width: 60vw;
          max-width: 60vw;
        }
      }
    }
  }
}

.slide {
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;
  opacity: 1;
  margin: 0.6rem;
  scroll-snap-align: start;
  cursor: pointer;

  @include md {
    margin: 1rem;
  }
  video {
    object-fit: contain;
    width: 70vw;
    height: auto;
    @include md {
      width: 50vw;
    }
  }
  &--active {
    video {
      transition: all 0.3s ease-in-out;
      width: 80vw;
      @include md {
        width: 60vw;
      }
    }
  }
}

video {
  object-fit: contain;
}

.active {
  transition: all 0.3s ease-in-out;
}

.carousel__control {
  position: fixed;
  background-color: rgba(0, 123, 255, 0.09);
  border-radius: 100%;
  z-index: 1;

  &--left {
    left: 2vw;
    bottom: -2vw;
  }
  &--right {
    right: 2vw;
    bottom: -2vw;
  }

  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }

  &__icon {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    color: $color-primary;
    box-sizing: border-box;
    width: 1vw;
    height: 14px;
    border-width: 4px 4px 0 0;
    border-style: solid;
    margin: 16px;

    &:after,
    &:before {
      content: '';
      box-sizing: border-box;
    }

    &--left {
      left: 2px;
      transform: rotate(-135deg);
    }
    &--right {
      right: 2px;
      transform: rotate(45deg);
    }
  }
}

@media screen and (min-width: $screen-lg-min) {
  .carousel__control {
    position: relative;
    &__icon {
      width: 2vw;
      height: 2vw;
      margin: 1vw;
    }
    &--left {
      left: -2vw;
      bottom: auto;
    }
    &--right {
      bottom: auto;
      right: -2vw;
    }
  }
}
</style>
