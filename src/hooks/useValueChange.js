import { useState, useEffect } from 'react';

/**
 * @hook useValueChange
 * @at 2020/09/17
 * @by lmh
 * @desc 子组件变为受控
 */
function useValueChange(props) {
  const { defaultValue, onChange, value } = props;
  const [state, set] = useState(value || defaultValue);

  useEffect(() => {
    if (value !== state) {
      set(value);
    }
  }, [value]);

  const setter = v => {
    if (typeof value !== 'undefined') {
      if (onChange instanceof Function) {
        onChange(v);
      }
    } else {
      set(v);
    }
  };

  return [state, setter];
}

export default useValueChange;
