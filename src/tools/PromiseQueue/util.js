function makeCancellablePromise(promise) {
  let isCancelled = false;
  const wrappedPromise = new Promise(function(resolve, reject) {
    promise
      .then(function(...rests) {
        return !isCancelled && resolve.apply(void 0, rests);
      })
      .catch(function(error) {
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

export { makeCancellablePromise };
