import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import TimeLineContext from '../context';

import styles from './TimeLineDot.less';

function TimeLineDot(props) {
  const { className, style, isActive } = props;
  const context = useContext(TimeLineContext);
  const { color, outlined } = context;

  const _color = isActive ? color : '#e5e5e5';
  let dotStyle;
  if (outlined) {
    dotStyle = {
      border: `2px solid ${_color}`,
      background: 'transparent',
    };
  } else {
    dotStyle = {
      background: _color,
    };
  }

  return (
    <div
      className={`${styles.root} ${className}`}
      style={{
        ...style,
        ...dotStyle,
      }}
    />
  );
}

 
TimeLineDot.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  isActive: PropTypes.bool,
};

TimeLineDot.defaultProps = {
  className: '',
  style: {},
  isActive: false,
};

export default TimeLineDot;
