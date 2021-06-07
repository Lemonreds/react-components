const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

import { defineConfig } from 'umi';
// (critical.js) useless in SPA
// import htmlCriticalWebpackPlugin from 'html-critical-webpack-plugin';

const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/react-components/' : '/';
const outputPath = isProd ? '/react-components/' : '/dist';

const resolve = function(dir: string) {
  return path.resolve(__dirname, dir);
};

export default defineConfig({
  nodeModulesTransform: { type: 'none' },
  plugins: [
    './umi-plugin-config-routes',
    './umi-plugin-404',
    './umi-plugin-intl',
  ],
  // umi-plugin-config-routes的自定义配置
  configRoutes: {
    strict: true, // 强匹配，路由只匹配文件名有 index|layout|404 的文件
    exclude: /examples|tests/, // 再进一步过滤掉匹配到的路由
  },
  // umi-plugin-404的自定义配置
  notFound: {
    component: '@/pages/exception/404',
  },

  // UMI BUG
  // base不是'/'的情况下，umi的热更新会无效
  publicPath: basePath,
  base: basePath,
  outputPath,

  dynamicImport: {
    loading: '@/Loading',
  },
  chainWebpack: function(config, { webpack }) {
    // config.output.chunkFilename('[name].bundle.js');
    // if (process.env.NODE_ENV === 'production') {
    // config.output.set('chunkFilename', '[id].[hash:8].async.js');
    // config.output.set('filename', '[id].[hash:8].js');

    // // mini-css-extract-plugin
    // config.plugin('css').use(MiniCssExtractPlugin, [
    //   {
    //     filename: '[id].[hash:8].css',
    //     chunkFilename: '[id].[hash:8].css',
    //   },
    // ]);
    // config.plugin('less').use(MiniCssExtractPlugin, [
    //   {
    //     filename: '[id].[hash:8].css',
    //     chunkFilename: '[id].[hash:8].css',
    //   },
    // ]);
    // config.module
    //   .rule('css')
    //   .rule('less')
    //   .test(/\.css|\.less$/)
    //   .use('mini-css')
    //   .loader(MiniCssExtractPlugin.loader)
    //   .options({
    //     publicPath: '../',
    //     filename: '[id].[hash:8].css',
    //     chunkFilename: '[id].[hash:8].css',
    //   })
    //   .end()
    //   .use('css-loader')
    //   .loader('css-loader');

    // production 模式下
    // 分片打包，提取公用的vendor
    // https://cloud.tencent.com/developer/article/1547517
    // https://www.webpackjs.com/plugins/split-chunks-plugin/
    // config.merge({
    //   optimization: {
    //     minimize: true, // 压缩JS代码
    //     splitChunks: {
    //       // 根据策略分割打包后的产物
    //       maxAsyncRequests: 100,
    //       maxInitialRequests: 100,
    //       chunks: 'all', // 'async' 分割异步打包后的产物， 'initial' 分割异步+同步的代码，但是异步内部引入的不考虑 ， 'all'  分割异步+同步的代码
    //       minSize: 30000, // 抽取出来的文件在压缩前的最小大小
    //       minChunks: 3, // 表示最少被引用次数
    //       automaticNameDelimiter: '.', // 抽取出来的文件的自动生成名字的分割符，默认为 ~
    //       cacheGroups: {
    //         //缓存组
    //         vendor: {
    //           name: 'vendor', // 分包后的命名
    //           test({ resource }) {
    //             // 表示要过滤 modules，默认为所有的 modules，
    //             // 可匹配模块路径或 chunk 名字，当匹配的是 chunk 名字的时候，其里面的所有 modules 都会选中
    //             return /[\\/]node_modules[\\/]/.test(resource);
    //           },
    //           priority: 20, //  表示抽取权重，数字越大表示优先级越高。因为一个 module 可能会满足多个 cacheGroups 的条件，那么抽取到哪个就由权重最高的说了算
    //         },
    //       },
    //     },
    //   },
    // });
    // }
  },
  // 配置别名
  alias: {
    src: resolve('src'),
    pages: resolve('src/pages'),
    models: resolve('src/models'),
    components: resolve('src/components'),
    assets: resolve('src/assets'),
    examples: resolve('src/examples'),
    utils: resolve('src/utils'),
    hooks: resolve('src/hooks'),
    tools: resolve('src/tools'),
  },
});
