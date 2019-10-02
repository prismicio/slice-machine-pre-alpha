<template>
  <section class="container">
    <slot name="title">
      <h1>
        B
      </h1>
    </slot>
    <slot name="paragraph">
      A
    </slot>
  </section>
</template>

<script>
export default {
  name: 'HeaderSlice',
  props: {
    slice: {
      type: Object,
      required: true
    }
  }
}
</script>
