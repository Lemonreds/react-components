import React, { useReducer, useEffect, useImperativeHandle } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import TimeLineContext from './context';
import TimeLineItem from './TimeLineItem/TimeLineItem';
import { reducer, initState, ActionTypes } from './reducer';
import styles from './TimeLine.less';

const TimeLine = React.forwardRef((props, ref) => {
  const {
    className,
    style,
    children,
    pending,

    alternate,
    initCurrent,
    duration,
    width,

    color,
    outlined,

    onStateChange,
  } = props;
  const [state, dispatch] = useReducer(reducer, initState);
  const { itemState } = state;

  const items = React.Children.toArray(children);

  if (pending) {
    items.push(<TimeLineItem />);
  }

  useImperativeHandle(
    ref,
    () => ({
      doPlay: () => dispatch({ type: ActionTypes.PLAY }),
      doPause: () => dispatch({ type: ActionTypes.PAUSE }),
      doPrev: () => dispatch({ type: ActionTypes.PREV }),
      doNext: () => dispatch({ type: ActionTypes.NEXT }),
      doReset,
    }),
    [],
  );

  useEffect(() => {
    if (items.length !== itemState.length) {
      doReset();
    }
  }, [children]);

  useDeepCompareEffect(() => {
    if (onStateChange) {
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
    <TimeLineContext.Provider
      value={{
        duration,
        alternate,
        width,
        color,
        outlined,
      }}
    >
      <ul className={classnames([styles.root], className)} style={style}>
        {React.Children.map(items, (child, index) =>
          React.cloneElement(child, {
            ...child.props,
            group: index % 2 !== 0,
            state: itemState[index],
            onCompleted: () => _handleCompleted(index),
          }),
        )}
      </ul>
    </TimeLineContext.Provider>
  );
});

TimeLine.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.any),
  ]),
  pending: PropTypes.bool,
  initCurrent: PropTypes.number,
  width: PropTypes.number,
  color: PropTypes.string,
  outlined: PropTypes.bool,
};

TimeLine.defaultProps = {
  className: '',
  style: {},
  children: undefined,
  pending: true,
  initCurrent: -1,
  width: 130,
  color: '#004aff',
  outlined: false,
};

export default TimeLine;
