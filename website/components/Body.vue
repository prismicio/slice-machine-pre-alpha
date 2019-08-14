<template>
  <section :class="`body body--${variant}`">
    <Container justify="space-between" align="start">
      <slot />
    </Container>
  </section>
</template>

<script>
import Container from '@/components/Container'

export default {
  name: 'Body',
  components: {
    Container
  },
  props: {
    variant: {
      type: String,
      default: 'default',
      required: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../style/_variables';

.body {
  padding: 32px 0;
  &--default {
    background: $bg-secondary;
  }
  &--white {
    background: #fff;
  }
}
</style>
