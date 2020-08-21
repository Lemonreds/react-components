import { useState, useRef, useMemo, useEffect } from 'react';
import { isFunction } from './utils';

// generate a unique key.
// let id = 0x996;
// const uid = () => {
//   id += 1;
//   return id;
// };

const overflowCount = 5;

/**
 *
 * @hook useVirtual
 * @desc 虚拟长列表
 * @at 2020/08/12
 * @by lmh
 * @ref https://hooks.umijs.org/hooks/ui/use-virtual-list 的又一个实现
 *
 * */

const useVirtual = ({ total = 0, height = 320, itemHeight = 32 }) => {
  const ref = useRef(null);
  const [list, setList] = useState([]);

  useEffect(() => {
    generate();
  }, []);

  const [cache, warpperHeight] = useMemo(() => {
    const c = new Map(); // use map as itemHeight's caches

    if (isFunction(itemHeight)) {
      let h = 0;
      for (let i = 0; i < total; i += 1) {
        h += itemHeight(i);
      }
      return [c, h];
    }
    return [c, total * itemHeight];
  }, [total, itemHeight]);

  const containerProps = {
    ref,
    onScroll: (e) => {
      generate();
      e.preventDefault();
    },
    style: { position: 'relative', overflow: 'auto', height },
  };
  const wrapperProps = { style: { overflow: 'hidden', height: warpperHeight } };

  const getItemHeight = (index) => {
    if (!isFunction(itemHeight)) return itemHeight;
    const cacheHeight = cache.get(index);
    if (cacheHeight) return cacheHeight;
    const iHeight = itemHeight(index);
    cache.set(index, iHeight);
    return iHeight;
  };

  const getStartIndex = () => {
    const {
      current: { scrollTop },
    } = ref;

    if (!isFunction(itemHeight)) return Math.ceil(scrollTop / itemHeight);

    let startIndex = 0;
    let totalHeight = 0;
    while (totalHeight < scrollTop) {
      const currentHeight = getItemHeight(startIndex);
      totalHeight += currentHeight;
      startIndex += 1;
    }
    return startIndex;
  };

  const generate = () => {
    const {
      current: { scrollTop },
    } = ref;

    const startIndex = getStartIndex();
    const shouldRenderedItems = [];

    let renderedHeight = 0;
    let index = startIndex;
    let startOverflowCount = overflowCount;

    while (index <= total - 1 && (renderedHeight < height || startOverflowCount > 0)) {
      const itemHeightValue = getItemHeight(index);
      renderedHeight += itemHeightValue;
      shouldRenderedItems.push({
        style: {
          position: 'absolute',
          width: '100%',
          height: itemHeightValue,
          top: `${scrollTop + renderedHeight - itemHeightValue}px`,
        },
        index,
      });
      index += 1;

      if (renderedHeight > height) {
        startOverflowCount -= 1;
      }
    }

    setList(shouldRenderedItems);
  };

  return [list, containerProps, wrapperProps];
};

export default useVirtual;
