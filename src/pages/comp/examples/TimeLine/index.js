/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useRef } from 'react';
import Wrapper from 'components/Wrapper';
import Description from 'components/Description';
import TimeLine from 'components/TimeLine';
import Player from './Player';

// let _hanlders;
export default () => {
  const ref = useRef(null);
  const [state, setState] = useState({ itemState: [] });

  return (
    <Wrapper label="TimeLine" time="2020-06-26">
      <TimeLine
        ref={ref}
        pending
        alternate
        initCurrent={1}
        duration={2}
        onStateChange={_state => {
          setState(_state);
        }}
        width={100}
        color="#1976d2"
        outlined={false}
        style={{ height: 240 }}
      >
        <TimeLine.Item>
          2018
          <br />[{state?.itemState[0]}]
        </TimeLine.Item>
        <TimeLine.Item>
          2019 <br /> [{state?.itemState[1]}]
        </TimeLine.Item>
        <TimeLine.Item>
          2020 <br />[{state?.itemState[2]}]
        </TimeLine.Item>
        <TimeLine.Item>
          2021 <br />[{state?.itemState[3]}]
        </TimeLine.Item>
      </TimeLine>

      <Player
        isPause={state.isPause}
        toPrev={() => {
          ref.current.doPrev();
        }}
        toPlayer={() => {
          if (state.isPause) {
            ref.current.doPlay();
          } else {
            ref.current.doPause();
          }
        }}
        toNext={() => {
          ref.current.doNext();
        }}
        toReset={() => {
          ref.current.doReset();
        }}
      />

      <Description>
        时间线进度条组件，支持播放、重播、暂停、快进、快退。
      </Description>
    </Wrapper>
  );
};
