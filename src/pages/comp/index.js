import React from 'react';
import Container from 'components/Container';
import MarQuee from './examples/MarQuee';
import FeedBack from './examples/FeedBack';
import TextEllipsis from './examples/TextEllipsis';
import Accordion from './examples/Accordion';
import createLoadable from './examples/createLoadable';
import Loading from './examples/Loading';
import Captha from './examples/Captha';
import Form from './examples/Form';
import HorizontalScroller from './examples/HorizontalScroller';
import TimeLine from './examples/TimeLine/index';
import Echarts from './examples/Echarts';
import VirtualList from './examples/VirtualList';
import Tabs from './examples/Tabs';
import Lazyload from './examples/Lazyload';

const Comps = [
  MarQuee,
  FeedBack,
  TextEllipsis,
  Accordion,
  createLoadable,
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
