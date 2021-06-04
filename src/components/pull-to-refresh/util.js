let supportsPassive = false;
try {
  const opts = Object.defineProperty({}, 'passive', {
    // eslint-disable-next-line getter-return
    get() {
      supportsPassive = true;
    },
  });
  window.addEventListener('test', null, opts);
} catch (e) {
  // empty
}
const willPreventDefault = supportsPassive ? { passive: false } : false;

const isWebView =
  typeof navigator !== 'undefined' &&
  /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
    window.navigator.userAgent,
  );

function setTransform(nodeStyle, value) {
  nodeStyle.transform = value;
  nodeStyle.webkitTransform = value;
  nodeStyle.MozTransform = value;
}

const RrefshStatus = {
  deactivate: 'deactivate', // 下拉可以刷新
  activate: 'activate', // 释放可以刷新
  release: 'release', // 刷新中
  finish: 'finish', // 完成刷新
};

const PullUpStatus = {
  init: 'init', // 上拉可以加载更多
  loading: 'loading', // 加载中
  finish: 'finish', // 没有更多数据
};

export {
  willPreventDefault,
  isWebView,
  setTransform,
  RrefshStatus,
  PullUpStatus,
};
