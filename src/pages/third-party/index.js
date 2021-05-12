import React from 'react';
import Container from 'components/Container';
import AliPlayer from './examples/aliPlayer';
import PdfView from './examples/pdf-view';

const Comps = [AliPlayer, PdfView];

export default () => <Container comps={Comps} />;
