import { useState } from 'react';
import { useUnmountedRef } from 'ahooks';
import { useSpring, animated } from '@react-spring/web';
import './Body.less';

const classPrefix = `dropdown-body`;

const Body = props => {
  const [active, setActive] = useState(props.visible);
  const unmountedRef = useUnmountedRef();
  const { percent } = useSpring({
    percent: props.visible ? 0 : 100,
    config: {
      precision: 0.1,
      mass: 0.4,
      tension: 300,
      friction: 30
    },
    onStart: () => {
      setActive(true);
    },
    onRest: () => {
      if (unmountedRef.current) return;
      setActive(props.visible);
      if (props.visible) {
        props.afterShow?.();
      } else {
        props.afterClose?.();
      }
    }
  });

  return (
    <animated.div
      className={classPrefix}
      style={{
        ...props.bodyStyle,
        transform: percent.to(v => {
          // only Support top
          return `translate(0, -${v}%)`;
        })
      }}
      //   ref={ref}
    >
      {props.children}
    </animated.div>
  );
};

export default Body;
