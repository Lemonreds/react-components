import React, { useState, useEffect } from 'react';
import Wrapper from 'components/Wrapper';
import Description from 'components/Description';
import Part from 'components/Part';
import PullRefresh from 'components/BetterScroll/PullRefresh';
import delay from 'utils/delay';

const mockData = [];

for (let i = 0; i < 15; i += 1) {
  mockData.push({
    label: i,
  });
}

export default () => {
  const [data, setData] = useState(mockData);
  useEffect(() => {}, []);

  const refresh = () => {
    return delay(() => {
      setData(mockData);
    }, 1000);
  };

  const loadMore = () => {
    return delay(() => {
      const more = [...data];
      for (let i = 0; i < 5; i += 1) {
        more.push({
          label: data.length + i,
        });
      }
      setData(more);
    }, 1000);
  };

  return (
    <Wrapper label="better-scroll的react封装" time="2021-05-19">
      <Part>使用pull-down/pull-up,下拉刷洗以及底部加载更多的2个插件</Part>
      <div style={{ height: 280 }}>
        <PullRefresh refresh={refresh} loadMore={loadMore}>
          {data.map(item => {
            const { label } = item;
            return (
              <div
                key={label}
                style={{
                  textAlign: 'center',
                  height: 40,
                }}
              >
                {label}
              </div>
            );
          })}
        </PullRefresh>
      </div>
      <Description>better-scroll的demo</Description>
    </Wrapper>
  );
};
