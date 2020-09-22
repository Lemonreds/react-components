import React from 'react';
import styles from './index.less';

export default ({ comps, children }) => {
  return (
    <div className={styles.root}>
      {comps ? comps.map((Comp, i) => <Comp key={i} />) : children}
    </div>
  );
};
