import React from 'react';
// import { Redirect } from 'react-router-dom';
// import { Route } from 'react-router-dom';
import styles from './styles.less';

export default function() {
  return (
    <div className={styles.root}>
      404
      <div className={styles.line} />
      The page is not found
    </div>
  );
}
