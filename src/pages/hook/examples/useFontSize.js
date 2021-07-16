import React from 'react';
import Wrapper from 'components/Wrapper';
import Description from 'components/Description';
import Links from 'components/Links';
import Part from 'components/Part';

export default () => {
  return (
    <Wrapper label="useFontSize" time="2021-07-16">
      <Part>android/iOS下的Webview字体缩放方案,如下文章：</Part>
      <Links href="https://juejin.cn/post/6844903507061932040?share_token=6ed3db1d-c789-4111-9c81-5f36c762ba17">
        github/kentcdodds/use-deep-compare-effect
      </Links>

      <Description>该hook可以提取H5页面在andoird/iOS下，字体缩放的比例</Description>
    </Wrapper>
  );
};
