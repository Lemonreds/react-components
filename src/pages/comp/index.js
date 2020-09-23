import React from 'react';
import Container from 'components/Container';
import Loading from './examples/Loading';
import Captha from './examples/Captha';
import Form from './examples/Form';
import HorizontalScroller from './examples/HorizontalScroller';
import TimeLine from './examples/TimeLine';
import Echarts from './examples/Echarts';
import VirtualList from './examples/VirtualList';
import Tabs from './examples/Tabs';
import Lazyload from './examples/Lazyload';

const Comps = [
  Captha,
  Form,
  HorizontalScroller,
  TimeLine,
  Echarts,
  VirtualList,
  Tabs,
  Lazyload,
  Loading,
];

export default () => <Container comps={Comps} />;
