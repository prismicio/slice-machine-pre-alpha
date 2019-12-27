import Example from '@/../src/slices/HeaderSlice/example.vue'

export default {
  name: 'ExampleLoader',
  props: {
    componentName: {
      type: String,
      required: true
    }
  },
  render(h) {
    const component = () =>
			import(`@/../src/slices/HeaderSlice/example.vue`)
			  .then(m => m.default)
			  .catch(e => {
			    console.error(e)
			    return Example
			  })
    return h(component)
  }
}
