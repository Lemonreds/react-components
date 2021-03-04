import React, { useReducer, useEffect, useImperativeHandle } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import classnames from 'classnames';

import TimeLineItem from './TimeLineItem';
import { reducer, initState, ActionTypes } from './reducer';
import styles from './TimeLine.less';

const TimeLine = React.forwardRef((props, ref) => {
  const {
    children,
    pending,
    alternate,
    onStateChange,
    initCurrent,
    duration,
    style,
    className,
  } = props;
  const [state, dispatch] = useReducer(reducer, initState);
  const { itemState } = state;

  const items = React.Children.toArray(children);

  if (pending) {
    items.push(<TimeLineItem />);
  }

  useImperativeHandle(ref, () => ({
    doPlay: () => dispatch({ type: ActionTypes.PLAY }),
    doPause: () => dispatch({ type: ActionTypes.PAUSE }),
    doPrev: () => dispatch({ type: ActionTypes.PREV }),
    doNext: () => dispatch({ type: ActionTypes.NEXT }),
    doReset,
  }));

  useEffect(() => {
    if (items.length !== itemState.length) {
      doReset();
    }
  }, [children]);

  useDeepCompareEffect(() => {
    if (onStateChange) {
      // console.log(state);
      onStateChange(state);
    }
  }, [state]);

  const doReset = () => {
    dispatch({
      type: ActionTypes.INIT,
      payload: { length: items.length, initCurrent },
    });
  };

  const _handleCompleted = index => {
    dispatch({ type: ActionTypes.COMPLETED, payload: { index } });
  };

  return (
    <ul className={classnames([styles.root], className)} style={style}>
      {React.Children.map(items, (child, index) =>
        React.cloneElement(child, {
          duration,
          width: 130,
          ...child.props,
          group: index % 2 !== 0,
          alternate,
          state: itemState[index],
          onCompleted: () => _handleCompleted(index),
        }),
      )}
    </ul>
  );
});

export default TimeLine;
