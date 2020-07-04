const path = require('path');

import { defineConfig } from 'umi';

const resolve = function(dir: string) {
  return path.resolve(__dirname, dir);
};

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  publicPath: '/react-components/',
  base:'/react-components/',
  outputPath: '/react-components/',
  alias: {
    pages: resolve('src/pages'),
    components: resolve('src/components'),
    assets: resolve('src/assets'),
    examples: resolve('src/examples'),
    utils: resolve('src/utils'),
  },
});
