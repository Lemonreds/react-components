import {
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
  useCallback,
} from 'react';
import { isFunction } from './utils';

const tuning = 10;

/**
 * @hook useInfiniteScroller
 * @desc 滚动加载更多列表
 * @by lmh
 * @at 2020/08/25
 * */
const useInfiniteScroller = ({
  threshold = 0,
  loadMore = null,
  height = undefined,
  initLoadMore = false, //  是否触发第一页的数据加载
}) => {
  const ref = useRef(null);
  const inBottom = useRef(false);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initLoadMore && isFunction(loadMore)) {
      loadMore();
    }
  }, []);

  useLayoutEffect(() => {
    if (loading) {
      // support loader on bottom
      // auto fix scrollerBar to bottom when invoke loading.
      setTimeout(() => {
        const { current } = ref;
        if (current.scrollTop !== current.scrollHeight) {
          current.scrollTop = current.scrollHeight;
        }
      });
    }
  }, [loading]);

  const onScroll = useCallback(() => {
    if (hasMore && !loading) {
      if (ref?.current) {
        const { scrollTop, scrollHeight, clientHeight } = ref.current;
        const lastIsReachBottom = inBottom.current;
        const isReachBottom =
          scrollTop + clientHeight >= scrollHeight - threshold - tuning;

        if (isReachBottom && !lastIsReachBottom) {
          if (isFunction(loadMore)) loadMore();
        }
        inBottom.current = isReachBottom;
      }
    }
  });

  const containerProps = {
    ref,
    onScroll: e => {
      onScroll();
      e.preventDefault();
    },
  };

  if (height !== undefined) {
    containerProps.style = { height, overflowY: 'scroll' };
  }

  return [
    { containerProps, loading },
    { setLoading, setHasMore },
  ];
};

export default useInfiniteScroller;
