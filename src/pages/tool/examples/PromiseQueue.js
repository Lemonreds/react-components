import React, { useRef, useState, useEffect } from 'react';
import Wrapper from 'components/Wrapper';
import Description from 'components/Description';
import PromiseQueue from 'tools/PromiseQueue';
import delay from 'utils/delay';

export default () => {
  const promiseQueueRef = useRef();
  const [state, setState] = useState();

  useEffect(() => {
    const promiseQueue = new PromiseQueue({
      watcher: {
        afterFinished: (values, index) => {
          setState(`完成了 ${index + 1}`);
          promiseQueue.loadNext();
        },
        afterRemoved: index => {
          setState(`删除了 ${index + 1}`);
          promiseQueue.loadNext();
        },
        catchError: (err, index) => {
          setState(`发生错误 ${index + 1}`);
          promiseQueue.loadNext();
        },
      },
    });

    promiseQueueRef.current = promiseQueue;

    init();
  }, []);

  const init = () => {
    const promiseFns = new Array(10).fill(1).map((_, index) => {
      return () => delay(() => {}, 1000);
    });
    promiseQueueRef.current.add(...promiseFns);
    promiseQueueRef.current.loadNext();
  };

  return (
    <Wrapper label="Promise 串行队列" time="2022-09-20">
      <p>初始化10个Promise,每个1s后fullfilled</p>
      <p>{state}</p>
      <Description>
        Promise
        串行队列，当上一个promise结束后，新的promise才会执行，支持新增、删除。
      </Description>
    </Wrapper>
  );
};
