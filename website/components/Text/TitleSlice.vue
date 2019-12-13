<template>
  <Body variant="body--white">
    <div class="container">
      <prismic-rich-text :field="slice.primary.title" />
    </div>
  </Body>
</template>

<script>
import Body from '@/components/Body'

export default {
  name: 'TitleSlice',
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
