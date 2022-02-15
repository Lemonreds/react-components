import React from 'react';
import Container from 'components/Container';
import RCFastMarquee from './examples/react-fast-marquee';
import PullToRefresh from './examples/m-pull-to-refresh';
import StaticRenderer from './examples/staticRenderer';
import BetterScroll from './examples/betterScroll';
import Swiper from './examples/swiper';
import AliPlayer from './examples/aliPlayer';
import PdfView from './examples/pdf-view';
import Intls from './examples/intl';

const Comps = [
  RCFastMarquee,
  PullToRefresh,
  StaticRenderer,
  BetterScroll,
  Swiper,
  AliPlayer,
  PdfView,
  Intls,
];

export default () => <Container comps={Comps} />;
