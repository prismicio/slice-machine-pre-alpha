<template>
  <div class="card" />
</template>

<style lang="scss" scoped>
@import '../style/variables';

.card {
  width: calc(50% - #{$base-horizontal-margins});
  box-sizing: border-box;
  height: 490px;
  background: #fff;
  border: 1px solid #e1e1e1;
  &:nth-child(odd) {
    margin: 0;
    margin-right: $base-horizontal-margins;
  }

  &:nth-child(even) {
    margin: 0;
    margin-left: $base-horizontal-margins;
  }
}
</style>
