import { useEffect, useRef, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

const throttle = (func: () => void, wait: number = 10) => {
  let pre = 0;
  return (...args) => {
    const now = Date.now();
    if (now - pre > wait) {
      func.apply(this, args);
      pre = now;
    }
  };
};

/**
 * 监听element的css变化
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
 *
 */
function bind(element: element, callback: (element) => void) {
  const observe = new ResizeObserver(
    throttle(e => {
      const target = e[0];
      callback(target);
    }),
  );
  observe.observe(element);
  const unbind = () => observe.disconnect(); // unobserve() use it instead
  return unbind;
}

function useResizeObserver() {
  const ref = useRef();
  const [changedTarget, set] = useState();

  useEffect(() => {
    let unbind;
    if (ref.current) {
      const ele = ref.current;
      const observe = new ResizeObserver(
        throttle(e => {
          const target = e[0];
          set(target);
        }),
      );
      observe.observe(ele);
      unbind = () => observe.disconnect();
    }
    return unbind;
  }, [ref]);

  return [ref, changedTarget];
}

export default bind;

export { useResizeObserver, bind };
