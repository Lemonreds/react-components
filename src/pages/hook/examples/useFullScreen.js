/* eslint-disable no-unused-vars */
import React, { useRef } from 'react';
import Wrapper from 'components/Wrapper';
import Description from 'components/Description';
import useFullScreen from 'hooks/useFullScreen';
import Links from 'components/Links';
import waller from 'assets/useFullScreen/waller.jpg';

export default () => {
  const ref = useRef();
  const [isFullScreen, { toggle, request, exit }] = useFullScreen(ref);
  return (
    <Wrapper label="useFullScreen" time="2020-09-01">
      <img
        src={waller}
        alt="1"
        ref={ref}
        // onClick={isFullScreen ? exit : request}
        onClick={toggle}
        style={{ width: '100%', height: '320px', cursor: 'pointer' }}
      />
      <Description>
        useFullScreen，基于
        <Links
          href="https://github.com/sindresorhus/screenfull.js/blob/master/src/screenfull.js"
          text="screenfull"
        />
        的元素全屏hook，简单进行了封装;
      </Description>
    </Wrapper>
  );
};
