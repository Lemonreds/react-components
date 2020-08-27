import { useState, useRef, useLayoutEffect, useCallback } from 'react';

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
}) => {
  const ref = useRef(null);
  const inBottom = useRef(false);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    if (loading) {
      // support loader on bottom
      // fix scrollerBar to bottom
      setTimeout(() => {
        const { current } = ref;
        current.scrollTop = current.scrollHeight;
      });
    }
  }, [loading]);

  const onScroll = useCallback(() => {
    if (hasMore && !loading) {
      if (ref?.current) {
        const { scrollTop, scrollHeight, clientHeight } = ref.current;
        const isReachBottom =
          scrollTop + clientHeight >= scrollHeight - threshold - tuning;
        if (isReachBottom && !inBottom.current) {
          if (loadMore instanceof Function) {
            loadMore();
          }
        }
        inBottom.current = isReachBottom;
      } else {
        throw new Error('`ref.current` is null.');
      }
    }
  },[]);

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
