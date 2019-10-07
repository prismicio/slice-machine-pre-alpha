<template>
  <div class="carousel-view">
    <h1>{{ $prismic.richTextAsPlain(slice.primary.title) }}</h1>
    <p>{{ $prismic.richTextAsPlain(slice.primary.paragraph) }}</p>
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
      <button class="carousel-controls__button" @click="previous">
        prev
      </button>
      <button class="carousel-controls__button" @click="next">
        next
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Videocarousel',
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

<style>
.carousel-view {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
}

.carousel-controls__button:hover {
  text-decoration: underline;
  cursor: pointer;
}

.carousel-controls__button:nth-of-type(1):hover {
  animation: underlineToDots 0.5s infinite linear;
}
.carousel-controls__button:nth-of-type(2):hover {
  animation: underlineToDots 0.5s infinite linear;
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
