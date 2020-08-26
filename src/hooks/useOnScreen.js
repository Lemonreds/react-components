import { useEffect, useState } from 'react';

const isSupportObserver = !!window.IntersectionObserver;
const instances = new Map(); // use a  map to storage callback and target

const observer = isSupportObserver
  ? new window.IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const { isIntersecting, intersectionRatio, target } = entry;
        if (isIntersecting && intersectionRatio > 0) {
          // dom in view
          const instance = instances.get(target);
          // excute callback
          if (instance) {
            const { callback } = instance;
            callback(target);
          }
          // unobserve, trigger once
          observer.unobserve(target);
        }
      });
    },
    {
      root: null, // use html as observer
      //   rootMargin: '50px 25px 50px 25px', // preload
    }
  )
  : null;

const observe = (ele, callback) => {
  observer.observe(ele);
  instances.set(ele, { callback });
};

const unobserve = (ele) => {
  observer.unobserve(ele);
  instances.delete(ele);
};

/**
 *
 * @hook useOnScreen
 * @desc 判断dom元素进入页面可视区域，`仅触发一次`，可用于图片或组件的lazyload
 * @at 2020/08/09
 * @by lmh
 * @ref https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver/IntersectionObserver
 *
 */
const useOnScreen = (ref) => {
  const [visible, setVisible] = useState(!isSupportObserver);

  useEffect(() => {
    if (isSupportObserver) {
      if (ref?.current) {
        observe(ref.current, () => setVisible(true));
        return () => unobserve(ref.current);
      }
    }
    return null;
  }, [ref]);

  return [visible];
};

export default useOnScreen;
