import { useRef } from 'react';

function useCalledOnce(effect) {
  const calledRef = useRef(false);

  if (!calledRef.current) {
    effect?.();
    calledRef.current = true;
  }
}

export default useCalledOnce;
