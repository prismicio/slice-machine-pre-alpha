<template>
  <section>
    <div class="hero-section">
      <div class="hero-section__inner">
        <p class="error">
          SliceZone Error
        </p>
        <h1>{{ camelize(slice.slice_type) }} <em>does not exist</em>.</h1>
      </div>
    </div>
    <div class="container">
      <p class="paragraph">
        Make sure you created a '{{ camelize(slice.slice_type) }}' component
        inside `sliceMachine/slices`. If not: create one!
      </p>
      <p>
        Check the console to check the payload received
      </p>
      <p>
        More info in the documentation:
        <a target="_blank" href="https://google.com">a link</a>
      </p>
    </div>
  </section>
</template>
<script>
import { camelize } from './utils'

export default {
  name: 'UnknownSlice',
  props: {
    slice: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      camelize
    }
  }
}
</script>

<style lang="scss" scoped="true">
.hero-section {
  background: #2b2b33;
  color: #fff;

  &__inner {
    max-width: 940px;
    margin: auto;
    padding: 2rem;
    .paragraph {
      color: #fff;
      max-width: 480px;
    }
  }
  * {
    margin-bottom: 1rem;
  }
}
.error {
  color: tomato;
  margin-bottom: 0;
}
.container {
  max-width: 940px;
  margin: auto;
  padding: 2rem;
  .paragraph {
    color: #fff;
    max-width: 480px;
  }
}
</style>
