import { useMemo } from 'react';

// the export as `react-router-dom` > v5
import { useParams, useLocation, useHistory, useRouteMatch } from 'umi';
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
  const params = useParams(); //   /:topic  { topic: "react" }
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
