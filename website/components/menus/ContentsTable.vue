<template>
  <nav>
    <ul>
      <div v-for="(anchor, index) in document" :key="`anchor-${index}`">
        <div v-if="anchor[0].type === 'heading1'">
          <li class="menu-sub-title">
            <a :href="`#${anchor[0].text.replace(/\W+/g, '-').toLowerCase()}`">
              {{ anchor[0].text }}
            </a>
          </li>
        </div>
      </div>
      <li>
        <div id="toc"></div>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'ContentsTable',
  props: {
    document: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/_global';

nav {
  border-left: 1px solid $grey-transparent;
  padding-left: 24px;
}
ul {
  padding: 8px 0;
}
li {
  list-style-type: none;
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
