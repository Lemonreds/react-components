import React, { useReducer, useEffect } from 'react';
import cn from 'classnames';
import { off, on } from 'utils/dom';
import debounce from 'lodash.debounce';
import icon from 'assets/BackToTop/arrow-to-up.png';
import styles from './BackToTop.less';

const totop = (offsetTop = 0, target = window) => {
  target.scrollTo({
    top: offsetTop,
    behavior: 'smooth',
  });
};

const reducer = (state, action) => {
  switch (action) {
    case 'show':
      return styles.leftIn;
    case 'hide':
      return styles.rightOut;
    default:
      return styles.init;
  }
};

function BackToTop() {
  const [classname, dispatch] = useReducer(reducer, '');

  useEffect(() => {
    const handler = debounce(() => {
      const action = document.documentElement.scrollTop > 800 ? 'show' : 'hide';
      dispatch(action);
    }, 300);
    on(window, 'scroll', handler);
    return () => {
      off(window, 'scroll', handler);
    };
  }, []);

  return (
    classname && (
      <div className={cn(styles.root, classname)} onClick={totop}>
        <img src={icon} alt="" width={24} height={24} />
      </div>
    )
  );
}
export default BackToTop;
