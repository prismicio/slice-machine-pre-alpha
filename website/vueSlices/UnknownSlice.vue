<template>
  <div>
    <h1>Slice of type {{ sliceType }} has no corresponding component!</h1>
    <p>
      Make sure you created a component with a kebab-cased tag that matches your
      slice type
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
    console.log('Slice data received:', this.slice)
    return {
      sliceType: this.slice ? `'${this.slice.slice_type}'` : "'Unkown'"
    }
  }
}
</script>
