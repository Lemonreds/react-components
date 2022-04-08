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
