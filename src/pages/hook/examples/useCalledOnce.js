/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from 'react';
import useCalledOnce from 'hooks/useCalledOnce';
import Wrapper from 'components/Wrapper';
import Description from 'components/Description';

export default () => {
  const [state, setState] = useState('初次状态');
  useCalledOnce(() => {
    setState('更新后的状态');
  });

  return (
    <Wrapper label="useCalledOnce" time="2022-09-20">
      <p>
        state:
        {state}
      </p>

      <Description>
        useCalledOnce, 在函数组件初次渲染前，执行一次，先于生命周期函数didMount.
      </Description>
    </Wrapper>
  );
};
