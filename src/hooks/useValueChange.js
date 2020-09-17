import { useState, useEffect } from 'react';

/**
 * @hook useValueChange
 * @at 2020/09/17
 * @by lmh
 * @desc 子组件变为受控
 */
function useValueChange(props) {
  const { defaultValue, onChange, value } = props;
  const [state, set] = useState(defaultValue || '');

  useEffect(() => {
    if (value !== state) {
      setter(value);
    }
  }, [value]);

  const setter = v => {
    set(v);
    if (onChange instanceof Function) {
      onChange(v);
    }
  };

  return [state, setter];
}

export default useValueChange;
