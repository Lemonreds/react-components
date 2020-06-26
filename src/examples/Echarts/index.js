import React from 'react';
import Description from 'components/Description';
import Wrapper from 'components/Wrapper';
import ChinaMap from './ChinaMap';

export default () => {
  return (
    <Wrapper label="Echarts" time="2020-06-26">
      <ChinaMap />
      <Description>Echarts的中国地图配置和撒点分布</Description>
    </Wrapper>
  );
};
