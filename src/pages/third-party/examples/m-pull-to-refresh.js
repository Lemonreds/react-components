import React from 'react';
import Wrapper from 'components/Wrapper';
import Links from 'components/Links';
import Description from 'components/Description';

export default () => {
  return (
    <Wrapper label="m-pull-to-refresh" time="2021-06-24">
      
      <Links href="https://lemonreds.github.io/demo/m-pull-to-refresh/index.html">
        LIVE DEMO
      </Links>
      <br />
      <Links href="https://github.com/Lemonreds/m-pull-to-refresh">
        Github Repo
      </Links>
      <Description>一个支持下拉刷新、上拉加载的 React 移动端组件。</Description>
    </Wrapper>
  );
};
