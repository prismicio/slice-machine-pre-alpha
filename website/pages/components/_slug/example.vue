<script>
export default {
  name: 'ComponentExample',
  render(h) {
    console.log('here', this.$route.params)
    const component = () =>
      import(`@/../src/slices/${this.$route.params}/example.vue`).catch(e => {
        console.error(e, 'there')
        return null
      })
    return h(component)
  }
}
</script>
