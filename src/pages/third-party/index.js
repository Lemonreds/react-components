import React from 'react';
import Container from 'components/Container';
import Live from './examples/live';
import RCFastMarquee from './examples/react-fast-marquee';
import PullToRefresh from './examples/m-pull-to-refresh';
import StaticRenderer from './examples/staticRenderer';
import BetterScroll from './examples/betterScroll';
import Swiper from './examples/swiper';
import AliPlayer from './examples/aliPlayer';
import RCPDF from './examples/rc-pdf';
import PdfView from './examples/pdf-view';
import Intls from './examples/intl';

const Comps = [
  Live,
  RCFastMarquee,
  PullToRefresh,
  StaticRenderer,
  BetterScroll,
  Swiper,
  AliPlayer,
  RCPDF,
  PdfView,
  Intls,
];

export default () => <Container comps={Comps} />;
