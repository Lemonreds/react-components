import { useEffect } from 'react';
import { usePrevious } from 'ahooks';

function useMultiEffect(effect, deps) {
  const previousValues = usePrevious(deps);

  useEffect(() => {
    const changedValue = (previousValues || []).reduce(
      (pre, current, index) => {
        if (current !== deps[index]) {
          return pre + 1;
        }
        return pre;
      },
      0,
    );

    if (changedValue === deps.length) {
      effect?.();
    }
  }, [deps]);
}

export default useMultiEffect;
