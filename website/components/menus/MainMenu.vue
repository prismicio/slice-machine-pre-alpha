<template>
  <div class="mainMenu">
    <Container justify="space-between">
      <nav id="menu">
        <div class="logo">
          <nuxt-link to="/">
            <prismic-image :field="menu.logo" />
          </nuxt-link>
          <nuxt-link to="/">
            <span> <b>Slicemachine</b> by prismic </span>
          </nuxt-link>
        </div>
        <ul class="horizontal-nav">
          <li v-for="menuLink in menu.menu_item" :key="menuLink.id">
            <prismic-link :field="menuLink.link">
              {{ menuLink.link_label }}
            </prismic-link>
          </li>
          <li>
            <gh-btns-star slug="prismicio/slice-machine" class="gh-button-star">
            </gh-btns-star>
          </li>
          <li>
            <gh-btns-fork slug="prismicio/slice-machine" class="gh-button-fork">
            </gh-btns-fork>
          </li>
        </ul>
        <Burger></Burger>
      </nav>
    </Container>
    <Sidebar>
      <div class="sidebar-logo">
        <nuxt-link to="/">
          <prismic-image v-if="menu.logo" :field="menu.logo" />
        </nuxt-link>
        <nuxt-link to="/">
          <span> <b>Slicemachine</b> by prismic </span>
        </nuxt-link>
        <Burger class="side-burger"></Burger>
      </div>
      <ul class="sidebar-panel-nav">
        <div v-for="menuLink in menu.menu_item" :key="menuLink.id">
          <li v-if="menuLink.link_label === 'Slices Library'" class="top-level">
            <prismic-link :field="menuLink.link">
              {{ menuLink.link_label }}
            </prismic-link>
          </li>
          <li
            v-else-if="menuLink.link_label === 'Documentation'"
            class="top-level"
            @click="open = !open"
          >
            <prismic-link :field="menuLink.link">
              {{ menuLink.link_label }}
              <span
                class="accordion-item-trigger-icon"
                :class="{ isOpen: open }"
              ></span>
            </prismic-link>
            <ul v-show="open" class="second-level">
              <li v-for="listItem in lst" :key="listItem.displayName">
                <nuxt-link :to="`/components/${listItem.displayName}`">
                  {{ listItem.meta.title }}
                </nuxt-link>
              </li>
            </ul>
          </li>
          <li v-else class="top-level">
            <prismic-link :field="menuLink.link">
              {{ menuLink.link_label }}
            </prismic-link>
          </li>
        </div>
      </ul>
    </Sidebar>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Burger from '@/components/menus/Burger.vue'
import Sidebar from '@/components/menus/Sidebar.vue'
import Container from '@/components/Container'

import * as Slices from '~/../src/slices'
import { createSlice } from '~/utils'

const lst = Object.keys(Slices)
  .map(createSlice)
  .filter(e => e) // eslint-disable-line

export default {
  name: 'MainMenu',
  components: {
    ...Slices,
    Container,
    Burger,
    Sidebar
  },
  data() {
    return {
      lst,
      open: false
    }
  },
  computed: {
    ...mapState(['mainmenu']),
    menu() {
      return this.$store.state.mainmenu.menu
    }
  }
}
</script>

<style lang="scss">
@import '../../style/_global';

.mainMenu {
  border-bottom: 1px solid #d3d2d2;
  height: 30px;
  padding: 20px 0;
  min-height: 80px;
  #menu {
    display: contents;
  }
  .logo {
    display: inline-flex;
    align-items: center;
    b {
      padding: 0 5px;
      font-size: 16px;
      @include md {
        font-size: 20px;
      }
    }
    a {
      font-size: 13px;
      @include md {
        font-size: 16px;
      }
    }
  }
  .horizontal-nav {
    display: none;
    font-size: 14px;
    align-items: center;
    @include xl {
      display: inline-flex;
    }
    li {
      display: inline-block;
      margin-left: 10px;
    }
  }
  .sidebar-logo {
    display: inline-flex;
    align-items: center;
    padding: 20px 16px;
    width: 100%;
    b {
      padding: 0 5px;
      font-size: 16px;
      @include lg {
        font-size: 20px;
      }
    }
    a {
      font-size: 13px;
      @include lg {
        font-size: 16px;
      }
    }
  }
  .sidebar-panel-nav {
    padding: 0;
    .top-level {
      border-bottom: 1px solid $grey-transparent;
      a {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1em;
        font-weight: bold;
        cursor: pointer;
      }
      .second-level {
        border-top: 1px solid $grey-transparent;
        background-color: $grey-secondary;
      }
    }
    li {
      list-style-type: none;
      padding: 5px 0;
    }
    .accordion-item-trigger-icon {
      float: right;
      $size: 8px;
      display: inline-block;
      top: 0;
      right: 1.25rem;
      bottom: 0;
      margin: auto;
      width: $size;
      height: $size;
      border-right: 2px solid #363636;
      border-bottom: 2px solid #363636;
      transform: translateY(-$size / 4) rotate(45deg);
      transition: transform 0.2s ease;
      .isOpen & {
        transform: translateY($size / 4) rotate(225deg);
      }
    }
  }
  a {
    display: contents;
    text-decoration: none;
    color: $black-primary;
    &:visited {
      color: $black-primary;
    }
    &:hover {
      color: $black-secondary;
    }
  }
  .gh-button {
    border-radius: 0.25em;
    border: 1px solid $black-primary;
    color: #24292e;
    cursor: pointer;
    display: inline-block;
    font-family: $base-font-primary;
    font-size: 12px;
    font-weight: 600;
    line-height: 20px;
    padding: 3px 10px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    vertical-align: middle;
    white-space: nowrap;
    &-star {
      background-color: #ffffff;
      border-radius: 0.25em;
      color: $black-primary;
      &:hover {
        background-color: $grey-secondary;
      }
    }
    &-fork {
      background-color: $black-primary;
      border-radius: 0.25em;
      color: #ffffff;
      &:hover {
        background-color: $black-secondary;
      }
      a {
        &:visited {
          color: #ffffff;
        }
      }
    }
    .octicon {
      display: inline-block;
      vertical-align: text-top;
      fill: currentColor;
    }
  }
  @include xl {
    #burger {
      display: none;
    }
  }
}
</style>
