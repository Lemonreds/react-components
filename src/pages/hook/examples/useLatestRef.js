/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from 'react';
import Wrapper from 'components/Wrapper';
import Description from 'components/Description';
import useLatestRef from 'hooks/useLatestRef';
import Button from 'components/Form/Button';

export default () => {
  const [state, setState] = useState('2021');
  const stateRef = useLatestRef(state);

  useEffect(() => {
    const hanlde = () => {
      document.getElementById('test_hook').innerText = `
        原来的: ${state}
        使用了useLatestRef: ${stateRef.current}
        `;
    };

    document.addEventListener('test_hook', hanlde);
    return () => {
      document.removeEventListener('test_hook', hanlde);
    };
  }, []);

  const dispatchEvent = () => {
    setState(2021 + Math.random());
    setTimeout(() => {
      document.dispatchEvent(new Event('test_hook'));
    }, 0);
  };

  return (
    <Wrapper label="useLatestRef" time="2021-07-16">
      <p>
        state:
        {state}
      </p>

      <p>
        document.addEventListener(`test_hook`, hanlde):
        <p id="test_hook">-</p>
      </p>
      <Button onClick={dispatchEvent}>
        document.dispatchEvent(new Event(`test_hook`))
      </Button>
      <Description>
        useLatestRef，为了解决react函数组件闭包陷阱问题，即：在函数组件useEffect中,通过addEventListener绑定的事件函数
        中，取到的函数state永远是初始值，而不是最新的值。useLatestRef通过useRef来处理这种问题。
      </Description>
    </Wrapper>
  );
};
