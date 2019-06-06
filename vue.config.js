module.exports = {
  publicPath: "<todo-vue>",
  transpileDependencies: [/\bvue-awesome\b/],
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/scss/_variables.scss";'
      }
    }
  }
};
