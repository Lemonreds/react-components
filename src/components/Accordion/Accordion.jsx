import React, { cloneElement, useState, useRef, useEffect } from 'react';
import cn from 'classnames';
import styles from './Accordion.less';

const ifClassnames = (condition, classname) => (condition ? classname : null);

function Accordion({ title, index, children, onExpand, defaultExpand }) {
  const ref = useRef(null);
  const [expand, setExpand] = useState(defaultExpand);
  const [height, setHeight] = useState(0);

  // 保存内容的实际高度
  useEffect(() => {
    setHeight(ref.current.clientHeight);
  }, []);

  // 点击展开
  const onClick = () => {
    const next = !expand;
    setExpand(next);
    if (onExpand) onExpand(next);
  };

  return (
    <div
      className={cn(
        styles.accordion,
        ifClassnames(expand, styles.expandContainer),
      )}
    >
      <div className={styles.wrapper} onClick={onClick}>
        <div className={cn(styles.title, styles.expandTitle)}>
          {title || index}
        </div>
      </div>
      <div
        className={cn(styles.content)}
        style={{ height: expand ? height : 0 }}
      >
        <div
          ref={ref}
          className={cn(
            styles.children,
            ifClassnames(expand, styles.expandChildren),
          )}
        >
          <div className={styles.inner}>{children}</div>
        </div>
      </div>
    </div>
  );
}

Accordion.Container = ({ style, classname, children, onExpand }) => {
  const _chilren = Array.isArray(children) ? children : [children];
  return (
    <div className={cn(classname, styles.container)} style={style}>
      {_chilren.map((child, index) =>
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
