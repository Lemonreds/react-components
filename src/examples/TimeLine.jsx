import React from 'react';
import Wrapper from 'components/Wrapper';
import Description from 'components/Description';
import TimeLine from 'components/TimeLine';

export default () => {
  return (
    <Wrapper label="TimeLine" time="2020-06-26">
      <TimeLine
        datas={['2017', '2018', '2019', '2020']}
        unitWidth={100}
        duration={2}
      />
      <Description>
        时间线进度条组件，支持播放、重播、暂停、快进、快退。
      </Description>
    </Wrapper>
  );
};
