import { useState } from 'react';
import { useUnmountedRef } from 'ahooks';
import { useSpring, animated } from '@react-spring/web';
import './Mask.less';

const classPrefix = `dropdown-mask`;

const Mask = props => {
  const [active, setActive] = useState(props.visible);
  const unmountedRef = useUnmountedRef();
  const { opacity } = useSpring({
    opacity: props.visible ? 1 : 0,
    config: {
      precision: 0.01,
      mass: 1,
      tension: 200,
      friction: 30,
      clamp: true
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
      //   ref={ref}
      style={{
        opacity,
        ...props.style,
        display: active ? 'unset' : 'none'
      }}
      onClick={props.onMaskClick}
    >
      {props.children}
    </animated.div>
  );
};

export default Mask;
