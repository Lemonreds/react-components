import React from 'react';
import Wrapper from 'components/Wrapper';
import Description from 'components/Description';
import useVirtual from 'hooks/useVirtual';

const colors = ['#8868ff', '#24cdd0', '#ffc84e', '#fe657f', '#748cfd'];

export default () => {
  const [list, containerProps, wrapperProps] = useVirtual({
    total: 996,
    height: 520,
    // itemHeight: 52,
    itemHeight: i => {
      if (i % 2 === 0) return 86;
      return 50;
    },
  });

  return (
    <Wrapper label="useVirtual" time="2020-08-21">
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
