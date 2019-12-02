<template>
  <section class="card-section">
    <h3 class="card-section-title">
      {{ $prismic.asText(slice.primary.card_box_title) }}
    </h3>
    <prismic-rich-text
      :field="slice.primary.card_box_description"
      class="card-section-description"
    />
    <row class="card-section-library">
      <Card
        v-for="card in lst.slice(0, 3)"
        :key="card.displayName"
        v-bind="card"
        variant="3col"
        class="threeCards"
      />
      <Card
        v-for="card in lst.slice(0, 1)"
        :key="card.displayName"
        v-bind="card"
        class="oneCard"
      />
    </row>
    <Button variant="text-white">
      <prismic-link :field="slice.primary.button_link">
        {{ slice.primary.button_label }}
      </prismic-link>
    </Button>
  </section>
</template>

<script>
import Slices from '@/../src'
import { createSlice } from '~/utils'
import Card from '@/components/Card'
import Row from '@/components/Row'
import Button from '@/components/Button'

const lst = Object.keys(Slices)
  .map(createSlice)
  .filter(e => e) // eslint-disable-line

export default {
  name: 'HomeLib',
  components: {
    ...Slices,
    Card,
    Row,
    Button
  },
  props: {
    slice: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    lst
  })
}
</script>

<style lang="scss" scoped>
@import '../../style/_global';

.card-section {
  margin: 0 auto;
  display: grid;
  grid-template-columns: [container-start] minmax(0, 1fr) [container-end];
  &-title {
    text-align: left;
    font-size: 28px;
    line-height: 50px;
    @include md {
      text-align: center;
    }
  }
  &-description {
    max-width: 800px;
    text-align: left;
    margin: 0 auto;
    font-size: 18px;
    line-height: 34px;
    @include md {
      text-align: center;
    }
  }
  &-library {
    margin-bottom: 50px;
  }
  .button {
    margin: 0 auto;
    width: 250px;
    height: 70px;
    font-size: 20px;
    line-height: 24px;
    display: grid;
    a {
      text-decoration: none;
    }
  }
}
.threeCards {
  display: none;
  @include md {
    display: inline;
  }
}
.oneCard {
  display: inline;
  @include md {
    display: none;
  }
}
</style>
