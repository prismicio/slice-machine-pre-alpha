<template>
  <nav>
    <ul>
      <li v-for="menuLink in sideMenu.menu_item" :key="menuLink.id">
        <prismic-link :field="menuLink.link">
          {{ menuLink.link_label }}
        </prismic-link>
      </li>
      <li class="menu-sub-title">
        <b>Slice Components</b>
      </li>
      <li
        v-for="card in compsData"
        :key="card.displayName"
        v-bind="card.displayName"
      >
        <nuxt-link :to="`/components/${card.displayName}`">
          {{ card.meta.title }}
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'SideList',
  props: {
    compsData: {
      type: Array,
      required: true
    },
    sideMenu: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/_global';

ul {
  padding: 0;
}
li {
  list-style-type: none;
  padding: 8px 0;
}
.menu-sub-title {
  padding: 28px 0 24px 0;
}
a {
  text-decoration: none;
  color: $black-primary;
  &:visited {
    color: $black-primary;
  }
  &:hover {
    color: $black-secondary;
  }
}
</style>
