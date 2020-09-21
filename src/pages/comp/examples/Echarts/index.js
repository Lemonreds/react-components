import React from 'react';
// import Description from 'components/Description';
import Wrapper from 'components/Wrapper';
import Part from 'components/Part';
import ChinaMap from './ChinaMap';
import Bar from './Bar';

export default () => {
  return (
    <Wrapper label="Echarts" time="-">
      <Part>[2020-06-26] Echarts的中国地图配置和撒点分布</Part>
      <ChinaMap />
      <Part>[2020-07-02] Echarts的双轴柱状图基础配置</Part>
      <Bar />
    </Wrapper>
  );
};
