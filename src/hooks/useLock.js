import { useRef } from 'react';
import { useMemoizedFn } from 'ahooks';

function useLock() {
  const lockStateRef = useRef(false);

  const lock = useMemoizedFn(() => {
    lockStateRef.current = true;
  });

  const unLock = useMemoizedFn(() => {
    lockStateRef.current = false;
  });

  return [lockStateRef, { lock, unLock }];
}

export default useLock;
