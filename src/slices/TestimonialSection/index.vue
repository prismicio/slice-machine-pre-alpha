<template>
  <section class="canvas">
    <slot name="title" :title="slice.primary.title">
      <h1> {{ $prismic.richTextAsPlain(slice.primary.title) }} </h1>
    </slot>
    <div class="card-carousel-wrapper">
      <div class="card-carousel--nav__left" @click="moveCarousel(-1)" :disabled="atHeadOfList"></div>
      <div class="card-carousel">
        <div class="card-carousel--overflow-container">
          <div class="card-carousel-cards" :style="{ transform: 'translateX' + '(' + currentOffset + 'px' + ')'}">
            <div class="card-carousel--card" v-for="(item, index) in items" :key="'item-' + index">
              <slot :id="index" name="item" :item="item">
                <prismic-image :field="item.logo_image "/>
                <p> {{ $prismic.richTextAsPlain(item.paragraph) }} </p>
              </slot>
            </div>
          </div>
        </div>
      </div>
      <div class="card-carousel--nav__right" @click="moveCarousel(1)" :disabled="atEndOfList"></div>
    </div>
    <slot name="title" :link="slice.primary.link" :linkText="slice.primary.link_text">
      <prismic-link class="cta" :field="slice.primary.link">
        {{ $prismic.richTextAsPlain(slice.primary.link_text) }}
      </prismic-link>
    </slot>
  </section>
</template>

<script>
export default {
  props: ['slice'],
  name: 'testimonials-section',
  data() {
    return {
      items: this.slice.items,
      currentOffset: 0,
      windowSize: 3,
      paginationFactor: 410,
    }
  },
  computed: {
    atEndOfList() {
      return this.currentOffset <= (this.paginationFactor * -1) * (this.items.length - this.windowSize);
    },
    atHeadOfList() {
      return this.currentOffset === 0;
    },
  },
  methods: {
    moveCarousel(direction) {
      // Find a more elegant way to express the :style. consider using props to make it truly generic
      if (direction === 1 && !this.atEndOfList) {
        this.currentOffset -= this.paginationFactor;
      } else if (direction === -1 && !this.atHeadOfList) {
        this.currentOffset += this.paginationFactor;
      }
    },
  }
}
</script>

<style lang="scss" scoped>
$vue-navy: #2c3e50;
$vue-navy-light: #3a5169;
$vue-teal: #42b883;
$vue-teal-light: #42b983;
$gray: #666a73;
$light-gray: #f8f8f8;

.canvas{
  height: 80vh;
  margin-top: 100px;
  // background-color: #F8FAFB;

  h1 {
    font-size: 48px;
    line-height: 64px;
    display: flex;
    justify-content: center;
  }

  .cta{
    display: flex;
    justify-content: center;
    color: #007AFF;
    font-weight: 700;
    font-size: 16px;
    line-height: 34px;
  }
}

.card-carousel-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0 40px;
  color: $gray;
}

.card-carousel {
  display: flex;
  justify-content: center;
  width: 77em;
  
  &--overflow-container {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  
  &--nav__left,
  &--nav__right {
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
      color: #007AFF;
      box-sizing: border-box;
      transition: transform 150ms linear;
      transform: scaleY(1.5);
      background-color: rgba(0, 123, 255, 0.09);
    }
    &:hover:after{
      transform: scaleY(1.5) scale(1.3);
    }
    &[disabled] {
      opacity: 0.2;
      border-color: black;
    }
  }
  
  &--nav__left {
    &:after {
      content: "\00003C";
    }
  }
  
  &--nav__right {
    &:after {
      content: "\00003E";
    }
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
    cursor: pointer;
    -webkit-box-shadow: 0px 2px 4px 0px rgba(136,136,136,0.24);
    -moz-box-shadow: 0px 2px 4px 0px rgba(136,136,136,0.24);
    box-shadow: 0px 2px 4px 0px rgba(136,136,136,0.24);
    border: 1px solid #F2F2F2;
    border-radius: 4px;
    width: 24.375em; /* 390px */
    height: 326px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: all .2s ease-in-out;

    img {
      padding: 0 0 20px 0;
    }
    
    p {
      width: 70%;
      text-align: center;
      padding: 3px 0;
      margin: 0;
      margin-bottom: 2px;
      font-size: 19px;
      font-weight: 500;
      color: $vue-navy;
      user-select: none;
      
      &:nth-of-type(2) {
        font-size: 12px;
        font-weight: 300;
        padding: 6px;
        background: rgba(40,44,53,.06);
        display: inline-block;
        position: relative;
        margin-left: 4px;
        color: $gray;
        
        &:before {
          content:"";
          float:left;
          position:absolute;
          top:0;
          left: -12px;
          width:0;
          height:0;
          border-color:transparent rgba(40,44,53,.06) transparent transparent;
          border-style:solid;
          border-width:12px 12px 12px 0;
      }
      
        &:after {
          content:"";
          position:absolute;
          top:10px;
          left:-1px;
          float:left;
          width:4px;
          height:4px;
          border-radius: 2px;
          background: white;
          box-shadow:-0px -0px 0px #004977;
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

@media (max-width: 1350px) {
  .card-carousel {
    width: 85%;
  }
}

@media (max-width: 757px) {
  .card-carousel {
    &--nav__left,
    &--nav__right {
      display: none;
    }
  }
}
</style>
