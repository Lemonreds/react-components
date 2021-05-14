import React from 'react';
import Wrapper from 'components/Wrapper';
import Description from 'components/Description';
import { Swiper, SwiperSlide } from '@/components/SwiperWrap';

const colors = ['#8868ff', '#24cdd0', '#ffc84e', '#fe657f', '#748cfd'];

export default () => {
  return (
    <Wrapper label="Swiper.js" time="2021-05-14">
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        height={300}
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

      <Description>使用 Swiper.js/react 一个实例</Description>
    </Wrapper>
  );
};
