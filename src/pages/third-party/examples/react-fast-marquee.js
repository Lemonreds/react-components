import React from 'react';
import Wrapper from 'components/Wrapper';
import Description from 'components/Description';
import Links from 'components/Links';
import Marquee from 'components/react-fast-marquee';

export default () => {
  return (
    <Wrapper label="react-fast-marquee 文字跑马灯" time="2022-02-15">
      <Marquee>
        Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed erat
        diam, blandit eget felis aliquam, rhoncus varius urna. Donec tellus
        sapien, sodales eget ante vitae, feugiat ullamcorper urna. Praesent
        auctor dui vitae dapibus eleifend. Proin viverra mollis neque, ut
        ullamcorper elit posuere eget.
      </Marquee>

      <Links href="https://github.com/justin-chu/react-fast-marquee">
        react-fast-marquee github
      </Links>

      <Description>修改了部分代码，兼容了IE11。</Description>
    </Wrapper>
  );
};
