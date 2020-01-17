<template>
  <!-- BREADCRUMBS -->
  <!-- TODO: Add tooltips for custom labels -->
  <div
    class="breadcrumbs"
    :class="{ 'breadcrumbs--back': back && backRoute }"
    v-if="$route.meta.breadcrumbs"
  >
    <!-- BACK BUTTON -->
    <s-button
      v-if="back && backRoute"
      class="breadcrumbs__back"
      icon="ArrowLeftCircleOutline"
      shape="square"
      size="lg"
      :to="{ name: backRoute }"
    ></s-button>

    <!-- ROUTES -->
    <template v-for="(route, index) in breadcrumbs">
      <span
        v-if="index == breadcrumbs.length - 1"
        class="breadcrumbs__item breadcrumbs__item--active"
        :key="`breadcrumbs--${index}`"
        >{{ routeLabel(route) }}</span
      >
      <router-link
        v-else
        :to="{ name: route.name }"
        class="breadcrumbs__item"
        :key="`breadcrumbs--${index}`"
        >{{ routeLabel(route) }}</router-link
      >
    </template>
  </div>
</template>
<script>
import { truncate } from "lodash";

export default {
  name: "breadcrumbs",
  props: {
    truncate: {
      type: Number,
      default: 15
    },
    back: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      //If a route name is added to this and has a value,
      // This value will be used instead of provided in router meta
      labels: {}
    };
  },

  watch: {
    //When the route changes, if the new route's breadcrumbs does not contain the
    // the keys defined in labels, remove it.
    $route: {
      deep: true,
      handler(newValue) {
        for (var key in this.labels) {
          if (!newValue.meta.breadcrumbs.includes(key)) {
            delete this.labels[key];
          }
        }
      }
    }
  },

  created() {
    //Update the label of route
    this.$root.$on("shilp-breadcrumbs-label", (key, value) => {
      this.$set(this.labels, key, value);
    });
  },

  computed: {
    breadcrumbs() {
      let breadcrumbs = this.$route.meta.breadcrumbs
        .map(item => {
          //Gets the router object with the name.
          const resolvedRoute = this.$router.resolve({ name: item });
          if (resolvedRoute) {
            const { name, meta } = resolvedRoute.route;
            return { name, meta };
          } else {
            return null;
          }
        })
        .filter(item => item); //Remove non-existing routes

      return breadcrumbs;
    },

    backRoute() {
      const breadcrumbs = this.$route.meta && this.$route.meta.breadcrumbs;
      if (breadcrumbs && breadcrumbs.length > 1) {
        return breadcrumbs[breadcrumbs.length - 2];
      } else {
        return null;
      }
    }
  },

  methods: {
    routeLabel(route) {
      return (
        truncate(this.labels[route.name], { length: this.truncate }) ||
        route.meta.label
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.breadcrumbs {
  display: flex;
  align-items: center;
}
.breadcrumbs__back {
  color: --color(grey);
  &:hover {
    color: --color(primary);
  }
}
.breadcrumbs__item {
  font-size: --text(sm);
  text-decoration: none !important;
  color: --color(grey);
  font-weight: --text(bold);
  + .breadcrumbs__item {
    margin-left: --space(2);
    &:before {
      padding-right: --space(2);
      content: "/";
      color: --color(grey);
    }
  }
}
a.breadcrumbs__item {
  &:hover {
    color: --color(primary);
  }
}

.breadcrumbs__item--active {
  color: --color(dark);
}
</style>
