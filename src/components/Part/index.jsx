import React from 'react';
import styles from './styles.less';

export default ({ children }) => {
  return <div className={styles.root}>{children}</div>;
};
