// @see: https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver/IntersectionObserver
// @see: http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html
/**
  @by lmh
  @at 2020-07-06
 */
const onChanges = entries => {
  entries.forEach(entry => {
    const { isIntersecting, intersectionRatio, target } = entry;

    if (isIntersecting && intersectionRatio > 0) {
      // dom in view
      const instance = instances.get(target);
      // emit callback
      if (instance) {
        const { callback } = instance;
        callback(target);
      }
      // unobserve
      // trigger once
      observer.unobserve(target);
    }
  });
};

const instances = new Map(); // a map to save callback and target

// 这里统一了配置，用html做监听
const observer = new IntersectionObserver(onChanges, {
  root: null, // use document as observer
  // rootMargin: '50px 25px 50px 25px', // preload
});

const observe = (ele, callback) => {
  observer.observe(ele);
  instances.set(ele, { callback });
};

const unobserve = ele => {
  observer.unobserve(ele);
  if (instances.has(ele)) {
    instances.delete(ele);
  }
};

export default { observe, unobserve };
export { observe, unobserve };
