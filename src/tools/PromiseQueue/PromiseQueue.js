import { makeCancellablePromise } from './util';

const UNIT_STATE = {
  INIT: 'init',
  RUN: 'run',
  FINISHED: 'finished',
  REMOVED: 'removed',
  ERROR: 'error',
};

class PromiseUnit {
  constructor(opts) {
    this.promiseFn = opts?.promiseFn;
    this.index = opts?.index;
    this.hooks = opts?.hooks;
    this.cancellable = null;
    this.state = UNIT_STATE.INIT;
  }

  get isInitialized() {
    const { state } = this;
    return state === UNIT_STATE.INIT;
  }

  get isRunning() {
    const { state } = this;
    return state === UNIT_STATE.RUN;
  }

  get isRemoved() {
    const { state } = this;
    return state === UNIT_STATE.REMOVED;
  }

  run() {
    const { state, promiseFn, index } = this;
    if (state === UNIT_STATE.INIT) {
      this.state = UNIT_STATE.RUN;

      const promise = promiseFn(index);
      const cancellable = makeCancellablePromise(promise);
      cancellable.promise.then(
        rets => this.finished(rets),
        err => this.catchError(err),
      );

      this.cancellable = cancellable;
    }
  }

  catchError(err) {
    this.state = UNIT_STATE.ERROR;

    const { hooks, index } = this;
    const { catchError } = hooks;
    if (catchError instanceof Function) {
      catchError(err, index);
    }
  }

  finished(rets) {
    const { hooks, state, index } = this;

    if (state === UNIT_STATE.RUN) {
      this.state = UNIT_STATE.FINISHED;
    }
    this.cancellable?.cancel();
    this.cancellable = null;

    const { afterFinished } = hooks;

    if (afterFinished instanceof Function) {
      afterFinished(rets, index);
    }
  }

  remove() {
    this.state = UNIT_STATE.REMOVED;
    this.cancellable?.cancel();
    this.cancellable = null;

    const { hooks, index } = this;
    const { afterRemoved } = hooks;
    if (afterRemoved instanceof Function) {
      afterRemoved(index);
    }
  }

  destory() {
    this.cancellable = null;
    this.hooks = null;
  }
}

// Promise串行队列
class PromiseQueue {
  constructor(opts) {
    this.queue = [];
    this.current = -1;
    this.watcher = opts?.watcher;
  }

  add(...promiseFns) {
    const { queue } = this;
    this.queue.push(
      ...promiseFns.map(
        (promiseFn, index) =>
          new PromiseUnit({
            promiseFn,
            hooks: this.watcher,
            index: index + queue.length,
          }),
      ),
    );
  }

  get currentItem() {
    const { current, queue } = this;
    return queue[current];
  }

  get(index) {
    return this.queue[index];
  }

  loadNext() {
    if (this.currentItem?.isRunning) {
      return;
    }

    const { current, queue } = this;

    const findIndex = queue.findIndex((q, i) => i > current && q.isInitialized);

    if (findIndex === -1) {
      return;
    }

    const next = queue[findIndex];

    this.current = findIndex;
    next.run();
  }

  remove(index) {
    const { queue } = this;
    const removeItem = queue[index];
    if (removeItem) {
      removeItem.remove();
    }
  }

  destory() {
    this.current = undefined;
    this.state = undefined;
    this.queue.forEach(q => q.destory());
    this.queue = null;
  }
}

export default PromiseQueue;
