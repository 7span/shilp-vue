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
        :perPage="localPerPage"
        :perPageOptions="perPageOptions"
        :allAttrs="allAttrs"
        @per-page="changePerPage($event)"
        @updateAttr="updateAttr($event)"
      >
        <slot name="settings" />
      </settings>

      <slot v-if="sidebarContent == 'filters'" name="filters" />
    </div>

    <!-- CONTENT -->
    <section class="v-list__content">
      <!-- HEADER -->
      <header v-if="$scopedSlots.header" class="v-list__custom-header">
        <slot name="header" :refresh="refresh"> </slot>
      </header>

      <header v-else-if="header" class="v-list__header">
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
        <li class="shimmer" v-for="n in 10" :key="`loader-item--${n}`"></li>
      </ul>

      <!-- CONTENT -->
      <template v-else>
        <slot v-if="error" name="error">
          <p class="v-list__notice">
            There was an error whilte processing yout request. Please refresh &
            try again.
          </p>
        </slot>

        <!-- EMPTY -->
        <slot v-else-if="isEmpty" name="empty">
          <p class="v-list__notice">
            No data found for given duration & filters. Try changing
            duration/filters.
          </p>
        </slot>

        <!-- ITEMS -->
        <slot
          v-else
          :items="data || items"
          :loading="loading"
          :isEmpty="isEmpty"
          :refresh="refresh"
        />
      </template>

      <!-- FOOTER -->
      <footer v-if="!initial && footer" class="v-list__footer">
        <pagination
          v-if="localPage > 0"
          :perPage="localPerPage"
          :page="localPage"
          :count="count"
          :mode="paginationMode"
          :loading-more="loadingMore"
          :loaded="items.length"
          :maxPagingLinks="maxPagingLinks"
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
import { debounce, startCase } from "lodash-es";
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
      items: this.data || [],
      count: 0,
      loading: false,
      initial: true,
      localPage: this.page,
      localPerPage: this.perPage,
      localSortBy: this.sortBy,
      localSortOrder: this.sortOrder,
      localAttrs: null,
      search: null,
      loadingMore: false,
      error: false
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
    },
    attrsToUse(newValue) {
      this.serializeAttrs(newValue);
    }
  },

  created() {
    this.initial = true;
    //Create a clone of config to make overridable configs
    //This helps to use v-model as config
    this.setPaginationConfig();
    this.serializeAttrs(this.attrsToUse);
    //If data is provided explicitly, prevent the request
    if (!this.data) {
      this.refresh();
    }
  },

  computed: {
    attrsToUse() {
      return this.attrs || Object.keys(this.items[0] || []);
    },
    allAttrs() {
      return this.localAttrs;
    },

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
    serializeAttrs(attrs) {
      this.localAttrs = attrs.map(item => {
        if (typeof item == "string") {
          return {
            label: startCase(item),
            name: item,
            visible: true
          };
        } else {
          return Object.assign(
            {},
            {
              visible: true,
              label: startCase(item.name)
            },
            item
          );
        }
      });
    },

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
      this.error = false;
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
          this.error = true;
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
    },

    updateAttr(data) {
      const { index, key, value } = data;
      this.$set(this.localAttrs[index], key, value);
    }
  }
};
</script>

<style lang="scss">
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
  display: flex;
  align-items: center;
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

.v-list__loader {
  list-style: none;
  margin: 0;
  padding: --space(3);
  li {
    height: 40px;
    margin-top: 10px;
    position: relative;
    border-radius: --radius(3);
  }
}
.v-list__notice {
  padding: 50px;
  text-align: center;
  color: --color(grey);
}
</style>
