<template>
  <div>
    <h2>My example:</h2>
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
import HeaderSlice from './'

export default {
  name: 'ExampleWithoutPrismic',
  components: {
    HeaderSlice
  },
  data() {
    return {
      testData: true
    }
  }
}
</script>
