import React from 'react';
import styles from './DynamicTest.less';

function DynamicTest() {
  return (
    <div className={styles.root}>
      <p>动态加载组件内容</p>
      <p>可以看到network中的JS文件部分单独加载了这个组件的chunk [DynamicTest.js]</p>
    </div>
  );
}

export default DynamicTest;
