import React from 'react';
import Description from 'components/Description';
import Wrapper from 'components/Wrapper';
import ChinaMap from './ChinaMap';
import Bar from './Bar';

export default () => {
  return (
    <Wrapper label="Echarts" time="-">
      <ChinaMap />
      <Description> [2020-06-26] Echarts的中国地图配置和撒点分布</Description>

      <Bar />
      <Description> [2020-07-02] Echarts的双轴柱状图基础配置</Description>
    </Wrapper>
  );
};
