import React, { useRef } from 'react';
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

function Button({ children, onClick }) {
  const container = useRef(null);
  const target = useRef(null);

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
    >
      <span className={styles.children}>{children}</span>
      <span className={styles.ripple} ref={target} />
    </button>
  );
}

export default Button;
