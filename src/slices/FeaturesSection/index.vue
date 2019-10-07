<template>
  <section class="canvas">
    <div class="header">
      <slot name="header" :header="slice.primary">
        <h1> {{ $prismic.richTextAsPlain(slice.primary.title) }} </h1>
        <p> {{ $prismic.richTextAsPlain(slice.primary.paragraph) }} </p>
      </slot>
    </div>
    <div class="grid">  
      <div class="grid-item" v-for="(item, index) in slice.items" :key="'item-' + index">
        <slot :id="index" name="item" :item="item">
          <prismic-image :alt="item.alt" :field="item.icon_image "/>
          <h2> {{ $prismic.richTextAsPlain(item.head) }} </h2>
          <p> {{ $prismic.richTextAsPlain(item.desc) }} </p>
          <input 
            type="button" 
            :value="item.button_label" 
            :onclick="`window.location.href='${item.button_link.url}'`" 
          />
        </slot>
      </div>  
    </div>
  </section>
</template>

<script>
export default {
  props: ['slice'],
  name: 'features-section',
}
</script>

<style lang="scss" scoped>
.canvas{
  height: auto;
  margin: 0 auto;
  width: 80%;
  text-align: center;
}

.header{
  padding: 75px 50px 50px 50px;
  margin: 0 auto;

  h1 {
    font-size: 48px;
    line-height: 64px;
  }

  p {
    width: 50%;
    margin: 0 auto;
    font-size: 22px;
    line-height: 38px;
  }
}

.grid{
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: 100%;
  padding-bottom: 100px;
}

.grid-item{
  padding: 0 60px;
  border-right: 1px solid rgba(151, 151, 151, 0.2);

  h2, p{
  padding: 5px 0;
  }

  h2 {
    font-size: 24px;
    line-height: 36px;
  }

  p{
    font-size: 16px;
    line-height: 24px;
  }

  &:last-child{
    border-right: 0;
  }
}

input[type=button] {
  background-color: #007AFF;
  color: white;
  text-decoration: none;
  width: 120px;
  height: 52px;
  border: 1px solid rgb(2, 89, 182);
  border-radius: 3px;
  -webkit-box-shadow: 0px 2px 4px 0px rgba(136,136,136,0.24);
  -moz-box-shadow: 0px 2px 4px 0px rgba(136,136,136,0.24);
  box-shadow: 0px 2px 4px 0px rgba(136,136,136,0.24);
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

@media (max-width: 1500px) {
  .header{
    padding: 75px 0 30px 0;

    p{
      width: 70%;
      margin-bottom: 20px;
    }
  }
}

@media (max-width: 899px) {
  .header{
    padding: 75px 0 0 0;

    p{
      width: 95%;
    }
  }

  .grid{
    grid-auto-flow: row;
    grid-template-rows: 1fr 1fr 1fr;
    padding-bottom: 0;
  }
  .grid-item{
    padding: 60px 0;
    border-bottom: 1px solid rgba(151, 151, 151, 0.2);
    border-right: 0;
    &:last-child{
      border-bottom: 0;
    }
  }
  input[type=button]{
    width: 278px;
  }
}
</style>
