import { IApi, IRoute } from 'umi';

// umi2和umi3有不同....
// @ref: https://v2.umijs.org/zh/plugin/develop.html#%E5%88%9D%E5%A7%8B%E5%8C%96%E6%8F%92%E4%BB%B6
// @ref: https://umijs.org/zh-CN/plugins/api

const defaultOptions = { strict: true, exclude: null };
const strictRegex = /(layout|index)(.js|.jsx|.ts|.tsx)$/;

/**
 * @plugin umi-plugin-config-routes
 * @des umi3约定式路由的再过滤，过滤一些不需要的路由规则，可以删减一些被错误当作路由引入的组件。
 
 `umi的约定式路由下：
  pages/home/index.js
  pages/home/mapProps.js
  pages/home/utils.js

  会生成路由
  path `pages/home`                     1
  path `pages/home/mapProps`   2 
  path `pages/home/utils.js`          3
 
  其中2和3是误添加的，并非真正的路由。

  解决方式：
  1. 通过手工在umirc.js下配置config(规则和 react-router/config一致)，来配自己需要的路由。
  @ref https://reactrouter.com/web/example/route-config
  2. 通过umi的自定义插件中的 modifyRoutes API，来过滤掉不需要的路由，参考如下: 
 
 * @by lmh
 * @at 2020/09/15
 *
 */
const configRoutesPlugin = (api: IApi) => {
  api.describe({
    key: 'configRoutes',
    config: {
      schema(joi) {
        return joi.object();
      },
    },
  });

  api.modifyRoutes((routes: IRoute) => {
    const { configRoutes } = api.config;
    const { strict, exclude } = Object.assign({}, defaultOptions, configRoutes);

    const filterWalk = routes =>
      routes.filter(i => {
        const { path, component, routes } = i;

        // 严格检查下，只允许  /(layout|index)(.js|.jsx|.ts|.tsx)$/ 结尾的文件
        // 可以过滤掉大部分的无用路由
        if (strict && !strictRegex.test(component)) {
          return false;
        }
        // 还可以通过 exclude ，来强匹配掉不需要的路由
        if (exclude && exclude.test(path)) {
          return false;
        }
        // 遍历children
        if (routes) {
          i.routes = filterWalk(routes);
          i.exact = false;
        }
        return true;
      });

    return filterWalk(routes);
  });
};

export default configRoutesPlugin;
