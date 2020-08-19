import React from 'react';
import TimeLine from 'examples/TimeLine';
import Echarts from 'examples/Echarts';
import VirtualList from 'examples/VirtualList';
import RangePicker from 'examples/RangePicker';
import Tabs from 'examples/Tabs';
import Lazyload from 'examples/Lazyload';
import styles from './index.less';

export default () => {
  return (
    <div className={styles.root}>
      <RangePicker />
      <TimeLine />
      <Echarts />
      <VirtualList />
      <Tabs />
      <Lazyload /> 
    </div>
  );
};
