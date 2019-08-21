<template>
  <main>
    <Header
      justify="space-between"
      :style="{ backgroundImage: `url('${image}')` }"
    >
      <div style="max-width: 450px">
        <Title content="Slices" />
        <Paragraph bold content="Built with and for Nuxt.js" />
        <Paragraph
          style="margin-top: 18px"
          content="Slices is a library of Nuxt components that helps you build your website faster."
        />
        <Button
          style="margin-top: 30px"
          variant="success"
          @click="$router.push('/prismic-example')"
        >
          Add it to my project
        </Button>
      </div>
    </Header>
    <Body>
      <Row>
        <Card v-for="card in lst" :key="card.displayName" v-bind="card" />
      </Row>
    </Body>
  </main>
</template>

<script>
import Slices from '@/../src'
import { createSlice } from '~/utils'

import Header from '@/components/Header'
import Body from '@/components/Body'
import Title from '@/components/Text/Title'
import Paragraph from '@/components/Text/Paragraph'
import Button from '@/components/Button'
import headerImg from '@/static/head.svg'

import Card from '@/components/Card'
import Row from '@/components/Row'

const lst = Object.keys(Slices)
  .map(createSlice)
  .filter(e => e) // eslint-disable-line

export default {
  components: {
    ...Slices,
    Header,
    Title,
    Paragraph,
    Button,
    Body,
    Card,
    Row
  },
  data: () => ({
    lst,
    image: headerImg
  })
}
</script>

<style>
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
