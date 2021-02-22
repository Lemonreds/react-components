import React from 'react';
import styles from './DynamicTest.less';

function DynamicTest() {
  return (
    <div className={styles.root}>
      <p>我是被动态加载进来的组件</p>
      <p>
        可以看到network中的单独加载了这个组件的chunk [DynamicTest.js]
        以及其样式文件
      </p>
    </div>
  );
}

export default DynamicTest;
