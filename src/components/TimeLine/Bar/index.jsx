import React from 'react';
import cn from 'classnames';
import equal from 'fast-deep-equal';
import Unit from '../Unit';
import BarModel from './BarModel';
import styles from './styles.less';

class Bar extends React.Component {
  index = 996;

  state = { barModel: new BarModel(0), isStop: true };

  static getDerivedStateFromProps({ datas }, { barModel }) {
    const len = datas.length + 1;
    if (len === barModel.getBars().length) {
      return null;
    }
    return { barModel: new BarModel(datas.length + 1), isStop: true };
  }

  componentDidUpdate(_, preState) {
    const { isStop } = this.state;

    if (!equal(isStop, preState.isStop)) {
      const { onStop } = this.props;
      onStop(isStop);
    }
  }

  doRun = () => {
    this.setState(
      prevState => {
        const { barModel } = prevState;
        barModel.doRun();
        return { barModel, isStop: false };
      },
      () => {
        const { barModel } = this.state;
        if (barModel.current === 0) {
          const { onComplete } = this.props;
          onComplete(-1);
          this.index = 996;
        }
      },
    );
  };

  doComplete = index => {
    if (this.index === index) return;
    this.index = index;
    this.setState(
      prevState => {
        const { barModel } = prevState;
        barModel.doComplete();
        return { barModel };
      },
      () => {
        // ------
        const { barModel, isStop } = this.state;
        if (!isStop) {
          const isFinal = barModel.isFinal();
          if (!isFinal) {
            this.doRun();
          } else {
            this.setState({ isStop: true });
          }
        }
        // ------
        const { datas, onComplete } = this.props;
        if (index >= 0 && index < datas.length) {
          onComplete(index);
        }
        // ------
      },
    );
  };

  doPause = () => {
    this.setState(prevState => {
      const { barModel } = prevState;
      barModel.doPause();
      return { barModel, isStop: true };
    });
  };

  doPrev = () => {
    this.index = 996;
    this.setState(
      prevState => {
        const { barModel } = prevState;
        barModel.doPrev();
        return { barModel };
      },
      () => {
        const { isStop } = this.state;
        if (!isStop) {
          this.doRun();
        }
        // ------
        const { onComplete } = this.props;
        const { barModel } = this.state;
        onComplete(barModel.current - 1);
        // ------
      },
    );
  };

  doNext = () => {
    this.index = 996;
    this.setState(
      prevState => {
        const { barModel } = prevState;
        barModel.doNext();
        return { barModel };
      },
      () => {
        const { barModel, isStop } = this.state;
        const isFinal = barModel.isFinal();
        if (!isStop) {
          if (isFinal) {
            this.doRun();
          }
        }

        if (barModel.current === 0) {
          const { onComplete } = this.props;
          onComplete(-1);
        }
      },
    );
  };

  getStatus = () => {
    const { barModel } = this.state;
    return barModel.getBars();
  };

  render() {
    const { datas, unitWidth, duration, className } = this.props;
    const status = this.getStatus();
    return (
      <div className={cn(styles.root, className)}>
        {datas.length
          ? status.map((i, k) => {
              const isBetween = k === 0 || k === datas.length;
              const label = datas[k];
              return (
                <Unit
                  key={String(k)}
                  status={status[k]}
                  label={label}
                  onComplete={() => this.doComplete(k)}
                  width={isBetween ? unitWidth / 2 : unitWidth}
                  duration={isBetween ? duration / 2 : duration}
                />
              );
            })
          : null}
      </div>
    );
  }
}

export default Bar;
