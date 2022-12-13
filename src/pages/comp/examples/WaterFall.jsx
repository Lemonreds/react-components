import React from 'react';
import Wrapper from 'components/Wrapper';
import Description from 'components/Description';
import WaterFall from 'components/WaterFall';

const colors = ['#8868ff', '#24cdd0', '#ffc84e', '#fe657f', '#748cfd'];

const mockData = new Array(12).fill(true).map((item, index) => ({
  index,
  height: Math.floor(Math.random() * 50 + 50),
  background: colors[index % colors.length],
}));

export default () => {
  return (
    <Wrapper label="WaterFall" time="2022-12-13">
      <WaterFall
        data={mockData}
        render={item => (
          <div
            key={item.index}
            style={{
              height: item.height,
              border: '1px solid #ddd',
              background: item.background,
            }}
          >
            {JSON.stringify(item)}
          </div>
        )}
      />
      <Description>两列瀑布流布局</Description>
    </Wrapper>
  );
};
