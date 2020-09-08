import React from 'react';
import Wrapper from 'components/Wrapper';
import Description from 'components/Description';
import HorizontalScroller from 'components/HorizontalScroller';

export default () => {
  return (
    <Wrapper label="HorizontalScroller" time="2020-09-08">
      <HorizontalScroller>
        <div
          style={{
            width: 3699,
            height: 200,
          }}
        >
          With above code example, we are sure that we combined three lifecycles
          in one function useEffect. These lifecycles are componentDidUpdate ,
          componentDidMount, componentWillUnmount. Adding return statement is
          optional in useEffect that means clean up work is optional and depends
          upon the use cases. If we use multiple useEffect, then they will
          execute with the same order as per declaration. Giving correct second
          argument we can optimize the performance of useEffect. useEffect will
          trigger only if the specified second argument is changed. The code
          execution in useEffe ct happens asynchronously. There is another hook
          similar to useEffect but that works in synchronous way. It called as
          useLayoutEffect. As the execution of useLayoutEffect happens
          synchronously it can block visual update for some time before call
          completes. So it should be used in very specific usecases and standard
          useEffect is preferred in common usecases. There is one more hook
          which can used in debug and with third party libraries such as Redux.
          It is called as useDebugValue to display a label for custom hooks.
        </div>
      </HorizontalScroller>
      <Description>
        水平滚动容器，允许滑轮默认滚动Y轴禁用默认行为，改为滚动X轴。
      </Description>
    </Wrapper>
  );
};
