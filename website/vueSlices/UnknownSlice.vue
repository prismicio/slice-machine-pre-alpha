<template>
  <div class="error">
    <h1>
      SliceZone did not manage to find a component matching the Prismic slice of
      type '{{ sliceType }}'.
    </h1>
    <p>
      Make sure you created a '{{ camelize(sliceType) }}' component inside
      `vueSlices/slices`. If not: create one!
    </p>
    <p>
      Check the console to check the payload received
    </p>
    <p>
      More info in the documentation:
      <a target="_blank" href="https://google.com">a link</a>
    </p>
  </div>
</template>

<script>
const camelizeRE = /-(\w)/g
const camelize = (str) => {
  str = str.replace(/_/g, '-').replace(camelizeRE, (_, c) => {
    return c ? c.toUpperCase() : ''
  })
  return str[0].toUpperCase() + str.slice(1)
}

export default {
  name: 'UnknownSlice',
  props: {
    slice: {
      type: Object,
      required: false,
      default: () => ({
        createdForDebug: true,
        slice_type: 'Unknown'
      })
    }
  },
  data() {
    console.log('Slice data received:', this.slice_type)
    return {
      sliceType: this.slice_type || "'Unknown'",
      camelize
    }
  }
}
</script>

<style lang="scss" scoped="true">
.error {
  min-height: 50vh;
  color: tomato;
  border: 4px solid #111;
  display: flex;
  flex-direction: column;
  & > * {
    margin-bottom: 2em;
  }
}
</style>
