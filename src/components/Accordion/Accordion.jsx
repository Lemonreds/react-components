import React, { cloneElement, useState, useRef } from 'react';
import { Transition } from 'react-transition-group';
import cn from 'classnames';
import styles from './Accordion.less';

const durationTime = 220;

const transitionStyles = height => ({
  entering: {
    height,
    overflow: 'hidden',
  },
  entered: {
    height,
    overflow: 'visible',
    visibility: 'visible',
  },
  exiting: {},
  exited: {
    height: 0,
    visibility: 'hidden',
  },
});

function Accordion({ title, children, onExpand }) {
  const ref = useRef(null);
  const [expand, setExpand] = useState(false);

  const handleToggle = () => {
    const next = !expand;
    setExpand(next);
    if (onExpand) onExpand(next);
  };

  return (
    <div className={styles.accordion}>
      <div className={styles.wrapper} onClick={handleToggle}>
        <div className={styles.title}>{title}</div>
      </div>
      <Transition in={expand} timeout={durationTime}>
        {state => {
          const size = ref && ref.current ? ref.current.clientHeight : 0;
          return (
            <div
              className={styles.content}
              transition-name={state}
              style={{
                height: 0,
                overflow: 'hidden',
                ...transitionStyles(size)[state],
              }}
            >
              <div className={styles.inner} ref={ref}>
                {children}
              </div>
            </div>
          );
        }}
      </Transition>
    </div>
  );
}

Accordion.Container = ({ style, classname, children, onExpand }) => {
  return (
    <div className={cn(classname, styles.container)} style={style}>
      {(Array.isArray(children) ? children : [children]).map((child, index) =>
        cloneElement(child, {
          ...child.props,
          key: index,
          index,
          onExpand: isExpand => onExpand && onExpand(index, isExpand),
        }),
      )}
    </div>
  );
};

export default Accordion;
