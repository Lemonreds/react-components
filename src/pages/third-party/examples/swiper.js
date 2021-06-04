import React from 'react';
import Wrapper from 'components/Wrapper';
import Description from 'components/Description';
import SwiperTabs from '@/components/SwiperWrap/Tabs';
import { Swiper, SwiperSlide } from '@/components/SwiperWrap';

const colors = ['#8868ff', '#24cdd0', '#ffc84e', '#fe657f', '#748cfd'];

const tabs = [
  { title: 'Tab - 0', key: '0' },
  { title: 'Tab - 1', key: '1' },
  { title: 'Tab - 2', key: '2' },
  { title: 'Tab - 3', key: '3' },
  { title: 'Tab - 4', key: '4' },
  { title: 'Tab - 5', key: '5' },
  { title: 'Tab - 6', key: '6' },
  { title: 'Tab - 7', key: '7' },
  { title: 'Tab - 8', key: '8' },
];

export default () => {
  return (
    <Wrapper label="Swiper.js" time="-">
      <SwiperTabs tabs={tabs} page={2}>
        {new Array(tabs.length).fill(true).map((_, index) => {
          return (
            <div
              style={{
                background: colors[(colors.length - index) % colors.length],
                height: 220,
                fontSize: 14,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {index}
            </div>
          );
        })}
      </SwiperTabs>
      <Description>[2021-05-26] 基于Swiper封装的Tabs组件</Description>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        height={220}
      >
        {new Array(colors.length).fill(true).map((_, index) => {
          return (
            <SwiperSlide key={index}>
              <div
                style={{
                  background: colors[index],
                  height: 300,
                  fontSize: 14,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {index}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Description>[2021-05-14] 基础轮播图</Description>
    </Wrapper>
  );
};
