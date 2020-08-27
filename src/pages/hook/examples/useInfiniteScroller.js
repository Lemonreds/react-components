import React, { useState } from 'react';
import Wrapper from 'components/Wrapper';
import Description from 'components/Description';
import useInfiniteScroller from 'hooks/useInfiniteScroller';

const colors = ['#8868ff', '#24cdd0', '#ffc84e', '#fe657f', '#748cfd'];

const delay = (callback, timeout) =>
  new Promise(resolve => {
    setTimeout(() => resolve(callback()), timeout);
  });

export default () => {
  const [mockList, setMockList] = useState([]);
  const loadMore = () => {
    setLoading(true);
    delay(() => {
      setMockList([...mockList, {}, {}, {}, {}, {}, {}, {}]);
      setLoading(false);
      setHasMore(true);
    }, 1800);
  };

  const [
    { containerProps, loading },
    { setLoading, setHasMore },
  ] = useInfiniteScroller({
    loadMore,
    height: 280,
    initLoadMore: true,
  });

  return (
    <Wrapper label="useInfiniteScroller" time="2020-08-26">
      <div {...containerProps}>
        {mockList.map((_, index) => (
          <div
            style={{
              height: 52,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: colors[index % colors.length],
              borderBottom: '1px solid #e8e8e8',
            }}
            key={index}
          >
            {index + 1}
          </div>
        ))}
        {loading ? <p>加载中...</p> : null}
      </div>

      <Description>
        useInfiniteScroller，列表无限加载组件，滚动到底部后加载新数据。列表底部可以增加loader，loading时自动定位到底部展示loader组件。
      </Description>
    </Wrapper>
  );
};
