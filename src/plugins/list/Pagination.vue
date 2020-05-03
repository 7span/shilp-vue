<template>
  <div class="v-list__pagination" v-if="count > perPage">
    <!-- INFINITE MODE -->
    <template v-if="mode == 'infinite'">
      <slot
        v-if="count > loaded"
        name="load-more-button"
        :loading="loadingMore"
        :loadMore="loadMore"
      >
        <s-button
          color="primary"
          @click.native="loadMore"
          :loader="loadingMore"
          label="Load More"
        />
      </slot>

      <p v-else class="text-grey-light">— That's all —</p>
    </template>

    <!-- PAGING -->
    <template v-else>
      <s-button-group size="sm" color="primary" shape="square">
        <!-- PREV -->
        <s-button
          v-if="isPrev"
          icon="chevron-left"
          @click.native="changePage(page - 1)"
        />

        <!-- PAGES -->
        <template v-for="n in paginationButtonCount">
          <s-button
            v-if="n == page"
            class="button--active"
            :key="`page--${n}`"
            :label="n"
          />
          <s-button
            v-else
            :key="`page--${n}`"
            @click.native="changePage(n)"
            :label="n"
          />
        </template>

        <!-- NEXT -->
        <s-button
          v-if="isNext"
          icon="chevron-right"
          @click.native="changePage(page + 1)"
        />
      </s-button-group>

      <template v-if="totalPages > this.maxPagingLinks">
        <s-field class="v-list__pages" size="sm">
          <s-select
            @input="changePage($event)"
            :value="page"
            :options="paginationLinks"
          />
        </s-field>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    page: Number,
    perPage: Number,
    count: {
      type: Number,
      default: 0
    },
    mode: String,
    maxPagingLinks: Number,
    loadingMore: Boolean,
    loaded: Number
  },
  computed: {
    paginationLinks() {
      const links = [];
      for (var i = 1; i <= this.totalPages; i++) {
        links.push(i);
      }
      return links;
    },

    paginationButtonCount() {
      return this.totalPages >= this.maxPagingLinks
        ? this.maxPagingLinks
        : this.totalPages;
    },
    isNext() {
      return this.page * this.perPage < this.count;
    },
    isPrev() {
      return this.page != 1;
    },
    totalPages() {
      return Math.ceil(this.count / this.perPage);
    }
  },
  methods: {
    changePage(number) {
      this.$emit("change", number);
    },
    loadMore() {
      this.$emit("loadMore", this.page + 1);
    }
  }
};
</script>

<style lang="scss">
.v-list__pagination {
  text-align: center;
  margin-bottom: --space(2);
  display: flex;
  align-items: center;
  justify-content: center;
  .button--active {
    background-color: --color("primary", dark);
    cursor: default;
  }
}
.v-list__pages {
  margin-left: --space(2);
}
</style>
