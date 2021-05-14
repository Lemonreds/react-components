import React from 'react';
import Container from 'components/Container';
import Swiper from './examples/swiper';
import AliPlayer from './examples/aliPlayer';
import PdfView from './examples/pdf-view';

const Comps = [Swiper, AliPlayer, PdfView];

export default () => <Container comps={Comps} />;
