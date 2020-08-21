import { useRef, useEffect } from 'react';

/**
 * @hook usePrevious
 * @desc 保留状态的前一个值
 */
const usePrevious = (value) => {
  const ref = useRef();
  
  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

export default usePrevious;
