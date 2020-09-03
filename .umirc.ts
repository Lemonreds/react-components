const path = require('path');

import { defineConfig } from 'umi';

const resolve = function(dir: string) {
  return path.resolve(__dirname, dir);
};

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // UMI BUG
  // 使用base后，umi的热更新会无效

  // publicPath: '/react-components/',
  // base:'/react-components/',
  // outputPath: '/react-components/',
  alias: {
    pages: resolve('src/pages'),
    components: resolve('src/components'),
    assets: resolve('src/assets'),
    examples: resolve('src/examples'),
    utils: resolve('src/utils'),
    hooks: resolve('src/hooks'),
    tools: resolve('src/tools'),
  },
  // dynamicImport:{},
  // chainWebpack: function(config, { webpack }) {
  //   config.merge({
  //     optimization: {
  //       minimize: true,
  //       splitChunks: {
  //         chunks: 'all',
  //         minSize: 30000,
  //         minChunks: 3,
  //         automaticNameDelimiter: '.',
  //         cacheGroups: {
  //           vendor: {
  //             name: 'vendor',
  //             test({ resource }) {
  //               return /[\\/]node_modules[\\/]/.test(resource);
  //             },
  //             priority: 20,
  //           },
  //         },
  //       },
  //     },
  //   });
  // },
});
