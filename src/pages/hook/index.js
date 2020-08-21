import React from 'react';
import UseVirtual from './examples/useVirtual';
import UseOnScreen from './examples/useOnScreen';
import UseRouter from './examples/useRouter';

import styles from './index.less';

export default () => {
  return (
    <div className={styles.root}>
      <UseVirtual />
      <UseOnScreen />
      <UseRouter />
    </div>
  );
};
