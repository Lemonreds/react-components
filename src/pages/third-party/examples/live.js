import React from 'react';
import Wrapper from 'components/Wrapper';
import Links from 'components/Links';
import Description from 'components/Description';

export default () => {
  return (
    <Wrapper label="live 直播" time="2022-08-24">
      <Links href="https://github.com/Lemonreds/node-live">GITHUB DEMO</Links>
      <br />
      <Description>
        使用Videojs直播的DEMO，包含的推流格式有：flv、hls。
        以及基于nodejs的node-media-server搭建的流媒体服务端，便于前端调试。
      </Description>
    </Wrapper>
  );
};
