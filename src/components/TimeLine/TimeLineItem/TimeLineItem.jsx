import React, { useEffect, useContext } from 'react';
import classnames from 'classnames';
import useResizeObserver from '@/hooks/useResizeObserver';
import PropTypes from 'prop-types';
import TimeLineDot from '../TimeLineDot';
import TimeLineContext from '../context';
import ItemState from '../ItemState';
import styles from './TimeLineItem.less';

const classnameMap = {
  [ItemState.INIT]: styles['zoom-width-init'],
  [ItemState.RUN]: styles['zoom-width-run'],
  [ItemState.COMPLETE]: styles['zoom-width-complete'],
  [ItemState.PAUSE]: styles['zoom-width-pause'],
};

const TimeLineItem = props => {
  const { className, style, children, group, state, onCompleted } = props;
  const [ref, changedTarget] = useResizeObserver();
  const context = useContext(TimeLineContext);
  const { duration, alternate, width } = context;

  const hasChildren = !!children;
  const contentStyle = {
    left: `calc((${width}px + 14px - 4px - 120px))`,
  };
  if (alternate && group) {
    contentStyle.bottom = 32;
  } else {
    contentStyle.top = 32;
  }

  const activeStyle = {};
  if (state !== ItemState.INIT) {
    activeStyle.animationDuration = `${duration}s`;
  }

  useEffect(() => {
    if (changedTarget) {
      const { width: clientWidth } = changedTarget.contentRect;
      if (clientWidth === width) {
        onCompleted();
      }
    }
  }, [changedTarget]);

  return (
    <li className={classnames([styles.root], className)} style={style}>
      <div className={styles.bar}>
        <div className={styles.inactive} style={{ width }}>
          <div
            ref={ref}
            className={classnames([styles.active, classnameMap[state]])}
            style={activeStyle}
          />
        </div>
        {hasChildren && <TimeLineDot isActive={state === ItemState.COMPLETE} />}
      </div>

      {hasChildren && (
        <div className={styles.content} style={contentStyle}>
          {children}
        </div>
      )}
    </li>
  );
};
TimeLineItem.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.any),
  ]),
};

TimeLineItem.defaultProps = {
  className: '',
  style: {},
  children: undefined,
};

export default TimeLineItem;
