import React from 'react';
import styles from './Loading.less';

const spans = [0, 1, 2, 3, 4];

function Loading() {
  return (
    <div className={styles.root}>
      {spans.map(span => (
        <span
          className={styles.span}
          key={span}
          style={{
            animationDelay: `${span * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
}

export default React.memo(Loading);
