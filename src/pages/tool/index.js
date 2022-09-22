import React from 'react';
import Container from 'components/Container';
import RichTextPick from './examples/RichTextPick';
import PromiseQueue from './examples/PromiseQueue';
import StorageTool from './examples/StorageTool';
import Skin from './examples/Skin';

export default () => {
  return (
    <Container>
      <RichTextPick />
      <PromiseQueue />
      <Skin />
      <StorageTool />
    </Container>
  );
};
