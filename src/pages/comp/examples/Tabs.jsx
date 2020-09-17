import React from 'react';
import Wrapper from 'components/Wrapper';
import Description from 'components/Description';
import Tabs from 'components/Tabs';

const colors = ['#8868ff', '#24cdd0', '#ffc84e', '#fe657f', '#748cfd'];

export default () => {
  return (
    <Wrapper label="Tabs" time="2020-07-02">
      <Tabs tabs={colors} style={{ width: 504, height: 150, margin: '0 auto' }}>
        {color => (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: color,
            }}
          >
            {color}
          </div>
        )}
      </Tabs>
      <Description>
        Tabs组件，关键CSS是 white-space: nowrap; 实现，小程序端的自定义Navigation-Bar也可以用此方法实现。
      </Description>
    </Wrapper>
  );
};
