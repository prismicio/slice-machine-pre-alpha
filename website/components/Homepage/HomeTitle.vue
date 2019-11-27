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
@import '../../style/_global';

h1 {
  font-size: 36px;
  line-height: 42px;
  font-weight: 800;
  @include md {
    font-size: 60px;
    line-height: 71px;
  }
  span {
    margin: 0;
    display: inline-block;
    margin: 0 -4px;
    @include md {
      margin: 0 -5.5px;
    }
    .character {
      display: block;
      line-height: 0.6;
      margin-top: 7px;
      margin-bottom: 0;
      margin-right: -8px;
      @include md {
        margin-top: 10px;
      }
    }
  }
}
</style>
