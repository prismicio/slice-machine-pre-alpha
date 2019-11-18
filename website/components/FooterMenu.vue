<template>
  <div class="mainMenu">
    <Container justify="space-between">
      <div class="logo">
        <prismic-image :field="menu.logo" />
        <p><b>Slicemachine</b> by prismic</p>
      </div>
      <nav>
        <ul>
          <li v-for="menuLink in menu.menu_item" :key="menuLink.id">
            <prismic-link :field="menuLink.link">
              {{ menuLink.link_label }}
            </prismic-link>
          </li>
        </ul>
      </nav>
    </Container>
  </div>
</template>

<script>
import Container from '@/components/Container'

export default {
  name: 'MainMenu',
  components: {
    Container
  },
  props: {
    menu: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../style/_global';

a {
  display: contents;
  text-decoration: none;
  &:visited {
    color: $black-primary;
  }
}

.mainMenu {
  border-top: 1px solid #d3d2d2;
  height: 30px;
  padding: 30px 0;
  margin: 30px 0;
  min-height: 80px;
  .logo {
    display: inline-flex;
    align-items: center;
    p {
      padding: 0 5px;
    }
    b {
      font-size: 20px;
    }
  }
  ul {
    display: inline-flex;
    font-size: 14px;
  }
  li {
    display: inline-block;
    margin-left: 10px;
  }
}
</style>
