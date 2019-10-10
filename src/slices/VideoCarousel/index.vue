<template>
  <div class="carousel-view">
    <h1>{{ $prismic.richTextAsPlain(slice.primary.title) }}</h1>
    <p>{{ $prismic.richTextAsPlain(slice.primary.paragraph) }}</p>
    <div v-if="slides.length > 3" class="carousel-controls">
      <div class="carousel-controls__button" @click="previous" />
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
    <div v-if="slides.length > 3" class="carousel-controls">
      <div class="carousel-controls__button" @click="next" />
    </div>
  </div>
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
.carousel-view {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

h1 {
  font-size: 48px;
  line-height: 64px;
  font-weight: 700;
  color: #484d52;
  margin-bottom: 1rem;
  letter-spacing: 1.14px;
  font-family: Lato, sans-serif;
}

p {
  margin-bottom: 2rem;
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  color: #72767b;
  line-height: 38px;
  font-size: 22px;
}

.carousel {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 25em;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  padding-top: 10px;
  padding-bottom: 20px;
}

.slide {
  height: 20em;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 1s ease-in-out;
  opacity: 1;
  margin: 1em;
  flex: 0 0 20em;
}

video {
  object-fit: contain;
}

.active {
  height: 400px;
  transition: all 0.3s ease-in-out;
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

  &__button {
    display: block;
    height: 40px;
    width: 40px;
    font-size: 25px;

    &:after {
      cursor: pointer;
      display: block;
      font-family: Arial, Helvetica, sans-serif;
      border-radius: 100%;
      text-align: center;
      color: #007aff;
      box-sizing: border-box;
      transition: transform 150ms linear;
      transform: scaleY(1.5);
      background-color: rgba(0, 123, 255, 0.09);
    }

    &:hover {
      opacity: 0.5;
      cursor: pointer;
    }

    &:nth-of-type(1):after {
      content: '\00003C';
    }
    &:after {
      content: '\00003E';
    }
  }
}

@keyframes underlineToDots {
  0% {
    text-decoration: underline;
    text-decoration-style: dashed;
  }
  100% {
    text-decoration-style: solid;
  }
}
</style>
