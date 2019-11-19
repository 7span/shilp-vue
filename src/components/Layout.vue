<template>
  <div class="layout" :style="setVariables">
    <!-- HEADER -->
    <header class="header">
      <slot name="header" />
    </header>

    <!-- ASIDE -->
    <aside class="aside" :class="{ 'aside--collapse': localAside.collapse }">
      <!-- LOGO -->
      <div class="logo">
        <img v-if="localAside.collapse" :src="asideOptions.logoCollapse" />
        <img v-else :src="asideOptions.logo" />
      </div>

      <!-- USER -->
      <div class="user">
        <slot v-if="localAside.collapse" name="user-collapse"></slot>
        <slot v-else name="user"></slot>
      </div>

      <!-- NAV -->
      <div class="aside__nav">
        <slot name="nav" />
      </div>

      <!-- ASIDE FOOTER -->

      <footer class="aside__footer">
        <s-button
          class="aside__toggle"
          shape="square"
          size="lg"
          :icon="asideOptions.toggleIcon"
          @click.native="localAside.collapse = !localAside.collapse"
        >
        </s-button>
        <div v-if="!localAside.collapse" class="aside__note">v1.0.3-beta.0</div>
      </footer>
    </aside>

    <!-- MAIN -->
    <main class="main">
      <slot name="main" />
    </main>
    <slot />
  </div>
</template>

<script>
const header = {
  size: "48px"
};

const aside = {
  collapse: false,
  size: "192px",
  collapsedSize: "48px",
  toggleIcon: "ArrowExpandLeft"
};

export default {
  name: "s-layout",

  props: {
    aside: {
      type: Object,
      default: () => ({})
    },
    header: {
      type: Object,
      default: () => ({})
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      localAside: {
        collapse: false
      }
    };
  },

  computed: {
    headerOptions() {
      return {
        ...header,
        ...this.header
      };
    },
    asideOptions() {
      return {
        ...aside,
        ...this.aside,
        ...this.localAside
      };
    },

    setVariables() {
      let vars = {
        "--aside--size": this.localAside.collapse
          ? this.asideOptions.collapsedSize
          : this.asideOptions.size,
        "--header--size": this.headerOptions.size,
        "--aside--collapse-size": this.asideOptions.collapsedSize
      };
      return vars;
    }
  }
};
</script>

<style lang="scss" scoped>
.layout {
  translate: all 0.3s ease 0s;
  height: 100vh;
  display: grid;
  grid-template-columns: var(--aside--size) auto;
  grid-template-rows: var(--header--size) auto;
  transition: all 0.3s ease 0s;
}

.aside {
  grid-column: 1 / 2;
  grid-row: 1 / 3;
  display: flex;
  flex-direction: column;
}
.header {
  grid-column: 2 / 3;
}
.main {
  grid-column: 2 / 3;
}

.logo {
  height: var(--header--size);
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    height: 25px;
  }
}

.user {
  padding: --space(sm);
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
}

.aside__nav {
  flex: 1 1 auto;
}
.aside__footer {
  background-color: rgba(0, 0, 0, 0.2);
  margin: auto;
  flex: 0 0 var(--aside--collapse-size);
  display: flex;
  width: 100%;
  align-items: center;
}
.aside__note {
  flex: 1 1 auto;
  color: --color(grey);
  text-align: right;
  padding-right: --space(sm);
}

.aside--collapse {
  .user {
    padding: --space(xs);
  }
  .aside__toggle {
    transform: rotate(180deg);
  }
}
</style>

<style lang="scss">
.user {
  .person__name {
    color: --color(grey, light);
    font-weight: --font-weight(bold);
  }
}
.layout {
  .aside {
    .nav {
      margin: 0;
    }
    .button {
      --button--color: #{--color(grey, light)};
      --button--hover-color: #{--color(light)};
      letter-spacing: 1px;
      font-size: --font-size(h5);
      font-weight: --font-weight(regular);
      border-radius: 0;
      &:hover {
        --button--color: #{--color(light)};
      }
    }
    .router-link-active {
      --button--bg: #{--color(grey, darker)};
      --button--hover-bg: #{--color(grey, darker)};
      --button--color: #{--color(light)};
      --button--hover-color: #{--color(light)};
      position: relative;
      &:after {
        @include position(absolute);
        content: "";
        width: 5px;
        background: gradient(primary, 0deg);
      }
    }
  }
}

.aside--collapse {
  .button {
    padding: 0;
    justify-content: center;
    transition: all 0.3s ease 0s;
    .button__icon {
      margin: 0;
      transition: all 0.3s ease 0s;
    }
    .button__label {
      display: none;
    }
  }
}
</style>
