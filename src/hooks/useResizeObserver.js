import { useEffect, useRef, useState } from 'react';
// import ResizeObserver from 'resize-observer-polyfill';

const throttle = (func, wait = 10) => {
  let pre = 0;
  return (...args) => {
    const now = Date.now();
    if (now - pre > wait) {
      func.apply(this, args);
      pre = now;
    }
  };
};

function useResizeObserver() {
  const ref = useRef();
  const [changedTarget, set] = useState(null);

  useEffect(() => {
    let disconnect;
    if (ref.current) {
      const ele = ref.current;
      const observe = new ResizeObserver(throttle(entries => set(entries[0])));
      observe.observe(ele);
      disconnect = () => observe.disconnect();
    }
    return disconnect;
  }, [ref]);

  return [ref, changedTarget];
}

export default useResizeObserver;
