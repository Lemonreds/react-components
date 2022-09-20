/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from 'react';
import useMultiEffect from 'hooks/useMultiEffect';
import Wrapper from 'components/Wrapper';
import Description from 'components/Description';
import Button from 'components/Form/Button';

export default () => {
  const [stateA, setStateA] = useState('a');
  const [stateB, setStateB] = useState('b');

  const [now, setNow] = useState(Date.now());

  useMultiEffect(() => {
    setNow(Date.now());
  }, [stateA, stateB]);

  return (
    <Wrapper label="useMultiEffect" time="2022-09-20">
      <p>
        stateA:
        {stateA}
      </p>
      <p>
        stateB:
        {stateB}
      </p>
      <p>
        是否执行了Effect:
        {now}
      </p>

      <Button
        onClick={() => {
          // 修改A
          setStateA(Date.now());
        }}
        style={{ marginRight: 12 }}
      >
        修改State A
      </Button>
      <Button
        onClick={() => {
          // 修改B
          setStateB(Date.now());
        }}
        style={{ marginRight: 12 }}
      >
        修改State B
      </Button>

      <Button
        onClick={() => {
          setStateA(Date.now());
          setStateB(Date.now());
        }}
        style={{ marginRight: 12 }}
      >
        State A 和 State B 一起修改
      </Button>

      <Description>
        useMultiEffect,
        useEffect的扩展，当useEffect的所有依赖项都修改值时，才会触发Effect。
      </Description>
    </Wrapper>
  );
};
