/* eslint-disable no-plusplus */
import React from 'react';
import cn from 'classnames';
import { Icon } from 'antd-mobile';
import equal from 'fast-deep-equal';
import moment from 'moment';
import styles from './styles.less';

const getSpecif = m => {
  return {
    year: m.year(),
    month: m.month() + 1,
    daysInMonth: m.daysInMonth(),
    day: moment(m)
      .set('date', 1)
      .day(),
  };
};

const Week = ['日', '一', '二', '三', '四', '五', '六'];
const Ranges = ['开始时间', '结束时间'];
const Today = moment();

const isBet = ({ year, month, date }, ranges) => {
  const dt = moment(`${year}-${month}-${date}`);
  if (ranges.length === 0) return false;
  if (ranges.length === 1) {
    return dt.isSame(ranges[0]);
  }
  return dt.isBetween(...ranges, null, '[]');
};

export default class extends React.Component {
  state = { current: Today, days: [], ranges: [], year: '', month: '' };

  componentDidMount() {
    const { value } = this.props;

    if (value.length) {
      this.setState({ ranges: value, current: value[1] }, this.init);
    } else {
      this.init();
    }
  }

  componentDidUpdate(preProps, preState) {
    const { ranges } = this.state;

    if (!equal(ranges, preState.ranges)) {
      this.init();
    }
  }

  init = () => {
    const { current, ranges } = this.state;

    const { year, month, daysInMonth, day } = getSpecif(current);
    const days = new Array(daysInMonth).fill(1);
    const emptys = new Array(day).fill(-1);

    this.setState({
      year,
      month,
      days: [...emptys, ...days].map((i, k) => {
        const date = i === -1 ? -1 : k + 1 - emptys.length;
        return {
          date,
          day: k % 7,
          inRange: i === -1 ? false : isBet({ year, month, date }, ranges),
        };
      }),
    });
  };

  onClick = date => {
    const { year, month, ranges } = this.state;
    const dt = moment(`${year}-${month}-${date}`);

    this.setState({
      ranges:
        ranges.length === 2
          ? [dt]
          : [...ranges, dt].sort((a, b) => (a.isBefore(b) ? -1 : 1)),
    });
  };

  toPrev = () => {
    const { current } = this.state;
    this.setState(
      { current: moment(current).subtract(1, 'months') },
      this.init,
    );
  };

  toNext = () => {
    const { current } = this.state;
    this.setState({ current: moment(current).add(1, 'months') }, this.init);
  };

  onCancel = () => {
    const { onCancel } = this.props;
    if (onCancel) {
      onCancel();
    }
  };

  onOk = () => {
    const { onOk } = this.props;
    const { ranges } = this.state;
    if (onOk) {
      onOk(ranges);
    }
  };

  render() {
    const { year, month, days, ranges } = this.state;
    return (
      <div className={styles.root}>
        <div className={styles.ranges}>
          {Ranges.map((text, index) => {
            const label = ranges[index] ? (
              ranges[index].format('YYYY-MM-DD')
            ) : (
              <span style={{ color: '#BBBBBB' }}>{`请选择${text}`}</span>
            );

            return (
              <div className={styles.range} key={index}>
                <span className={styles.text}>{`${text}：`}</span>
                <div className={styles.time}>
                  <span className={styles.label}>{label}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.meta}>
          <Icon type="left" color="#8A8A8A" size="s" onClick={this.toPrev} />
          <span className={styles.label}>{`${year}年${month}月`}</span>
          <Icon type="right" color="#8A8A8A" size="s" onClick={this.toNext} />
        </div>

        <div className={styles.week}>
          {Week.map(i => (
            <div className={styles.unit} key={i}>
              {i}
            </div>
          ))}
        </div>

        <div className={styles.days}>
          {days.map((i, k) => {
            const { date, day, inRange } = i;
            const isEmpty = date === -1;
            return (
              <div
                key={k}
                className={cn(
                  isEmpty ? styles.empty : styles.day,
                  inRange ? styles.inrange : '',
                  day === 0 || day === 6 ? styles.weekday : '',
                )}
                onClick={isEmpty ? null : () => this.onClick(date)}
              >
                {date}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
