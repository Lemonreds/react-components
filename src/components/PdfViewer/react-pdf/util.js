const defaultScale = 1;
const maxScale = 1.8;

export const getPageScale = (page, scale, width, height) => {
  const scaleWithDefault = scale || defaultScale;
  const viewport = page.getViewport(1);
  let pageScale = width ? width / viewport.width : height / viewport.height;
  pageScale *= scaleWithDefault;
  return Math.min(maxScale, pageScale);
};

export function makeCancellablePromise(promise) {
  let isCancelled = false;
  const wrappedPromise = new Promise(function (resolve, reject) {
    promise
      .then(function (...rests) {
        return !isCancelled && resolve.apply(void 0, rests);
      })
      .catch(function (error) {
        return !isCancelled && reject(error);
      });
  });
  return {
    promise: wrappedPromise,
    cancel: function cancel() {
      isCancelled = true;
    },
  };
}

export function getPixelRatio() {
  return window.devicePixelRatio || 1;
}
