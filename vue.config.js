module.exports = {
  css: {
    extract: true,
    loaderOptions: {
      sass: {
        data: '@import "@7span/shilp/scss/_globals.scss";'
      }
    }
  },
  configureWebpack: {
    devtool: "source-map",
    resolve: {
      symlinks: false,
      alias: {
        "@icon": "vue-material-design-icons"
      }
    }
  }
};
