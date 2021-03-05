import React, { useState, useEffect } from 'react';
import Wrapper from 'components/Wrapper';
import Description from 'components/Description';
import useResizeObserver from 'hooks/useResizeObserver';
import Button from 'components/Form/Button';

export default () => {
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(200);
  const [ref, changedTarget] = useResizeObserver();

  useEffect(() => {
    // console.log(changedTarget);
  }, [changedTarget]);
  return (
    <Wrapper label="useResizeObserver" time="2021-03-04">
      <div
        ref={ref}
        style={{ width, height, background: 'rgb(251, 233, 235)' }}
      />

      <p>{changedTarget && JSON.stringify(changedTarget.contentRect)}</p>

      <div style={{ margin: '24px 0' }}>
        <Button
          onClick={() => setWidth(300 + Math.random() * 100)}
          style={{ width: 200 }}
        >
          修改任意宽度
        </Button>

        <Button
          onClick={() => setHeight(200 + Math.random() * 100)}
          style={{ width: 200, marginLeft: 12 }}
        >
          修改任意高度
        </Button>
      </div>

      <Description>
        useResizeObserver，基于ResizeObserver监听元素宽度高度以及位置的变化
      </Description>
    </Wrapper>
  );
};
