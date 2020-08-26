import React from 'react';
import Space from 'components/Space';
import Wrapper from 'components/Wrapper';
import Description from 'components/Description';
import useVirtual from 'hooks/useVirtual';

const colors = ['#8868ff', '#24cdd0', '#ffc84e', '#fe657f', '#748cfd'];

export default () => {
  const [list1, containerProps1, wrapperProps1] = useVirtual({
    total: 9996,
    height: 280,
    itemHeight: 36,
  });
  const [list, containerProps, wrapperProps] = useVirtual({
    total: 9996,
    height: 280,
    itemHeight: i => (i % 2 === 0 ? 58 : 32),
  });
  return (
    <Wrapper label="useVirtual" time="2020-08-21">
      <p>Item 定高</p>
      <div {...containerProps1}>
        <div {...wrapperProps1}>
          {list1.map(({ style, index }) => (
            <div
              style={{
                ...style,
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
        </div>
      </div>
      <Space />
      <p>Item 不定高</p>
      <div {...containerProps}>
        <div {...wrapperProps}>
          {list.map(({ style, index }) => (
            <div
              style={{
                ...style,
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
        </div>
      </div>

      <Description>useVirtual，无限长列表，支持子项不定高度。</Description>
    </Wrapper>
  );
};
