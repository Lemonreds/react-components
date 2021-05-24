import React from 'react';
import Container from 'components/Container';
import BetterScroll from './examples/betterScroll';
import Swiper from './examples/swiper';
import AliPlayer from './examples/aliPlayer';
import PdfView from './examples/pdf-view';
import Intls from './examples/intl';

const Comps = [BetterScroll, Swiper, AliPlayer, PdfView, Intls];

export default () => <Container comps={Comps} />;
