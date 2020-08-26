import React from 'react';
import styles from './index.less';

export default ({ children }) => {
  return <div className={styles.root}>{children}</div>;
};
