import React from 'react';
import Wrapper from 'components/Wrapper';
import Description from 'components/Description';
import Links from 'components/Links';

export default () => {
  return (
    <Wrapper label="react-pdf" time="2022-03-14">
      https://github.com/Lemonreds/react-pdf-p2
      <Description>
        基于 react-pdf 的修改，增加了虚拟滚动的逻辑（react-window）,优化了大文件
        PDF 下的体验。
        <Links
          href="https://www.npmjs.com/package/react-window"
          text="react-window"
        />
      </Description>
    </Wrapper>
  );
};
