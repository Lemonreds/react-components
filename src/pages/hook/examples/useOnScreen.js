import React, { useRef } from 'react';
import Wrapper from 'components/Wrapper';
import Description from 'components/Description';
import useOnScreen from 'hooks/useOnScreen';

export default () => {
  const ref = useRef();
  const [visible] = useOnScreen(ref);

  return (
    <Wrapper label="useOnScreen" time="2020-08-21">
      <div ref={ref}>{visible ? '你看见我了' : '没有 你还没没看见'}</div>

      <Description>
        useOnScreen，当组件进入可视区域时候触发，可用于图片和组件的懒加载。
      </Description>
    </Wrapper>
  );
};
