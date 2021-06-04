import React, { useState } from 'react';
import Wrapper from 'components/Wrapper';
import Description from 'components/Description';
import Part from 'components/Part';
import Links from 'components/Links';
import PullToRefresh from 'components/pull-to-refresh';

export default () => {
  const [hasMore, setHasMore] = useState(true);
  const [pageNum, setPageNum] = useState(1);

  return (
    <Wrapper label="移动端 - PullToRefresh" time="2021-06-04">
      <Part>
        由于是监听的移动端事件 touchstart,touchmove,touchend,
        所以需要开启浏览器的移动端设备调试。
      </Part>
      <PullToRefresh
        style={{
          height: 500,
          marginBottom: 20,
          overflow: 'auto',
          border: '1px solid #ccc',
        }}
        refresh={() => {
          return new Promise(resolve => {
            setTimeout(() => {
              resolve();
            }, 800);
          });
        }}
        distanceToRefresh={90}
        distanceToLoadMore={50}
        loadMore={() => {
          return new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (pageNum + 1 === 3) {
                setHasMore(false);
              }
              setPageNum(pageNum + 1);
            }, 800);
          });
        }}
        hasMore={hasMore}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
          <div key={i} style={{ textAlign: 'center', padding: 20 }}>
            item
            {i}
          </div>
        ))}
      </PullToRefresh>
      <Description>
        PullToRefresh (仅支持移动端),修改了antd-mobile的下拉刷新组件,
        <Links href="https://www.npmjs.com/package/rmc-pull-to-refresh">
          rmc-pull-to-refresh
        </Links>
        主要是修改了以下功能:
        <br />
        1: 支持上拉加载;
        <br />
        2: 抽离头部、尾部的指示器，可以支持自定义;
        <br />
        3: 支持下拉刷新后回弹，刷新完成后延迟回弹;
        <br />
        4: 修改了计算滑动距离的函数(用了easing);
        <br />
      </Description>
    </Wrapper>
  );
};
