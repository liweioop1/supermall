
const resolve = dir => require('path').join(__dirname, dir);

module.exports = {
  resolve: {
    alias: {
      '@': resolve('src'),
      'assets':resolve('src/assets'),
      'common':resolve('src/common'),
      'components':resolve('src/components'),
      'network':resolve('src/network'),
      'views':resolve('src/views'),
    }
  }
}
