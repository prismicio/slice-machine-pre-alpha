<template>
  <Flex class="container" :justify="justify" :align="align">
    <slot />
  </Flex>
</template>

<script>
import Flex from './Flex'
export default {
  name: 'Container',
  components: {
    Flex
  },
  props: {
    ...Flex.props
  }
}
</script>

<style lang="scss" scoped>
@import '../style/_variables';

.container {
  max-width: $container-width;
  min-height: 80vh;
  padding: 0 24px;
  flex-wrap: wrap;
}

@media screen and (max-width: 790px) {
  .container {
    padding: 0 16px;
  }
}
</style>
