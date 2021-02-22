import ResizeObserver from 'resize-observer-polyfill';

const throttle = (func: (args) => void, wait: number = 10) => {
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

export default bind;
