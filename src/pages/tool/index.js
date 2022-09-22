import React from 'react';
import Container from 'components/Container';
import PromiseQueue from './examples/PromiseQueue';
import StorageTool from './examples/StorageTool';
import Skin from './examples/Skin';

export default () => {
  return (
    <Container>
      <PromiseQueue />
      <Skin />
      <StorageTool />
    </Container>
  );
};
