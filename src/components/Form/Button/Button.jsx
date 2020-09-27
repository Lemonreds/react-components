import React, { useRef, useEffect } from 'react';
import styles from './Button.less';

// 根据鼠标事件以及容器计算偏移位置
// 添加一个水波纹span标签到targetDom
// 动画结束后，清空这个标签
// TODO: 可以试试react-dom
const addRippleDom = (e, containerDom, targetDom) => {
  const rect = containerDom.getBoundingClientRect();
  const { x, y } = { x: e.clientX - rect.left, y: e.clientY - rect.top };

  const span = document.createElement('span');
  span.className = styles.unit;
  span.style.left = `${x}px`;
  span.style.top = `${y}px`;
  targetDom.appendChild(span);

  const h = setTimeout(() => {
    targetDom.removeChild(span);
    clearTimeout(h);
  }, 450);
  return h;
};

const varname = '--ripple-color';

function Button({ children, style, onClick, rippleColor ,...rest }) {
  const container = useRef(null);
  const target = useRef(null);

  useEffect(() => {
    if (rippleColor) {
      const dom = container.current;
      dom.style.setProperty(varname, rippleColor);
    }
  }, []);

  const onButtonClick = e => {
    addRippleDom(e, container.current, target.current);
    if (onClick instanceof Function) {
      onClick(e);
    }
  };

  return (
    <button
      ref={container}
      className={styles.root}
      type="button"
      onClick={onButtonClick}
      style={style}
      {...rest}
    >
      <span className={styles.children}>{children}</span>
      <span className={styles.ripple} ref={target} />
    </button>
  );
}

export default Button;
