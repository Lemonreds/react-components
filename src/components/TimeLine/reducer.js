import ItemState from './ItemState';

const { INIT, RUN, PAUSE, COMPLETE } = ItemState;

const ActionTypes = {
  INIT: 'init',
  NEXT: 'next',
  PREV: 'prev',
  PLAY: 'play',
  PAUSE: 'pause',
  COMPLETED: 'completed',
};

// [-1,length]
const _getStep = ({ current, length, step }) => {
  const nextStep = current + step;
  if (nextStep <= -1) return -1;
  if (nextStep >= length) return length;
  return nextStep;
};

const initState = {
  current: -1,
  itemState: [],
  isPause: true,
  isInit: true,
  isFinish: false,
  initCurrent: -1,
};

const jumpTo = (state, { next, pause, runNow = true }) => {
  const {
    itemState: { length },
  } = state;
  let { isPause, current } = state;

  if (typeof pause === 'boolean') {
    isPause = pause;
  }

  if (typeof next === 'number') {
    current = next;
  }

  const itemState = Array(length).fill(INIT);
  const isInit = current === -1;
  const isFinish = current === length;

  for (let i = 0; i < current && i < length; i += 1) {
    itemState[i] = COMPLETE;
  }

  if (current >= 0 && current < length) {
    let status = INIT;
    if (runNow) {
      status = isPause ? PAUSE : RUN;
    }
    itemState[current] = status;
  }

  if (isFinish || isInit) {
    isPause = true;
  }

  return { ...state, current, itemState, isPause, isInit, isFinish };
};

const init = (_, payload) => {
  const { initCurrent, length } = payload;

  const newState = {
    ...initState,
    initCurrent,
    itemState: Array(length).fill(INIT),
  };

  const next = _getStep({
    current: initCurrent || newState.current,
    length,
    step: 0,
  });
  return jumpTo(newState, { next, runNow: false });
};

function reducer(state, { type, payload }) {
  const {
    current,
    isInit,
    isFinish,
    itemState: { length },
  } = state;
  let next;
  let pause;

  switch (type) {
    case ActionTypes.INIT:
      return init(state, payload);
    case ActionTypes.PLAY:
      pause = false;
      next = isInit || isFinish ? 0 : current;
      break;
    case ActionTypes.PAUSE:
      pause = true;
      break;
    case ActionTypes.NEXT:
      next = _getStep({ current, length, step: 1 });
      break;
    case ActionTypes.PREV:
      next = _getStep({ current, length, step: -1 });
      break;
    case ActionTypes.COMPLETED:
      if (current !== payload.index) {
        return state;
      }
      next = _getStep({ current, length, step: 1 });
      break;
    default:
      return state;
  }
  return jumpTo(state, { next, pause });
}

export default reducer;

export { reducer, initState, ActionTypes };
