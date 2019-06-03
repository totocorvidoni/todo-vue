module.exports = {
  transpileDependencies: [/\bvue-awesome\b/],
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/scss/_variables.scss";'
      }
    }
  }
};
