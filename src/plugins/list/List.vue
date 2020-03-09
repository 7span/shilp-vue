<template>
  <div
    class="v-list"
    :class="{ 'v-list--sidebar': sidebarContent }"
    v-shilp-loader.overlay="loader && loading && !initial"
    :loading="loading"
  >
    <!-- HEADER -->
    <header class="v-list__header" v-if="header">
      <h5 class="v-list__title">{{ title }}</h5>
      <!-- <div class="v-list__filters">
        <s-button size="sm" color="secondary" shape="pill" label>Active</s-button>
        <s-button size="sm" color="secondary" shape="pill" label>Pro Users</s-button>
      </div>-->
      <s-button-group
        class="v-list__actions"
        color="grey"
        size="sm"
        theme="trn"
        shape="square"
      >
        <s-button
          v-if="settingsPane"
          icon="Settings"
          @click.native="toggleSidebar('settings')"
        ></s-button>
        <s-button
          v-if="filterPane"
          icon="FilterIcon"
          @click.native="toggleSidebar('filters')"
        ></s-button>
        <s-button
          v-if="!data && allowRefresh"
          icon="Refresh"
          @click.native="refresh()"
        ></s-button>
        <slot name="actions"></slot>
      </s-button-group>
    </header>

    <!-- SETTINGS -->
    <div class="v-list__sidebar">
      <settings
        v-if="sidebarContent == 'settings'"
        @per-page="currentPerPage = $event"
        :perPage="currentPerPage"
        :perPageOptions="perPageOptions"
      ></settings>

      <slot v-if="sidebarContent == 'filters'" name="filters"></slot>
    </div>

    <!-- CONTENT -->
    <section class="v-list__content">
      <!-- LOADER -->
      <ul v-if="loading && initial" class="v-list__loader">
        <li v-for="n in 10" :key="`loader-item--${n}`"></li>
      </ul>

      <!-- ITEMS -->
      <slot
        v-else
        :items="data || items"
        :loading="loading"
        :isEmpty="isEmpty"
      ></slot>

      <!-- EMPTY -->
      <slot name="empty">
        <p v-if="isEmpty" class="v-list__empty">
          No data found for given duration & filters. Try changing
          duration/filters.
        </p>
      </slot>
    </section>

    <!-- FOOTER -->
    <footer v-if="!initial" class="v-list__footer">
      <pagination
        v-if="currentPage > 0"
        :perPage="currentPerPage"
        :page="currentPage"
        :count="count"
        @change="currentPage = $event"
      />
      <meta-data :items="items" :count="count" />
    </footer>
  </div>
</template>

<script>
import { debounce } from "lodash";

export default {
  components: {
    Pagination: require("./Pagination").default,
    MetaData: require("./MetaData").default,
    Settings: require("./Settings").default
  },

  props: {
    header: {
      type: Boolean,
      default: true
    },
    endpoint: String,
    title: {
      default: ""
    },
    page: {
      type: Number,
      default: 1
    },
    pageKey: {
      type: String,
      default: "page"
    },
    perPage: {
      type: Number,
      default: 25
    },
    perPageKey: {
      type: String,
      default: "per_page"
    },
    perPageOptions: {
      type: Array,
      default: () => [10, 25, 50, 100]
    },
    maxPagingLinks: {
      type: Number,
      default: 5
    },
    paginationMode: {
      type: String,
      default: "querystring",
      validator(value) {
        return ["querystring", "internal", "infinite"].includes(value);
      }
    },
    params: Object,
    data: Array,
    pagination: {
      type: Boolean,
      default: true
    },
    filters: Object,
    debounce: {
      type: Number,
      default: 1000
    },
    sortBy: String,
    sortOrder: String,
    loader: {
      type: Boolean,
      default: true
    },
    settingsPane: {
      type: Boolean,
      default: true
    },
    filterPane: {
      type: Boolean,
      default: false
    },
    allowRefresh: {
      type: Boolean,
      default: true
    }
  },

  data() {
    const self = this;

    return {
      sidebarContent: false,
      isFilters: false,
      items: self.data || [],
      count: 0,
      loading: false,
      initial: true,
      localPage: null,
      localPerPage: null,
      localSortBy: self.sortBy,
      localSortOrder: self.sortOrder
    };
  },

  watch: {
    data(newValue) {
      this.items = newValue;
    },
    filters: {
      deep: true,
      handler() {
        this.getData();
      }
    },
    page(nv) {
      this.currentPage = nv;
    },
    perPage(nv) {
      this.currentPerPage = nv;
    },

    params: {
      handler() {
        //Changing page to 1 will automatically call getData with latest params due to watcher
        this.currentPage = 1;
      },
      deep: true
    }
  },

  created() {
    this.initial = true;
    //Create a clone of config to make overridable configs
    //This helps to use v-model as config
    this.setPaginationConfig();

    //If data is provided explicitly, prevent the request
    if (!this.data) {
      this.refresh();
    }
  },

  computed: {
    isEmpty() {
      if (this.data && this.data.length != 0) return false;
      if (this.items && this.items.length != 0) return false;
      return true;
    },
    currentPage: {
      get() {
        return parseInt(this.localPage || this.page);
      },
      set(value) {
        this.localPage = value;
        this.$emit("update:page", value);
        this.refresh();
      }
    },
    currentPerPage: {
      get() {
        return parseInt(
          this.localPerPage || this.perPage || this.perPageOptions[0]
        );
      },
      set(value) {
        this.localPerPage = value;
        this.$emit("update:perPage", value);
        this.currentPage = 1;
      }
    }
  },

  methods: {
    set(key, value) {
      this[key] = value;
    },

    toggleSidebar(content) {
      if (this.sidebarContent == content) {
        this.sidebarContent = false;
      } else {
        this.sidebarContent = content;
      }
    },

    setPaginationConfig() {
      if (!this.pagination) return;

      //Set the default page to render if page provided in URL
      if (this.$route && this.$route.query.page) {
        this.currentPage = this.$route.query.page;
      }
    },

    refresh() {
      this.getData(0);
    },

    getData(debounceValue = this.debounce) {
      debounce(
        function() {
          this.loading = true;
          const params = {
            ...(this.params || {}),
            [this.pageKey]: this.localPage || undefined,
            [this.perPageKey]: this.currentPerPage || undefined,
            sort_by: this.localSortBy,
            sort_order: this.localSortOrder
          };

          const request = this.options.requestHandler({
            method: "get",
            endpoint: this.endpoint,
            params,
            filters: this.filters
          });

          request
            .then(res => {
              this.items = res.items;
              this.count = res.count;

              //Set Page URL
              if (
                this.$router &&
                this.paginationMode == "querystring" &&
                this.$route.query.page != this.currentPage
              ) {
                this.$router.push({
                  query: {
                    page: this.currentPage
                  }
                });
              }
              this.loading = this.initial = false;
            })
            .catch(() => {
              this.loading = this.initial = false;
            });
        },
        this.initial ? 0 : debounceValue
      ).call(this);
    },

    sort(e) {
      const context = {
        items: e,
        endpoint: this.endpoint,
        params: this.params,
        data: this.data
      };
      //If sort listner is provided, use it
      //Else execute the global callback
      if (this.$listeners.sort) {
        this.$emit("sort", context);
      } else if (this.options.sort) {
        this.options.sort(context);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.v-list {
  display: grid;
  grid-template-rows: min-content auto min-content;
  grid-template-columns: auto 240px;
}

.v-list--sidebar {
  .v-list__content {
    grid-column-start: 2;
  }
  .v-list__sidebar {
    display: block;
  }
}

.v-list__header {
  display: flex;
  justify-content: space-between;
  grid-area: 1 / 3 / 2 / 1;
  //border-bottom: 1px solid --color(grey, lightest);
  align-items: center;
  background-color: --color(grey, lightest);
  padding: var(--space--1) var(--space--3);
}
.v-list__sidebar {
  display: none;
  grid-area: 2 / 3 / 3 / 2;
  border-left: 1px solid --color(grey, lightest);
  padding: --space(3);
}
.v-list__content {
  grid-area: 2 / 3 / 3 / 1;
  overflow: auto;
}
.v-list__footer {
  grid-area: 3 / 3 / 4 / 1;
  padding: --space(3);
}

.v-list__title {
  margin: 0;
  flex: 0 0 auto;
  color: --color(grey, dark);
}

.v-list__filters {
  margin-left: 8px;
  .button {
    margin-right: 8px;
    --button--padding: 16px;
    &:hover {
      text-decoration: line-through;
    }
  }
}

.v-list__actions {
  margin: 0;
  margin-left: auto;
}

@keyframes shine {
  to {
    background-position: -200% 0;
  }
}
.v-list__loader {
  list-style: none;
  margin: 0;
  padding: --space(3);
  li {
    height: 40px;
    opacity: 0.5;
    background: linear-gradient(
      90deg,
      --color(grey, lightest),
      --color(grey, lighter),
      --color(grey, lightest)
    );
    margin-top: 10px;
    position: relative;
    border-radius: --radius(3);
    animation: shine 1.5s infinite;
    background-size: 200%;
  }
}
.v-list__empty {
  padding: 50px;
  text-align: center;
  color: --color(grey);
}
</style>