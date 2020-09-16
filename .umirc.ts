const path = require('path');

import { defineConfig } from 'umi';
// useless in SPA
// import htmlCriticalWebpackPlugin from 'html-critical-webpack-plugin';

const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/react-components/' : '/';
const outputPath = isProd ? '/react-components/' : '/dist';

const resolve = function(dir: string) {
  return path.resolve(__dirname, dir);
};

export default defineConfig({
  nodeModulesTransform: { type: 'none' },
  plugins: ['./umi-plugin-config-routes', './umi-plugin-404'],
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
    if (isProd) {
      config.merge({
        optimization: {
          minimize: true,
          splitChunks: {
            chunks: 'all',
            minSize: 30000,
            minChunks: 3,
            automaticNameDelimiter: '.',
            cacheGroups: {
              vendor: {
                name: 'vendor',
                test({ resource }) {
                  return /[\\/]node_modules[\\/]/.test(resource);
                },
                priority: 20,
              },
            },
          },
        },
      });
    }
    // config.plugin('critical').use(htmlCriticalWebpackPlugin, [
    //   {
    //     base: path.join(path.resolve(__dirname), 'dist/'),
    //     src: 'index.html',
    //     dest: 'index.html',
    //     inline: true,
    //     minify: true,
    //     extract: true,
    //     // iphone6
    //     width: 375,
    //     height: 565,
    //     penthouse: {
    //       blockJSRequests: false,
    //     },
    //   },
    // ]);
  },
  alias: {
    pages: resolve('src/pages'),
    components: resolve('src/components'),
    assets: resolve('src/assets'),
    examples: resolve('src/examples'),
    utils: resolve('src/utils'),
    hooks: resolve('src/hooks'),
    tools: resolve('src/tools'),
  },
});
