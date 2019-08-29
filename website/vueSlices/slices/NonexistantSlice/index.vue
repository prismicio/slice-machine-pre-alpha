<template>
  <section class="container">
    <h1>Hello!</h1>
  </section>
</template>

<script>
export default {
  name: 'NonExistantSlice'
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables';

.container {
  max-width: $section-container;
  height: 50vh;
  border-bottom: 4px solid #111;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: tomato;
  &__center {
    width: 100%;
  }
}

@media only screen and (min-width: $desktop-min) {
  .container {
    background: $c-green-primary;
  }
}
</style>
