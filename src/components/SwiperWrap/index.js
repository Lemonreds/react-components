import SwiperCore, { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.less';
import 'swiper/components/pagination/pagination.less';

import './SwiperWrap.less';

SwiperCore.use([Autoplay, Pagination]);

export { Swiper, SwiperSlide };
