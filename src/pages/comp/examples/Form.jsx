import React from 'react';
import Wrapper from 'components/Wrapper';
import Description from 'components/Description';
import Part from 'components/Part';
import Input from 'components/Form/Input';
import Switch from 'components/Form/Switch';
import Button from 'components/Form/Button';
import Slider from 'components/Form/Slider';

export default () => {
  return (
    <Wrapper label="Form" time="-">
      <Part>滑动条</Part>
      <p style={{ margin: '16px 0' }}>有初始值，不设置步长</p>
      <Slider min={100} max={1680} defaultValue={1000} />
      <p style={{ margin: '16px 0' }}>有初始值，且最小步长为10</p>
      <Slider min={0} max={100} defaultValue={20} step={10} />
      <p style={{ margin: '16px 0' }}>无初始值，且最小步长为3</p>
      <Slider min={-50} max={100} step={3} />
      <p style={{ margin: '16px 0' }}>完全受控，不允许修改</p>
      <Slider min={0} max={200} value={86} />
      <Description>
        [2020-09-22]
        滑动条，基于mousemove、mouseup、onMouseDown等事件实现的拖拽，支持设置范围，步长，点击等
      </Description>
      <Part>按钮</Part>
      <Button>提交</Button>
      <Button
        style={{
          marginTop: 12,
          marginLeft: 24,
          color: 'rgb(77, 81, 100)',
          background: 'rgb(199, 240, 210)',
        }}
        rippleColor="rgb(210, 54, 105)"
      >
        红色波纹
      </Button>
      <Description>
        [2020-09-21] 模仿 Material Design
        的水波纹按钮，主要使用CSS动画实现，支持通过CSS变量的方式来修改水波纹颜色。
      </Description>
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
      <Description>
        [2020-09-17] 模仿 Material Design 的 Input组件，主要使用CSS动画实现。
      </Description>
      <Part>开关</Part>
      <Switch />
      <Switch value style={{ marginLeft: 10 }} />
      <Description> [2020-09-17] Switch，开关组件</Description>
    </Wrapper>
  );
};
