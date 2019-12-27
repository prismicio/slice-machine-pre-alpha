<template>
  <div class="header">
    <Container :justify="justify" :align="align">
      <slot />
    </Container>
  </div>
</template>

<script>
import Container from '@/components/Container'

export default {
  name: 'Header',
  components: {
    Container
  },
  props: {
    ...Container.props
  }
}
</script>

<style lang="scss" scoped>
@import '../style/_variables';

.header {
	background-position: bottom right;
	background-size: 50%;
	background-repeat: no-repeat;
}
</style>
