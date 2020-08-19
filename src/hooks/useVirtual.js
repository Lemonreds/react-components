import { useState, useRef, useMemo, useEffect } from 'React';

// generate a unique key.
let id = 0x996;
const uid = () => {
  id += 1;
  return id;
};

const isFunction = fn => fn instanceof Function;

const containerStyle = { position: 'relative', overflow: 'auto' };
const wrapperStyle = { overflow: 'hidden' };

const overflowCount = 5;

/**
 *
 * @hooks useVirtual
 * @desc 无限长列表滚动，支持相同高度、不同高度的子项
 * @at 2020/08/12
 * @by lmh
 * @ref https://hooks.umijs.org/hooks/ui/use-virtual-list 的另一种实现
 * @usage

 * 相同高度子项
 * step1. const [list, containerProps, wrapperProps] = useVirtual({ total: 9996, height: 520,  itemHeight: 52 });
 * 不同高度的子项，itemHeight传函数
 * step1. useVirtual({ total: 9996, height: 520,  itemHeight: (index)=> index % 2 === 0 ? 64 : 102 });
 
 * step2. JSX:
  <div {...containerProps}>
        <div {...wrapperProps}>
          {list.map(({ style, index, key }) => (
            <div
              style={{
                ...style,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottom: '1px solid #e8e8e8',
              }}
              key={index}
            >
              {index + 1}
        </div>
        ))}
    </div>
 *
 */
const useVirtual = ({ total = 0, height = 320, itemHeight = 32 }) => {
  const ref = useRef(null);
  const [list, setList] = useState([]);

  useEffect(() => {
    generate();
  }, []);

  const [cache, warpperHeight] = useMemo(() => {
    const c = new Map(); // use map as itemHeight's cahces

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
    style: { ...containerStyle, height },
  };
  const wrapperProps = { style: { ...wrapperStyle, height: warpperHeight } };

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
        key: uid(),
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
