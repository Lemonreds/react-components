import React, { useRef, useEffect, useState } from 'react';
import useDraggable from 'hooks/useDraggable';
import { getEventPosition } from 'utils/dom';
import { isNum } from 'utils/type';
import styles from './Slider.less';

const isControllered = value => typeof value !== 'undefined';

const getCloseValue = (min, max, percent, step) => {
  const value = parseInt((max - min) * percent) + min;
  if (isNum(step)) {
    const steps = (value - min) / step;
    const closeValue = Math.round(steps) * step;
    return closeValue + min;
  }
  return value;
};

function Slider({ min, max, defaultValue, value, step, onChange }) {
  const container = useRef(null);
  // 让组件受控
  // 有value的props，直接用value，不用内部的state
  // 交由父组件控制
  const [state, setState] = useState(defaultValue || value || min || 0);
  useEffect(() => {
    if (onChange) {
      onChange(state);
    }
  }, [state]);

  useEffect(() => {
    if (isControllered(value)) {
      if (value !== state) {
        setState(value);
      }
    }
  }, [value]);
  // end

  const onMouseMove = position => {
    const { clientWidth } = container.current;
    const { x } = position;
    let p = x / clientWidth;
    if (p < 0) p = 0;
    if (p > 1) p = 1;
    const v = getCloseValue(min, max, p, step);
    setState(v);
  };

  const [props] = useDraggable(container, { onMouseMove });

  const onTrack = e => onMouseMove(getEventPosition(container.current, e));

  // 让组件受控
  // 有value的props，直接用value，不用内部的state
  // 交由父组件控制
  const offset =
    (((isControllered(value) ? value : state) - min) / (max - min)) * 100;
  const _value = isControllered(value) ? value : state;

  return (
    <div className={styles.root} onClick={onTrack} ref={container}>
      <span className={styles.active} style={{ width: `${offset}%` }} />
      <span className={styles.inactive} style={{ width: `${100 - offset}%` }} />
      <span
        className={styles.hanlder}
        style={{ left: `${offset}%` }}
        {...props}
      />
      <span className={styles.state}>{_value}</span>
    </div>
  );
}

export default Slider;
