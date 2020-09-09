import { useEffect } from 'react';

const useEventListener = (ele, handler, options) =>
  useEffect(() => {
    ele.addEventListener(ele, handler, options);
    return () => {
      ele.removeEventListener(ele, handler, options);
    };
  }, [ele, handler, options]);

export default useEventListener;
