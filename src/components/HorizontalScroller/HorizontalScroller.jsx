import React, { useRef, useEffect } from 'react';
import { on } from 'utils';

function HorizontalScroller({
  children,
  disabled = false,
  speed = 0.4,
  onScroll,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const onXScroll = e => {
      if (disabled) return;
      ref.current.scrollLeft += speed * e.deltaY;
      if (onScroll instanceof Function) {
        onScroll(e, ref.current);
      }
      // use passive
      // ref: https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener
      e.preventDefault();
    };
    return on(ref.current, 'mousewheel', onXScroll, { passive: false });
  }, []);

  return (
    <div ref={ref} style={{ overflowX: 'scroll' }}>
      {children}
    </div>
  );
}

export default React.memo(HorizontalScroller);
