<template>
  <section class="canvas">
    <div class="intro-text">
      <slot name="title" v-bind="slice.primary.title">
        <h2>{{ $prismic.richTextAsPlain(slice.primary.title) }}</h2>
      </slot>
      <slot name="paragraph" v-bind="slice.primary.paragraph">
        <h4>{{ $prismic.richTextAsPlain(slice.primary.paragraph) }}</h4>
      </slot>
    </div>
    <div class="carousel-view">
      <div v-if="slides.length > 3" class="carousel-controls" @click="previous">
        <div class="carousel-controls--nav__left" />
      </div>
      <transition-group name="carousel" class="carousel" tag="div">
        <div
          v-for="(slide, index) in slides"
          :key="slide.id"
          ref="slides"
          class="slide"
          :class="{ active: activeIndex === index }"
        >
          <video
            class="slide__video"
            :class="{ active: activeIndex === index }"
            :src="slide.video.url"
            controls
            @click="setActive(index, $event)"
          />
        </div>
      </transition-group>
      <div v-if="slides.length > 3" class="carousel-controls" @click="next">
        <div class="carousel-controls--nav__right" />
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
      slides: this.slice.items.map(slide => ({
        ...slide,
        id:
          Math.random()
            .toString(36)
            .substring(2) + Date.now().toString(36)
      })),
      activeIndex: undefined
    }
  },
  methods: {
    next() {
      const first = this.slides.shift()
      this.slides = this.slides.concat(first)

      const mover = document.querySelector('.carousel > div:first-of-type')
      mover.style.opacity = 0
      mover.addEventListener('transitionend', () => {
        mover.style.opacity = 1
      })

      this.$refs.slides.map((slide, index) => {
        slide.firstChild.pause()
      })
    },
    previous() {
      const last = this.slides.pop()
      this.slides = [last].concat(this.slides)

      const mover = document.querySelector('.carousel > div:last-of-type')
      mover.style.opacity = 0
      mover.addEventListener('transitionend', () => {
        mover.style.opacity = 1
      })

      this.$refs.slides.map((slide, index) => {
        slide.firstChild.pause()
      })
    },
    setActive(index, $event) {
      this.activeIndex = index

      if ($event.target.className.includes('active')) {
        return
      }
      // Early exit for active video, sets default behaviour, delegates to browsers

      this.$refs.slides.map(slide => {
        if (slide.firstChild.className !== 'active') {
          slide.firstChild.pause()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/_slices.scss';

.canvas {
  height: 100vh;
  @include md {
    margin-top: 100px;
  }
}

.intro-text {
  text-align: center;

  h2 {
    text-align: center;
    margin-bottom: 1rem;
  }

  h4 {
    width: 90%;
    padding-bottom: 1rem;
    margin: 0 auto;
    @include md {
      padding-bottom: 3rem;
      width: 664px;
    }
  }
}

.carousel-view {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.carousel {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 25em;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  padding-top: 10px;
  padding-bottom: 20px;
}

.slide {
  height: 10em;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 1s ease-in-out;
  opacity: 1;
  margin: 1em;
  flex: 0 0 20em;
  @include sm {
    height: 15em;
  }
  @include md {
    height: 20em;
  }
}

video {
  object-fit: contain;
}

.active {
  height: 12em;
  transition: all 0.3s ease-in-out;
  @include sm {
    height: 17em;
  }
  @include md {
    height: 22em;
  }
}

.carousel-move {
  transition: transform 0.3s;
}

.slide__video {
  width: auto;
  height: 110%;
  display: flex;
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
    display: inline-block;
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
