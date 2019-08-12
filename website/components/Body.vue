<template>
  <section :class="`body body--${variant}`">
    <Container justify="space-between" align="start">
      <Row>
        <Card v-for="value in Array.from('12')" :key="value">
          {{ value }}
        </Card>
      </Row>
      <Row>
        <Card v-for="value in Array.from('34')" :key="value">
          {{ value }}
        </Card>
      </Row>
      <Row>
        <Card v-for="value in Array.from('56')" :key="value">
          {{ value }}
        </Card>
      </Row>
    </Container>
  </section>
</template>

<script>
import Container from '@/components/Container'
import Card from '@/components/Card'
import Row from '@/components/Row'

export default {
  name: 'Body',
  components: {
    Card,
    Container,
    Row
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
