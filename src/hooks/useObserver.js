import { useEffect, useState } from 'react';

const noop = () => undefined;
const isSupportObserver = !!window.IntersectionObserver;
const instances = new Map(); // use a  map to save callback and target

const getInstance = () =>
  isSupportObserver
    ? new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const { isIntersecting, intersectionRatio, target } = entry;
          if (isIntersecting && intersectionRatio > 0) {
            // dom in view
            const instance = instances.get(target);
            // emit callback
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
        //   rootMargin: '50px 25px 50px 25px', // preload margin
      }
    )
    : { observe: noop, unobserve: noop }; // useless here.

const observer = getInstance();

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
 * @hook useObserver
 * @desc 判断dom元素进入页面可视区域，仅触发一次，可用于图片或组件的lazyload
 * @at 2020/08/20
 * @by lmh
 *@ref https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver/IntersectionObserver
 *@ref http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html
 *
 */
const useObserver = (ref) => {
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

export default useObserver;
