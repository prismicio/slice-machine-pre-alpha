<template>
  <prismic-rich-text :field="slice.primary.text" />
</template>

<script>
export default {
  name: 'TextSlice',
  props: ['slice']
}
</script>
