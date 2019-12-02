<template>
  <div class="container">
    <prismic-rich-text :field="slice.primary.title" />
  </div>
</template>

<script>
export default {
  name: 'TitleSlice',
  props: {
    slice: {
      type: Object,
      required: true
    }
  }
}
</script>
