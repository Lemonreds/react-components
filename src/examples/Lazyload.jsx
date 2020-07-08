import React from 'react';
import Wrapper from 'components/Wrapper';
import Description from 'components/Description';
import Lazyload from 'components/Lazyload';

export default () => {
  return (
    <Wrapper label="Lazyload" time="2020-07-06">
      <Lazyload width={200} height={200}>
        <pre>
          这一段文字会出现在 rootMargin: 50px 25px 50px 25px，触发
          IntersectionObserver 事件的时候。
        </pre>
      </Lazyload>
      <Description>
        基于浏览器API IntersectionObserver的Lazyload组件，可用于懒加载图片。
      </Description>
    </Wrapper>
  );
};
