<template>
  <Body variant="body--white">
    <prismic-image :field="slice.primary.image" />
  </Body>
</template>

<script>
import Body from '@/components/Body'

export default {
  name: 'FullWidthImage',
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
