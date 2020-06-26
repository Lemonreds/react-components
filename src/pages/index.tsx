import React from 'react';
import TimeLine from 'examples/TimeLine';
import Echarts from 'examples/Echarts';
import VirtualList from 'examples/VirtualList';
import styles from './index.less';

export default () => {
  return (
    <div className={styles.root}>
      <TimeLine />
      <Echarts />
      <VirtualList />
    </div>
  );
};
