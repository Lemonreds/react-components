import { cloneElement, useRef, useState } from 'react';

/**
 *
 * @hook useHover
 * @desc dom的hover效果
 *
 */

// delay: 鼠标移入一定时长(delay)后才触发hover
// lasting: 鼠标移出是否重置delay，重新计算时长
const defaultOptions = { delay: 0, lasting: true };

const useHover = (ele, options) => {
  const [state, setState] = useState(false);
  const delayRef = useRef();

  const { delay, lasting } = { ...defaultOptions, options };

  const onMouseEnter = () => {
    if (delay) {
      delayRef.current = setTimeout(() => {
        setState(true);
      }, delay);
    } else {
      setState(true);
    }
  };

  const onMouseLeave = () => {
    if (delay && lasting) {
      clearTimeout(delayRef.current);
      delayRef.current = null;
    } else {
      setState(false);
    }
  };

  return [
    cloneElement(ele, {
      onMouseEnter,
      onMouseLeave,
    }),
    state,
  ];
};

export default useHover;
