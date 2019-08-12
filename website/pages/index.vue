<template>
  <main>
    <Header
      justify="space-between"
      :style="{ backgroundImage: `url('${image}')` }"
    >
      <div style="max-width: 450px">
        <Title content="Slices" />
        <Paragraph content="Built with and for Nuxt.js" />
        <Paragraph
          style="margin-top: 18px"
          content="Slices is a library of nuxt component that helps you build your nuxt website faster."
        />
        <Button variant="success">
          Content here
        </Button>
      </div>
    </Header>
    <Body>
      <p>Hello body</p>
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

const lst = Object.keys(Slices)
  .map(createSlice)
  .filter((e) => e) // eslint-disable-line

export default {
  components: {
    ...Slices,
    Header,
    Title,
    Paragraph,
    Button,
    Body
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
