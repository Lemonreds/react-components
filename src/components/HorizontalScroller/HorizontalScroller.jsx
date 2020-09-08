import React, { useRef, useEffect } from 'react';

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
      e.preventDefault();
    };

    ref.current.addEventListener('mousewheel', onXScroll, {
      passive: false,
    });
    return () => {
      ref.current.removeEventListener('mousewheel', onXScroll, {
        passive: false,
      });
    };
  }, []);

  return (
    <div ref={ref} style={{ overflowX: 'scroll' }}>
      {children}
    </div>
  );
}

export default React.memo(HorizontalScroller);
