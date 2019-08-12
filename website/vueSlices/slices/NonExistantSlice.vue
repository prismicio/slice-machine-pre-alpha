<template>
  <div>
    <h1>Hello ? {{ hello }}</h1>
  </div>
</template>

<script>
export default {
  name: 'NonexistantSlice',
  data() {
    return {
      hello: true
    }
  }
}
</script>
