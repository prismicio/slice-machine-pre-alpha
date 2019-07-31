<template>
  <main>
    <PrismicSlice :slice="slice" />
  </main>
</template>

<script>
export default {
  data() {
    return {
      slice: {
        slice_type: 'header_slice',
        title: 'My custom title'
      }
    }
  }
}
</script>
