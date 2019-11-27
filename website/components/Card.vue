<template>
  <div
    :class="`card card--${variant}`"
    @mouseover="mouseover"
    @mouseleave="mouseleave"
  >
    <slot name="image">
      <div
        class="image-block"
        :style="{
          backgroundImage: `url('/components/${displayName}.png')`
        }"
      />
      <div
        :class="
          `hover-block ${hover || isInMyList ? 'hover-block--hovered' : ''}`
        "
      >
        <!-- <Button variant="text-white" @click="addOrRemove()">
          {{ isInMyList ? 'Remove from my project' : 'Add it to my project' }}
        </Button> -->
        <Button
          variant="text-white"
          style="margin-top: 12px"
          @click="$router.push(`/components/${displayName}`)"
        >
          Learn More
        </Button>
      </div>
    </slot>
    <slot name="description">
      <div class="description-block">
        <h4 class="description-block__title">
          {{ meta.title }}
        </h4>
        <p class="description-block__description">
          {{ meta.description }}
        </p>
      </div>
    </slot>
  </div>
</template>

<script>
import Button from '@/components/Button'

export default {
  name: 'Card',
  components: {
    Button
  },
  inheritAttrs: false,
  props: {
    meta: {
      type: Object,
      required: true
    },
    displayName: {
      type: String,
      required: true
    },
    variant: {
      type: String,
      default: 'default',
      required: false
    }
  },
  data() {
    return {
      hover: false
    }
  },
  computed: {
    isInMyList() {
      // Move this to parent asp
      return this.$store.state.slices.list.some(
        e => e.displayName === this.displayName
      )
    }
  },
  methods: {
    mouseover() {
      this.hover = true
    },
    mouseleave() {
      this.hover = false
    },
    addOrRemove() {
      if (this.isInMyList) {
        return this.$store.commit('slices/remove', {
          displayName: this.displayName
        })
      }
      this.$store.commit('slices/add', { displayName: this.displayName })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../style/_global';

.card {
  box-sizing: border-box;
  background: #fff;
  border: 1px solid $black-primary;
  border-radius: 3px;
  position: relative;
  width: 100%;
  margin: 32px 0 0 0;

  .image-block {
    width: 100%;
    height: 350px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    @include xl {
      height: 250px;
    }
  }

  .hover-block {
    width: 100%;
    height: 350px;
    top: 0;
    left: 0;
    display: none;
    background-image: linear-gradient(
      0deg,
      rgba(182, 182, 182, 0.95),
      rgba(182, 182, 182, 0.95)
    );
    &--hovered {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      flex-direction: column;
    }
    @include xl {
      height: 250px;
    }
  }

  .description-block {
    padding: 32px;
    font-size: 16px;
    line-height: 24px;
    border-top: 1px solid $black-primary;
    &__title {
      color: $text-darker;
    }
    &__description {
      color: $text-dark;
      margin-top: 8px;
    }
  }
}

@include xl {
  .card {
    &--2col {
      width: calc(50% - #{$base-horizontal-margins});
      &:nth-child(odd) {
        margin-right: $base-horizontal-margins;
      }

      &:nth-child(even) {
        margin-left: $base-horizontal-margins;
      }
    }
    &--3col {
      width: calc(100% / 3 - #{$base-horizontal-margins});
      &:not(:last-child) {
        margin-right: $base-horizontal-margins;
      }
    }
  }
}
</style>
