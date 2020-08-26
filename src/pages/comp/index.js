import React from 'react';
import Container from 'components/Container';
import TimeLine from './examples/TimeLine';
import Echarts from './examples/Echarts';
import VirtualList from './examples/VirtualList';
import Tabs from './examples/Tabs';
import Lazyload from './examples/Lazyload';

export default () => {
  return (
    <Container>
      <TimeLine />
      <Echarts />
      <VirtualList />
      <Tabs />
      <Lazyload />
    </Container>
  );
};
