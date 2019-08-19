<template>
  <div>
    <div class="container">
      <h1>My example:</h1>
    </div>
    <header-slice title="hello">
      <template v-slot:paragraph>
        <p>
          Salut les frèèères
        </p>
      </template>
    </header-slice>
  </div>
</template>

<script>
import { HeaderSlice } from '@/../src/slices'

export default {
  components: {
    HeaderSlice
  }
}
</script>

<style>
.container {
  max-width: 740px;
  padding: 40px;
  margin: auto;
}
</style>
