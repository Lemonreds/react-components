import React from 'react';
import Wrapper from 'components/Wrapper';
import Description from 'components/Description';
import StorageTool from 'tools/StorageTool';

export default () => {
  StorageTool.set('test', 1996);
  StorageTool.setItem('test2', { name: 'jam', age: 12, skill: ['fe'] });
  StorageTool.set('test3', '666');
  StorageTool.remove('test3');

  const str = `
  StorageTool.set('test', 1996);
  StorageTool.setItem('test2', { name: 'jam', age: 12, skill: ['fe'] });
  StorageTool.set('test3', '123456');
  StorageTool.remove('test3');`;

  return (
    <Wrapper label="StorageTool" time="2020-08-26">
      <pre>{str}</pre>
      <Description>
        StorageTool，localStorage工具，不用再区分引用还是基本类型，统一JSON来存取。
      </Description>
    </Wrapper>
  );
};
