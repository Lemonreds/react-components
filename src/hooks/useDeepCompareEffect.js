import { useEffect, useRef } from 'react';
import isDeepEqual from 'fast-deep-equal';

/**
 *
 * @description useEffect的深比较版本，使用ref来缓存上一次的deps，通过标志位sinalRef来记录effect执行的次数
 * @ref https://github.com/kentcdodds/use-deep-compare-effect
 */
const deepCompare = deps => {
  const previousDeps = useRef(null);
  const sinalRef = useRef(0);

  if (!isDeepEqual(previousDeps.current, deps)) {
    previousDeps.current = deps;
    sinalRef.current += 1;
  }

  return [sinalRef.current];
};

const useDeepCompareEffect = (effect, deps) =>
  useEffect(effect, deepCompare(deps));

export default useDeepCompareEffect;
