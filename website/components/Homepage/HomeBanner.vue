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
        <prismic-rich-text :field="document.copy_paste_embed" />
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
  min-height: 576px;
  margin-top: 0px;
  max-width: 100%;
  @include md {
    margin-top: 62px;
  }
}
.call_to_action {
  max-width: 540px;
  padding-top: 44px;
  h1 {
    text-transform: uppercase;
    font-size: 36px;
    line-height: 42px;
    font-weight: 800;
    @include md {
      font-size: 60px;
      line-height: 71px;
    }
  }
}
.clipboard {
  width: 100%;
  display: flex;
  color: #ffffff;
  background-color: $black-primary;
  border-radius: 5px;
  padding: 20px 5px;
  margin: 20px 0;
  cursor: pointer;
  @include md {
    padding: 20px;
    width: 400px;
  }
  img {
    display: none;
    @include md {
      margin-left: 30px;
      display: inline-block;
    }
  }
  pre {
    font-size: 13px;
    @include md {
      font-size: 16px;
    }
  }
  &:hover {
    background-color: $black-secondary;
  }
}
.big_description {
  max-width: 530px;
  font-size: 20px;
  line-height: 34px;
  color: $text-primary;
  @include md {
    font-size: 24px;
    line-height: 40px;
  }
}
.small_description {
  max-width: 430px;
  font-size: 16px;
  line-height: 24px;
  color: $text-primary;
}
</style>
