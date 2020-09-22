import { useRef } from 'react';
import { off, on, getEventPosition } from 'utils/dom';
import useMount from './useMount';

/**
 * @hook useDraggable
 * @desc 使得DOM变得可拖拽
 * @at 2020/09/22
 * @by lmh
 * */
const useDraggable = (
  container = document.body,
  { onMouseDown, onMouseUp, onMouseMove },
) => {
  const isDragging = useRef(null);
  const ref = useRef(null);

  useMount(() => {
    const mouseMove = e => {
      if (isDragging.current) {
        if (onMouseMove) {
          const position = getEventPosition(container?.current ?? container, e);
          onMouseMove(position);
        }
      }
    };
    const mouseUp = e => {
      isDragging.current = false;
      if (onMouseUp) onMouseUp(e);
    };

    on(window, 'mousemove', mouseMove);
    on(window, 'mouseup', mouseUp);
    return () => {
      off(window, 'mousemove', mouseMove);
      off(window, 'mouseup', mouseUp);
    };
  });

  const props = {
    ref,
    onMouseDown: e => {
      isDragging.current = true;
      if (onMouseDown) onMouseDown(e);
    },
  };

  return [props, isDragging];
};

export default useDraggable;
