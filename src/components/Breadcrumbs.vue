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
      icon="vmdi-arrow-left-circle-outline"
      shape="square"
      size="lg"
      :to="{ name: backRoute, params: params[backRoute] }"
    ></s-button>
    <!-- HOME BUTTON -->
    <s-button
      v-else-if="icon && breadcrumbs[0].meta.icon"
      class="breadcrumbs__icon"
      :icon="breadcrumbs[0].meta.icon"
      shape="square"
      size="lg"
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
        :to="{ name: route.name, params: params[route.name] }"
        class="breadcrumbs__item"
        :key="`breadcrumbs--${index}`"
        >{{ routeLabel(route) }}</router-link
      >
    </template>
  </div>
</template>
<script>
import { truncate } from "lodash-es";

export default {
  name: "breadcrumbs",
  props: {
    truncate: {
      type: Number,
      default: 15,
    },
    back: {
      type: Boolean,
      default: true,
    },
    icon: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      //If a route name is added to this and has a value,
      // This value will be used instead of provided in router meta
      labels: {},
      params: {},
      routes: null,
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
      },
    },
  },

  created() {
    //Update the label of route
    this.$root.$on("shilp-breadcrumbs-label", (key, value) => {
      this.$set(this.labels, key, value);
    });

    //Update the params of route
    this.$root.$on("shilp-breadcrumbs-params", (key, value) => {
      this.$set(this.params, key, value);
    });

    this.routes = this.findRoutes();
  },

  computed: {
    breadcrumbs() {
      let breadcrumbs = this.$route.meta.breadcrumbs
        .map((item) => {
          //Gets the router object with the name.
          //Using manual list of routes instead of resolve method.
          //Resolve creates an issue when 'redirect' is used.
          //It returs the redirected route hence breaking the chain of breadcrumbs
          // const resolvedRoute = this.$router.resolve({ name: item });
          const resolvedRoute =
            this.routes && this.routes.find((route) => route.name == item);
          if (resolvedRoute) {
            const { name, meta } = resolvedRoute;
            return { name, meta };
          } else {
            return null;
          }
        })
        .filter((item) => item); //Remove non-existing routes
      return breadcrumbs;
    },

    backRoute() {
      const breadcrumbs = this.$route.meta && this.$route.meta.breadcrumbs;
      if (breadcrumbs && breadcrumbs.length > 1) {
        return breadcrumbs[breadcrumbs.length - 2];
      } else {
        return null;
      }
    },
  },

  methods: {
    findRoutes() {
      const breadcrumbsRoutes = [];
      const filterRoutes = (routes) => {
        routes.forEach((route) => {
          if (route.meta && route.meta.breadcrumbs) {
            breadcrumbsRoutes.push(route);
          }
          if (route.children) {
            filterRoutes(route.children);
          }
        });
      };
      filterRoutes(this.$router.options.routes);
      return breadcrumbsRoutes;
    },
    routeLabel(route) {
      return (
        truncate(this.labels[route.name], { length: this.truncate }) ||
        route.meta.label
      );
    },
  },
};
</script>

<style lang="scss">
.breadcrumbs {
  display: flex;
  align-items: center;
  .breadcrumbs__back {
    --button--color: #{--color(grey)};
    --button--hover-color: #{--color(primary)};
  }
  .breadcrumbs__icon {
    --button--color: #{--color(grey)};
    --button--hover-color: #{--color(grey)};
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
