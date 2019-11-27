<template>
  <div class="app-screen container">
    <prismic-image :field="slice.primary.image" />
  </div>
</template>

<script>
export default {
  name: 'FullWidthImage',
  props: ['slice']
}
</script>
