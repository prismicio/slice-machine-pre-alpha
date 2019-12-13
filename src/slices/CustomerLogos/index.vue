<template>
  <section class="ps ps--beige ps-customer-logos">
    <div class="ps__wrap">
      <div class="ps__head">
        <header class="ps__header">
          <h2 class="ps__kicker" aria-level="2">
            Customer Logos
          </h2>
        </header>
      </div>
      <div class="ps__main">
        <ul role="list" class="ps-customer-logos__list">
          <li
            v-for="(item, index) in dataItems"
            :key="`sdfsdfsdf-${index + 1}`"
            class="ps-customer-logos__item"
          >
            <a href="#">
              <img src="https://picsum.photos/200" alt="" />
            </a>
          </li>
        </ul>
        <a href="#" class="ps-customer-logos__link">View customer stories</a>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'CustomerLogos',
  data() {
    return {
      dataItems: Array(5)
    }
  }
}
</script>
<style lang="scss" scoped>
.ps-customer-logos .ps__main {
  margin-top: 0;
}

.ps-customer-logos .ps__kicker {
  text-align: center;
}

.ps-customer-logos__list {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: center;
  margin: var(--v-margin) auto;
}

.ps-customer-logos__item {
  display: inline-block;
  margin: var(--v-margin);
  margin-right: calc(2 * var(--h-padding));
  a {
    display: block;
  }
}

.ps-customer-logos__link {
  color: inherit;
  text-decoration: underline;
  font-weight: normal;
  display: block;
  text-align: center;
}

@supports (display: grid) {
  .ps-customer-logos__list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    grid-column-gap: var(--h-padding);
    grid-row-gap: var(--v-margin);
    align-items: center;
  }

  .ps-customer-logos__item {
    margin: 0;
    text-align: center;
  }
}
</style>
