<template>
  <section class="canvas">
    <slot name="header"  :header="slice.primary">
      <div class="header">
        <h1> {{ $prismic.richTextAsPlain(slice.primary.title) }} </h1>
        <p> {{ $prismic.richTextAsPlain(slice.primary.paragraph) }} </p>
      </div>
    </slot>
    <div class="call-to-action">
      <slot name="call-to-action"  :callToAction="slice.primary">
        <input type="text" :placeholder="slice.primary.placeholder"/>
        <input 
          type="button" 
          :value="slice.primary.button_label" 
          :onclick="`window.location.href='${slice.primary.button_link.url}'`" 
        />
      </slot>
    </div>
  </section>
</template>

<script>
export default {
  props: ['slice'],
  name: 'hero-section'
}
</script>

<style lang="scss" scoped>
.canvas{
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  width: 70%;
  text-align: center;
}

.header {
  h1 {
    font-weight: 700;
    font-size: 64px;
    line-height: 84px;
  }

  p {
    font-size: 22px;
    line-height: 38px;
    width: 65%;
    margin: 0 auto;
    margin-bottom: 2rem;
  }
}

.call-to-action {
  width: 80%;
  margin: 0 auto;
}

input {
  -webkit-box-shadow: 0px 2px 4px 0px rgba(136,136,136,0.24);
  -moz-box-shadow: 0px 2px 4px 0px rgba(136,136,136,0.24);
  box-shadow: 0px 2px 4px 0px rgba(136,136,136,0.24);
}

input[type=text] {
  padding: 0 1em;
  margin-right: 20px;
  margin-bottom: 20px;
  text-decoration: none;
  width: 370px;
  height: 52px;
  border: 1px solid #F2F2F2;
  border-radius: 3px;
  text-align: left;
  font-size: 14px;
  line-height: 30px;
}

input[type=button] {
  background-color: #007AFF;
  color: white;
  text-decoration: none;
  width: 120px;
  height: 52px;
  border: 1px solid rgb(2, 89, 182);
  border-radius: 3px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  line-height: 30px;
  &:hover{
    background-color: rgb(2, 89, 182);
    cursor: pointer;
  }
  &:active{
    box-shadow: none;
    top: 5px;
  }
}

@media (max-width: 1200px){
  .header {
    p {
      width: 80%;
    }
  }
}

@media (max-width: 1000px) {
  .header {
    h1 {
      font-size: 54px;
    }

    p {
      font-size: 18px;
    }
  }

  input[type=text]{
    width: 250px;
  }
}

@media (max-width: 850px) {
  .header {
    h1 {
      font-size: 45px;
      line-height: 56px;
    }

    p {
      font-size: 16px;
      line-height: 30px;
    }
  }
}

@media (max-width: 757px) {
  input[type=text]{
    margin-right: 0;
  }

  input[type=button]{
    width: 278px;
  }
}
</style>
