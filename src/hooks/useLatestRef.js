import { useRef, useEffect } from 'react';

const useLatestRef = params => {
  const ref = useRef(params);

  useEffect(() => {
    ref.current = params;
  }, [params]);

  return ref;
};

export default useLatestRef;
