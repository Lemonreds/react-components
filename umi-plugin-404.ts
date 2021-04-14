import { IApi, IRoute } from 'umi';

const append404Route = (routes, notFoundComponent) => {
  for (const r of routes) {
    if (r.routes) {
      append404Route(r.routes, notFoundComponent);
    }
  }
  routes.push({ component: notFoundComponent, exact: false });
};

const defaultOptions = { component: '@/pages/404' };

/**
 * @plugin umi-plugin-404
 * @des  
 umi3.2.5在官方文档中宣称的 404.js 约定式路由但是实际不生效，
 看了下issue，官方会在后续补上， 这里做了一个简单的plugn，
 通过遍历嵌套的路由，每个增加上没有path的一条route，来实现404；
 * @by lmh
 * @at 2020/09/16
 *
 */
const plugin404 = (api: IApi) => {
  api.describe({
    key: 'notFound',
    config: {
      schema(joi) {
        return joi.object();
      },
    },
  });

  api.modifyRoutes(routes => {
    const { notFound: { component } = defaultOptions } = api.config;

    append404Route(routes, component);
    return routes;
  });
};

export default plugin404;
