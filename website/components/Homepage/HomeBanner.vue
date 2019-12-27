<template>
  <section class="banner">
    <div class="call_to_action">
      <!-- <prismic-rich-text :field="document.title" /> -->
      <h1 class="site-title">
        Slİcemachİne
      </h1>
      <p class="big_description">
        {{ document.description[0].text }}
      </p>
      <div class="clipboard" @click.stop.prevent="copyCommand">
        <prismic-rich-text
          class="embed-text"
          :field="document.copy_paste_embed"
        />
        <img src="../../static/clipboard.png" />
        <input
          id="command-to-copy"
          type="hidden"
          :value="document.copy_paste_embed[0].text"
        />
      </div>
      <prismic-rich-text
        :field="document.small_description"
        class="small_description"
      />
    </div>
  </section>
</template>

<script>
export default {
  name: 'HomeBanner',
  props: {
    document: {
      type: Object,
      required: true
    }
  },
  methods: {
    copyCommand() {
      const commandToCopy = document.querySelector('#command-to-copy')
      commandToCopy.setAttribute('type', 'text')
      commandToCopy.select()

      try {
        const successful = document.execCommand('copy')
        const msg = successful ? 'successful' : 'unsuccessful'
        alert('Command was copied ' + msg)
      } catch (err) {
        alert('Oops, unable to copy')
      }

      /* unselect the range */
      commandToCopy.setAttribute('type', 'hidden')
      window.getSelection().removeAllRanges()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/_global';

.banner {
  height: 288px;
  padding-top: 12px;
  @include md {
    padding-top: 44px;
  }
  @include lg {
    max-width: 450px;
    height: 500px;
    max-height: 582px;
  }
  @include xl {
    max-width: 540px;
    height: 576px;
  }
}
.call_to_action {
  padding-top: 12px;
  @include lg {
    padding-top: 44px;
  }
  h1 {
    text-transform: uppercase;
    font-size: 36px;
    line-height: 42px;
    font-weight: 800;
    @include xl {
      font-size: 60px;
      line-height: 71px;
    }
  }
}
.clipboard {
  display: flex;
  justify-content: space-between;
  color: #ffffff;
  background-color: $black-primary;
  border-radius: 5px;
  padding: 20px;
  margin: 20px 0;
  cursor: pointer;
  max-width: 400px;
  img {
    display: none;
    @include rwd(400) {
      margin-left: 30px;
      display: inline-block;
    }
  }
  .embed-text {
    text-align: center;
    font-size: 13px;
    @include sm {
      font-size: 16px;
    }
  }
  &:hover {
    background-color: $black-secondary;
  }
}
.big_description {
  font-size: 20px;
  line-height: 34px;
  color: $text-primary;
  @include lg {
    max-width: 530px;
  }
  @include xl {
    font-size: 24px;
    line-height: 40px;
  }
}
.small_description {
  font-size: 16px;
  line-height: 24px;
  color: $text-primary;
  @include lg {
    max-width: 430px;
  }
}
</style>
