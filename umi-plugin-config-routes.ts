import { IApi, IRoute } from 'umi';

// @ref: https://v2.umijs.org/zh/plugin/develop.html#%E5%88%9D%E5%A7%8B%E5%8C%96%E6%8F%92%E4%BB%B6
// @ref: https://umijs.org/zh-CN/plugins/api

const defaultOptions = { strict: true, exclude: null };
const strictRegex = /(layout|index)(.js|.jsx|.ts|.tsx)$/;

/**
 * @plugin umi-plugin-config-routes
 * @des umi3约定式路由的再过滤，过滤一些不需要的路由规则，可以删减一些被错误当作路由引入的组件。
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

        if (strict && !strictRegex.test(component)) {
          return false;
        }
        if (exclude && exclude.test(path)) {
          return false;
        }
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
