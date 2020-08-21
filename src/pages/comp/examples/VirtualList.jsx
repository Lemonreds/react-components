import React from 'react';
import Wrapper from 'components/Wrapper';
import Description from 'components/Description';
import VirtualList from 'components/VirtualList';
// import Links from 'components/Links';

const colors = ['#8868ff', '#24cdd0', '#ffc84e', '#fe657f', '#748cfd'];

export default () => {
  const itemRender = ({ index }) => {
    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#f0f0f0',
          background: colors[index % colors.length],
        }}
      >
        {index}
      </div>
    );
  };

  return (
    <Wrapper label="VirtualList" time="2020-06-26">
      <VirtualList
        total={996}
        unitHeight={90}
        height={400}
        itemRender={itemRender}
        loadMore={null}
        hasMore={false}
        loading={false}
      />
      <Description>
        无限虚拟滚动列表，支持滑倒底部加载更多 ,仅支持列表项目高度一致的长列表，高度不一致可以使用react-virtualized.
      </Description>
    </Wrapper>
  );
};
