import STATUS from '../Unit/status';

class BarModel {
  constructor(length) {
    this.length = length;
    this.current = length - 1;
    // this.bars = new Array(length).fill(STATUS.INIT);
    this.bars = new Array(length).fill(STATUS.COMPLETE);
    this.isPause = false;
  }

  reset = () => {
    const { length } = this;
    this.current = 0;
    this.bars = new Array(length).fill(STATUS.INIT);
  };

  getBars = () => {
    return this.bars;
  };

  isFinal = () => {
    const { current, length } = this;
    return length - 1 === current;
  };

  update = (index, status) => {
    this.current = index;
    this.bars[index] = status;
  };

  doRun = () => {
    const { current, bars, length } = this;

    let nextRunIndex;
    if (bars[current] === STATUS.COMPLETE) {
      if (current === length - 1) {
        this.reset();
        nextRunIndex = 0;
      } else {
        nextRunIndex = current + 1;
      }
    } else {
      nextRunIndex = current;
    }
    this.update(nextRunIndex, STATUS.RUN);
    this.isPause = false;
  };

  doPause = () => {
    const { current } = this;
    this.update(current, STATUS.PAUSE);
    this.isPause = true;
  };

  doComplete = () => {
    const { current } = this;
    this.update(current, STATUS.COMPLETE);
  };

  doPrev = () => {
    const { current, bars } = this;
    if (current === 0) {
      this.reset();
    } else if (bars[current] !== STATUS.COMPLETE) {
      this.update(current, STATUS.INIT);
      this.update(current - 1, STATUS.INIT);
    } else {
      this.update(current, STATUS.INIT);
    }
  };

  doNext = () => {
    const { current, length, bars } = this;
    if (bars[current] === STATUS.COMPLETE) {
      if (current === length - 1) {
        this.reset();
      } else {
        this.update(current + 1, STATUS.COMPLETE);
      }
    } else {
      this.update(current, STATUS.COMPLETE);
    }
  };
}

export default BarModel;

// const bar = new BarModel(3);
// bar.doRun();
// bar.doComplete();
// bar.doPause();
// bar.doNext()
// bar.doRun();
// bar.doComplete();
// bar.doPause();
// bar.doPrev();
// bar.doRun();
// bar.doRun();
// console.log(bar);
