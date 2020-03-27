<template>
  <div class="v-list__pagination" v-if="count > perPage">
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
      <select @change="changePage($event.target.value)" :value="page">
        <option v-for="n in totalPages" :value="n" :key="`paging-link--${n}`">{{
          n
        }}</option>
      </select>
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
    maxPagingLinks: Number
  },
  computed: {
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
    }
  }
};
</script>

<style lang="scss" scoped>
.v-list__pagination {
  text-align: center;
  margin-bottom: --space(2);
  .button--active {
    background-color: --color("primary", dark);
    cursor: default;
  }
}
</style>
