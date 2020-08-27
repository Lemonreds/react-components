import React from 'react';
import Container from 'components/Container';
import UseVirtual from './examples/useVirtual';
import UseOnScreen from './examples/useOnScreen';
import UseRouter from './examples/useRouter';
import UseInfiniteScroller from './examples/useInfiniteScroller';
import UseTable from './examples/useTable';

export default () => (
  <Container>
    <UseTable />
    <UseInfiniteScroller />
    <UseVirtual />
    <UseOnScreen />
    <UseRouter />
  </Container>
);
