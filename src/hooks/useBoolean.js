import { useState } from 'react';

/**
 *
 * @hook useBoolean
 * @desc 管理boolean状态的hook
 *
 */
const useBoolean = value => {
  const [bool, setBool] = useState(value);
  const toggle = () => setBool(!bool);
  return [
    bool,
    {
      toggle,
      setTrue: () => setBool(true),
      setFalse: () => setBool(false),
      set: setBool,
    },
  ];
};

export default useBoolean;
