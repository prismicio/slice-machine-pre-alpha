<template>
  <div class="container">
    <div>
      <h1 style="margin-bottom: 2em">
        Slices
      </h1>
      <ul>
        <li v-for="elem in lst" :key="elem.name">
          -
          <a :href="`/components/${elem.key}`"> {{ elem.key }} </a>, then:
          {{ elem.meta.description }}
        </li>
      </ul>
      <div class="links">
        <a
          href="https://github.com/hypervillain/community"
          target="_blank"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Slices from '@/../src'
import { createSlice } from '~/utils'

const lst = Object.keys(Slices)
  .map(createSlice)
  .filter((e) => e) // eslint-disable-line

export default {
  components: {
    ...Slices
  },
  data: () => ({
    lst
  })
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
