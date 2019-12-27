<template>
  <Body variant="body--white">
    <prismic-rich-text :field="slice.primary.text" />
  </Body>
</template>

<script>
import Body from '@/components/Body'

export default {
  name: 'TextSlice',
  components: {
    Body
  },
  props: {
    slice: {
      type: Object,
      required: true
    }
  }
}
</script>
