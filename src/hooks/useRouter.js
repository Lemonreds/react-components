import { useMemo } from 'react';
import {
  useParams,
  useLocation,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';
import { parse } from 'query-string';

/**
 *
 * @hook useRouter
 * @desc react-router-dom 路由相关的 hook 整合
 *
 * */
function useRouter() {
  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  const match = useRouteMatch();

  const { pathname } = location;
  const { push, replace, goBack, go, search } = history;

  // example:: /:topic?sort=popular -> { topic: "react", sort: "popular" }
  const query = { ...parse(search), ...params };

  return useMemo(
    () => ({
      // alias here
      push,
      replace,
      goBack,
      go,
      pathname,
      query,
      match,
      location,
      history,
    }),
    [params, match, location, history],
  );
}

export default useRouter;
