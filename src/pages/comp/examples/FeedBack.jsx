import React from 'react';
import Wrapper from 'components/Wrapper';
import Description from 'components/Description';
import Part from 'components/Part';
import FeedBack from 'components/FeedBack';

export default () => {
  return (
    <Wrapper label="FeedBack" time="2021-04-15">
      <Part>按钮</Part>
      <FeedBack
        activeStyle={{
          background: 'gray',
          color: '#fff',
        }}
      >
        <button type="button">按钮</button>
      </FeedBack>
      <Part>其他</Part>
      <FeedBack
        activeStyle={{
          background: 'gray',
          color: '#fff',
        }}
      >
        <p>时维九月，序属三秋。潦水尽而寒潭清，烟光凝而暮山紫。</p>
      </FeedBack>
      <Description>
        [2021-04-15]
        FeedBack，点击反馈效果组件。点击某个组件后，为组件增加active样式，提供一个反馈效果，适用PC端和移动端。
      </Description>
    </Wrapper>
  );
};
