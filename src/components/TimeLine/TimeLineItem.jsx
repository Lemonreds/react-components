import React, { useRef, useEffect } from 'react';
import classNames from 'classnames';
import bind from 'utils/bind';
import ItemState from './ItemState';
import styles from './TimeLineItem.less';

const classnameMap = {
  [ItemState.INIT]: styles.init,
  [ItemState.RUN]: styles.run,
  [ItemState.COMPLETE]: styles.complete,
  [ItemState.PAUSE]: styles.pause,
};

const TimeLineItem = props => {
  const {
    children,
    alternate,
    group,
    state,
    onCompleted,
    duration,
    width,
  } = props;
  const ref = useRef();

  const hasChildren = !!children;
  const contentStyle = {
    left: `calc((${width}px + 14px - 4px - 120px))`,
  };
  const activeStyle = {};

  if (state !== ItemState.INIT) {
    activeStyle.animationDuration = `${duration}s`;
  }

  if (alternate && group) {
    contentStyle.bottom = 32;
  } else {
    contentStyle.top = 32;
  }

  useEffect(() => {
    const unbind = bind(ref.current, e => {
      const { width: clientWidth } = e.contentRect;
      if (clientWidth === width) {
        onCompleted(e);
      }
    });
    return unbind;
  }, []);

  return (
    <li className={styles.root}>
      <div className={styles.bar}>
        <div className={styles.inactive} style={{ width }}>
          <div
            ref={ref}
            className={classNames([styles.active, classnameMap[state]])}
            style={activeStyle}
          />
        </div>
        {hasChildren && (
          <div
            className={classNames([styles.dot], {
              [styles['active-dot']]: state === ItemState.COMPLETE,
            })}
          />
        )}
      </div>

      {hasChildren && (
        <div className={styles.content} style={contentStyle}>
          {children}
        </div>
      )}
    </li>
  );
};

export default TimeLineItem;
