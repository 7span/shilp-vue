module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: '@import "shilp/scss/_globals.scss";'
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
