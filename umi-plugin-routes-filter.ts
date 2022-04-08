import { IApi, IRoute } from 'umi';

const defaultOptions = { strict: true, exclude: null };
const strictRegex = /(layout|index|404)(.js|.jsx|.ts|.tsx)$/;

/**
 * umi3约定式路由的再过滤，过滤一些不需要的路由规则，可以删减一些被错误当作路由引入的组件。
 `umi的约定式路由下：

  pages/home/index.js
  pages/home/mapProps.js
  pages/home/utils.js

  会生成路由:
  1. path `pages/home`                
  2. path `pages/home/mapProps`   
  3. path `pages/home/utils.js`         
 
  其中2和3是误添加的，并非真正的路由。
**/
const routeFilterPlugin = (api: IApi) => {
  // 定义 .umirc.ts 中可以配置 filterRoutes 属性，作为该插件的 option
  api.describe({
    key: 'filterRoutes',
    config: {
      schema(joi) {
        return joi.object();
      },
    },
  });

  api.modifyRoutes((routes: IRoute) => {
    const { filterRoutes } = api.config;
    // 获取 .umirc.ts 配置的参数
    const { strict, exclude } = Object.assign({}, defaultOptions, filterRoutes);

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
          i.routes = routes ? filterWalk(routes) : [];
          i.exact = false;
        }
        return true;
      });

    return filterWalk(routes);
  });
};

export default routeFilterPlugin;
