<template>
  <div class="layout" :class="`layout--${name}`" :style="setVariables">
    <header class="header">
      <slot name="header" />
    </header>
    <aside class="aside">
      <slot name="aside" />
    </aside>
    <main class="main">
      <slot name="main" />
    </main>
    <slot />
  </div>
</template>

<script>
export default {
  name: "s-layout",

  props: {
    name: {
      type: String,
      default: "admin"
    },

    headerSize: {
      type: String,
      default: "50px"
    },

    asideSize: {
      type: String,
      default: "250px"
    }
  },

  computed: {
    setVariables() {
      let vars = {
        "--aside-size": "200px",
        "--header-size": "50px"
      };
      return vars;
    }
  }
};
</script>

<style lang="scss">
.layout--admin {
  height: 100vh;
  display: grid;
  grid-template-columns: var(--aside-size) auto;
  grid-template-rows: var(--header-size) auto;
  .aside {
    grid-column: 1 / 2;
    grid-row: 1 / 3;
  }
  .header {
    grid-column: 2 / 3;
  }
  .main {
    grid-column: 2 / 3;
  }
}
</style>
