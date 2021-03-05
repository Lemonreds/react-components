import React from 'react';
import Container from 'components/Container';
import UseResizeObserver from './examples/useResizeObserver';
import UseDraggable from './examples/useDraggable';
import UseFullScreen from './examples/useFullScreen';
import UseVirtual from './examples/useVirtual';
import UseOnScreen from './examples/useOnScreen';
import UseRouter from './examples/useRouter';
import UseInfiniteScroller from './examples/useInfiniteScroller';
import UseTable from './examples/useTable';

const Comps = [
  UseResizeObserver,
  UseDraggable,
  UseFullScreen,
  UseTable,
  UseInfiniteScroller,
  UseVirtual,
  UseOnScreen,
  UseRouter,
];

export default () => <Container comps={Comps} />;
