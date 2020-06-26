import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Bar from './Bar';
import Player from './Player';

function TimeLine({ datas, duration, onComplete, unitWidth }) {
  const ref = useRef(null);
  const [stop, sStop] = useState(true);

  const toPrev = () => {
    ref.current.doPrev();
  };

  const toPlayer = () => {
    if (!stop) {
      ref.current.doPause();
    } else {
      ref.current.doRun();
    }
  };

  const toNext = () => {
    ref.current.doNext();
  };

  return (
    <React.Fragment>
      <Bar
        ref={ref}
        datas={datas}
        unitWidth={unitWidth}
        onStop={sStop}
        duration={duration}
        onComplete={onComplete}
      />

      <Player stop={stop} toPrev={toPrev} toPlayer={toPlayer} toNext={toNext} />
    </React.Fragment>
  );
}

TimeLine.propTypes = {
  datas: PropTypes.array, 
  onComplete: PropTypes.func, 
  duration: PropTypes.number,
  unitWidth: PropTypes.number, 
};

TimeLine.defaultProps = {
  datas: [],
  onComplete: () => {},
  duration: 4,
  unitWidth: 220,
};

export default TimeLine;
export { TimeLine };
