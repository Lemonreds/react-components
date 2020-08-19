import { useState } from 'React';

/**
 *
 * @hooks useBoolean
 * @desc 管理boolean状态的hook
 * @at 2020/08/09
 * @by lmh
 *
 */
const useBoolean = (value) => {
  const [bool, setBool] = useState(value);
  const toggle = () => setBool(!bool);
  return [bool, { toggle, setTrue: () => setBool(true), setFalse: () => setBool(false) }];
};

export default useBoolean;
