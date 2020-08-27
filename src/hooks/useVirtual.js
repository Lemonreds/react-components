import { useState, useRef, useMemo, useEffect } from 'react';
import { isFunction, isNumber } from './utils';

// 长列表上下边界的渲染数，一般不用修改
// 主要是为了避免每次滚动都从整项开始
const overscan = 4;

/**
 * @hook useVirtual
 * @desc 虚拟长列表，仅展示可视区域内的DOM
 * @at 2020/08/12
 * @by lmh
 * @ref https://bvaughn.github.io/react-virtualized/#/components/List
 * */

const useVirtual = ({
  total = 0, // 长列表的子项数目
  height = 320, // 长列表的可视高度
  itemHeight = 32, // 长列表的子项高度，为函数时表示高度可变的
  useCache = false, // 缓存子项距离顶部的高度，但是感觉效果不明显，默认关闭了
}) => {
  const ref = useRef(null);
  const [list, setList] = useState([]);

  useEffect(() => {
    reCalculate();
  }, []);

  // 获取长列表的滚动高度
  const getTotalHeight = () => {
    if (isNumber(itemHeight)) return total * itemHeight;
    let h = 0;
    for (let i = 0; i < total; i += 1) {
      h += itemHeight(i);
    }
    return h;
  };
  // 获取某个子项的高度
  const getItemHeight = index =>
    isFunction(itemHeight) ? itemHeight(index) : itemHeight;

  // 子项距离滚动区域顶部的距离、滚动区域的真实高度
  const [offsetTopCaches, wrapperHeight] = useMemo(
    () => [new Map(), getTotalHeight()],
    [total, itemHeight],
  );

  // 获取可视区域内，第一个子项
  const getStart = scrollTop => {
    if (isNumber(itemHeight)) {
      return Math.ceil(scrollTop / itemHeight);
    }
    let start = 0;
    let totalHeight = 0;
    while (totalHeight < scrollTop) {
      totalHeight += getItemHeight(start);
      start += 1;
    }
    return start;
  };

  // 获取可视区域内，最后一个子项
  const getEnd = (start, clientHeight) => {
    let totalHeight = 0;
    let end = start;
    while (totalHeight < clientHeight) {
      totalHeight += getItemHeight(start);
      end += 1;
    }
    return end;
  };

  // 获取某个子项距离滚动容器的顶部的距离
  // 子项高度可变的情况，用了map做缓存，useCache=true开启 
  const getOffsetTop = index => {
    if (isNumber(itemHeight)) {
      return index * itemHeight;
    }

    if (useCache) {
      const cache = offsetTopCaches.get(index);
      if (cache) {
        return cache;
      }
    }

    let h = 0;
    for (let i = 0; i < index; i += 1) {
      h += getItemHeight(i);
    }
    if (useCache) {
      offsetTopCaches.set(index, h);
    }
    return h;
  };

  // 获取真实的子项渲染范围
  const getRanges = () => {
    const {
      current: { scrollTop, clientHeight },
    } = ref;
    let start = getStart(scrollTop);
    let end = getEnd(start, clientHeight);
    // 非法值修正
    start = start - overscan < 0 ? 0 : start - overscan;
    end = end + overscan > total ? total : end + overscan;
    return { start, end };
  };

  // 计算应该展示的子项
  const reCalculate = () => {
    const { start, end } = getRanges();
    const t = [];
    for (let i = start; i < end; i += 1) {
      t.push({
        style: {
          position: 'absolute',
          width: '100%',
          height: getItemHeight(i),
          top: `${getOffsetTop(i)}px`,
        },
        index: i,
      });
    }
    setList(t);
  };

  const containerProps = {
    ref,
    onScroll: e => {
      reCalculate();
      e.preventDefault();
    },
    style: { position: 'relative', overflow: 'auto', height },
  };
  const wrapperProps = { style: { overflow: 'hidden', height: wrapperHeight } };

  return [list, containerProps, wrapperProps];
};

export default useVirtual;
