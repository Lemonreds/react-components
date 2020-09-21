import React, { useState } from 'react';
import Wrapper from 'components/Wrapper';
import Description from 'components/Description';
import Input from 'components/Form/Input';
import Part from 'components/Part';
import Captha from 'components/Captha';

export default () => {
  const [c1, setC1] = useState('');
  const [value, setIn] = useState('');

  return (
    <Wrapper label="Captha" time="2020-09-21">
      <Part>
        验证状态 :
        {value === c1 ? 'Success' : 'fail'}
      </Part>
      <Captha
        onChange={cap => {
          setC1(cap);
        }}
      />
      <Input
        defaultValue=""
        value={value}
        placeholder="请输入验证码"
        onChange={val => {
          setIn(val);
        }}
        style={{ width: 220 }}
      />
      <Part>其他配置</Part>
      <Captha
        width={320}
        height={80}
        count={8}
        lineCount={20}
        pointCount={25}
        fontSize={40}
      />
      <Captha height={80} colors={['#000', '#333']} />
      <Captha
        datasets={'这是一个普通的验证码组件'.split('')}
        width={320}
        height={80}
        fontSize={22}
      />
      <Captha lineCount={0} height={80} pointCount={0} fontSize={12} />
      <Description>
        [2020-09-21]
        Captha，基于Canvas的一个验证码组件，支持配置随机内容、个数、颜色、干扰线（点）个数等。
      </Description>
    </Wrapper>
  );
};
