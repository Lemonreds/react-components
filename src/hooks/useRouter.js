import { useMemo } from 'react';
import { useParams, useLocation, useHistory, useRouteMatch } from 'react-router-dom';
import { parse } from 'query-string';

/**
 *
 * @hook useRouter
 * @desc react-router-dom 路由相关的 hook，类似 umi2/router 的封装。
 *
 * */
function useRouter() {
  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  const match = useRouteMatch();

  const { pathname } = location;
  const { push, replace, goBack, search } = history;

  // example:: /:topic?sort=popular -> { topic: "react", sort: "popular" }
  const query = { ...parse(search), ...params };

  return useMemo(
    () => ({
      // alias here
      push,
      replace,
      goBack,
      pathname,
      query,
      match,
      location,
      history,
    }),
    [params, match, location, history]
  );
}

export default useRouter;
