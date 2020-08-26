import { useState, useRef, useMemo, useEffect } from 'react';
import { isFunction } from './utils';

const overflowCount = 5;

/**
 * @hook useVirtual
 * @desc 虚拟长列表
 * @at 2020/08/12
 * @by lmh
 * @ref https://hooks.umijs.org/hooks/ui/use-virtual-list 的类似实现
 * */

const useVirtual = ({ total = 0, height = 320, itemHeight = 32, useHeightCache = false }) => {
  const ref = useRef(null);
  const [list, setList] = useState([]);

  useEffect(() => {
    generate();
  }, []);

  const [cache, wrapperHeight] = useMemo(() => {
    const c = useHeightCache ? new Map() : null; // use a map as itemHeight's caches

    if (isFunction(itemHeight)) {
      let h = 0;
      for (let i = 0; i < total; i += 1) {
        h += itemHeight(i);
      }
      return [c, h];
    }
    return [c, total * itemHeight];
  }, [total, itemHeight]);

  const getItemHeight = (index) => {
    if (!isFunction(itemHeight)) {
      return itemHeight;
    }

    let iHeight;
    if (useHeightCache) {
      iHeight = cache.get(index);
      return iHeight;
    }

    iHeight = itemHeight(index);
    if (useHeightCache) {
      cache.set(index, iHeight);
    }
    return iHeight;
  };

  const getStartIndex = () => {
    const {
      current: { scrollTop },
    } = ref;

    if (!isFunction(itemHeight)) {
      return Math.ceil(scrollTop / itemHeight);
    }

    let startIndex = 0;
    let totalHeight = 0;
    while (totalHeight < scrollTop) {
      totalHeight += getItemHeight(startIndex);
      startIndex += 1;
    }
    return startIndex;
  };

  const generate = () => {
    const {
      current: { scrollTop },
    } = ref;
    const startIndex = getStartIndex();
    const temp = [];

    let totalHeight = 0;
    let index = startIndex;
    let startOverflowCount = overflowCount;

    while (index <= total - 1 && (totalHeight < height || startOverflowCount > 0)) {
      const iHeight = getItemHeight(index);
      totalHeight += iHeight;

      temp.push({
        style: {
          position: 'absolute',
          width: '100%',
          height: iHeight,
          top: `${scrollTop + totalHeight - iHeight}px`,
        },
        index,
      });
      index += 1;

      if (totalHeight > height) {
        startOverflowCount -= 1;
      }
    }

    setList(temp);
  };

  const containerProps = {
    ref,
    onScroll: (e) => {
      generate();
      e.preventDefault();
    },
    style: { position: 'relative', overflow: 'auto', height },
  };
  const wrapperProps = { style: { overflow: 'hidden', height: wrapperHeight } };

  return [list, containerProps, wrapperProps];
};

export default useVirtual;
