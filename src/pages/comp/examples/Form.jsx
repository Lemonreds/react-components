import React from 'react';
import Wrapper from 'components/Wrapper';
import Description from 'components/Description';
import Part from 'components/Part';
import Input from 'components/Form/Input';
import Switch from 'components/Form/Switch';

export default () => {
  //   const [input, onInputChange] = useState('');

  return (
    <Wrapper label="Form" time="-">
      <Part>输入框</Part>
      <Input
        defaultValue=""
        placeholder="请输入内容"
        // onChange={onInputChange}
        style={{ width: 220 }}
      />
      <Input
        defaultValue=""
        placeholder="带边框的 Input"
        // onChange={onInputChange}
        bordered
        style={{ width: 220, marginTop: 24 }}
      />
      <Description> [2020-09-17] 模仿 Material Design 的 Input组件</Description>
      <Part>开关</Part>
      <Switch />
      <Switch value style={{ marginLeft: 10 }} />
      <Description> [2020-09-17] Switch，开关组件</Description>
    </Wrapper>
  );
};
