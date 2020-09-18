import React from 'react';
import cn from 'classnames';
import useValueChange from 'hooks/useValueChange';
import styles from './Switch.less';

function Switch(props) {
  const [value, setValue] = useValueChange(props);

  const toggle = () => {
    setValue(!value);
  };

  return (
    <div className={styles.root}>
      <div
        onClick={toggle}
        className={cn(styles.container, value ? styles.on : styles.off)}
      >
        <span className={styles.slider} />
      </div>
    </div>
  );
}

export default Switch;
