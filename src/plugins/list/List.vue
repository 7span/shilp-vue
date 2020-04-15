<template>
  <div v-if="slim" class="v-list">
    <slot :items="data || items" :loading="loading" :isEmpty="isEmpty" />
  </div>

  <div
    v-else
    class="v-list"
    :class="classList"
    v-shilp-loader.overlay="loader && loading && !initial"
    :loading="loading"
  >
    <!-- SETTINGS -->
    <div class="v-list__sidebar">
      <settings
        v-if="sidebarContent == 'settings'"
        @per-page="changePerPage($event)"
        :perPage="localPerPage"
        :perPageOptions="perPageOptions"
      >
        <slot name="settings" />
      </settings>

      <slot v-if="sidebarContent == 'filters'" name="filters" />
    </div>

    <!-- CONTENT -->
    <section class="v-list__content">
      <!-- HEADER -->
      <header class="v-list__header" v-if="header">
        <h5 class="v-list__title">
          {{ title }}
        </h5>

        <s-field
          v-if="actions.includes('search')"
          size="sm"
          class="v-list__search"
        >
          <s-textbox v-model="search" placeholder="Search" />
        </s-field>

        <s-button-group
          class="v-list__actions"
          color="grey"
          theme="trn"
          shape="square"
        >
          <s-button
            v-if="actions.includes('settings')"
            icon="Cog"
            @click.native="toggleSidebar('settings')"
          />
          <s-button
            v-if="actions.includes('filters')"
            icon="FilterIcon"
            @click.native="toggleSidebar('filters')"
          />
          <s-button
            v-if="!data && actions.includes('refresh')"
            icon="Refresh"
            @click.native="refresh()"
          />
          <slot name="actions" />
        </s-button-group>
      </header>

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
      />

      <!-- EMPTY -->
      <slot v-if="!loading && isEmpty" name="empty">
        <p class="v-list__empty">
          No data found for given duration & filters. Try changing
          duration/filters.
        </p>
      </slot>

      <!-- FOOTER -->
      <footer v-if="!initial && footer && !isEmpty" class="v-list__footer">
        <pagination
          v-if="localPage > 0"
          :perPage="localPerPage"
          :page="localPage"
          :count="count"
          :mode="paginationMode"
          :loading-more="loadingMore"
          :loaded="items.length"
          @change="changePage($event)"
          @loadMore="loadMore($event)"
        >
          <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
            <slot :name="slot" v-bind="scope" />
          </template>
        </pagination>
        <meta-data :items="items" :count="count" />
      </footer>
    </section>
  </div>
</template>

<script>
import { debounce } from "lodash";
import props from "./props";

export default {
  components: {
    Pagination: require("./Pagination").default,
    MetaData: require("./MetaData").default,
    Settings: require("./Settings").default
  },

  props: props,

  data() {
    return {
      sidebarContent: false,
      isFilters: false,
      items: this.data || [],
      count: 0,
      loading: false,
      initial: true,
      localPage: this.page,
      localPerPage: this.perPage,
      localSortBy: this.sortBy,
      localSortOrder: this.sortOrder,
      search: null,
      loadingMore: false
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
      this.changePage(nv);
    },
    perPage(nv) {
      this.changePerPage(nv);
    },
    search() {
      this.debounceGetData();
    },
    params: {
      handler() {
        //Changing page to 1 will automatically call getData with latest params due to watcher
        this.changePage(1);
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
    debounceGetData() {
      return debounce(this.getData, this.debounce);
    },
    classList() {
      return { "v-list--sidebar": this.sidebarContent };
    },
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
        this.changePage(1);
      }
    },
    localParams() {
      return Object.assign({}, this.params, {
        page: this.localPage,
        per_page: this.localPerPage,
        sort_by: this.localSortBy,
        sort_order: this.localSortOrder
      });
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
        const page = parseInt(this.$route.query.page);
        if (page != this.localPage) {
          this.changePage(page);
        }
      }
    },

    refresh() {
      this.getData();
    },

    changePage(value) {
      this.localPage = value;
      this.$emit("update:page", value);
      this.getData(false);
    },

    changePerPage(value) {
      this.localPerPage = value;
      this.$emit("update:perPage", value);
      this.changePage(1);
    },

    loadMore(value) {
      this.localPage = value;
      this.$emit("update:page", value);
      this.getData(true);
    },

    setData(res, appendData) {
      if (appendData) {
        this.items = this.items.concat(res.items);
      } else {
        this.items = res.items;
      }
      this.count = res.count;

      //Set Page URL
      if (
        this.$router &&
        this.paginationMode == "querystring" &&
        this.$route.query.page != this.localPage
      ) {
        this.$router.push({
          query: {
            page: this.localPage
          }
        });
      }
    },

    getData(appendData = false) {
      if (appendData) {
        this.loadingMore = true;
      } else {
        this.loading = true;
      }
      this.options
        .requestHandler({
          method: "get",
          endpoint: this.endpoint,
          params: this.localParams,
          filters: this.filters,
          search: this.search
        })
        .then(res => {
          this.setData(res, appendData);
          this.loading = this.loadingMore = this.initial = false;
        })
        .catch(() => {
          this.loading = this.loadingMore = this.initial = false;
        });
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
  grid-template-rows: min-content 1fr min-content;
  grid-template-columns: 1fr;
}

.v-list--sidebar {
  grid-template-columns: 1fr 240px;
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
  align-items: center;
  padding: --space(1) --space(3);
}
.v-list__title {
  margin-right: auto;
  flex: 0 0 auto;
  color: --color(grey, dark);
}
.v-list__search {
  flex: 0 0 auto;
  margin-left: --space(2);
}
.v-list__actions {
  margin-left: --space(2);
  flex: 0 0 auto;
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
