import React, { useRef, useEffect, useState } from 'react';
import cn from 'classnames';
import { useUpdateEffect, usePrevious } from 'ahooks';
import './MarQuee.less';

function addStyleSheet(innerHTML) {
  if(!document.styleSheets[0]){
    throw new Error("cant find document.styleSheets[0]")
  }
  const { length } = document.styleSheets[0].cssRules;
  document.styleSheets[0].insertRule(innerHTML, length);
}

/**
 *
 * @component 文字跑马灯
 *
 */
function MarQuee(props) {
  const { children, speed, updateFlag, pause, className } = props;
  const ref = useRef(null);
  const lastUpdateFlag = usePrevious(updateFlag);

  const [state, setState] = useState({
    initialed: false,
    marqueeWidth: 0,
    left: 0,
    animationName: '',
    animationDuration: 0,
  });

  const calculate = () => {
    const { offsetWidth, parentElement } = ref.current;
    const scrollWidth = offsetWidth + parentElement.offsetWidth;
    const newState = {
      initialed: true,
      marqueeWidth: offsetWidth,
      left: parentElement.offsetWidth,
      animationName: `marquee${offsetWidth}`,
      animationDuration: scrollWidth / speed,
    };

    addStyleSheet(
      `@keyframes ${newState.animationName} {
        0% {
          transform: translateX(0px);
        }
        100% {
          transform: translateX(-${scrollWidth}px);
        }
      }`
    );
    setState(newState);
  };

  useUpdateEffect(() => {
    if (updateFlag !== lastUpdateFlag) {
      calculate();
    }
  }, [updateFlag]);

  useEffect(() => {
    return calculate();
  }, []);

  const { initialed, left, animationName, animationDuration } = state;

  return (
    <div className="marquee_box">
      <span
        className={cn('marquee_text', className, {
          marquee_un_initial: !initialed,
          marquee_text_pause: pause,
        })}
        ref={ref}
        style={{
          left: `${left}px`,
          animationName,
          animationFillMode: 'both',
          animationDuration: `${animationDuration}s`,
        }}
      >
        {children}
      </span>
    </div>
  );
}

MarQuee.defaultProps = {
  children: '',
  speed: 30,
  minDuration: 3,
  updateFlag: false,
  pause: false,
};

export default React.memo(MarQuee);
