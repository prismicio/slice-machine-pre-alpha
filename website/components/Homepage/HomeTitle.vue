<template>
  <h1>
    SL
    <span>
      <span class="character">.</span>
      <span class="character">I</span>
    </span>
    CEMACH
    <span>
      <span class="character">.</span>
      <span class="character">I</span>
    </span>
    NE
  </h1>
</template>

<script>
export default {
  name: 'HomeTitle'
}
</script>

<style lang="scss" scoped>
h1 {
  font-size: 60px;
  line-height: 71px;
  span {
    margin: 0;
    display: inline-block;
    margin-left: -2.5px;
    .character {
      display: block;
      line-height: 0.6;
      margin-top: 10px;
      margin-bottom: 0;
      margin-right: -8px;
    }
  }
}
</style>
