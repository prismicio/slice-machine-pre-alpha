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
import HeaderSlice from '../../src/HeaderSlice'

export default {
  name: 'HeaderSliceExample',
  components: {
    HeaderSlice
  }
}
</script>
