/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react';
import Wrapper from 'components/Wrapper';
import Description from 'components/Description';
import useDraggable from 'hooks/useDraggable';
import Links from 'components/Links';
import Part from 'components/Part';
import DraggleLayout from 'components/DraggleLayout';

export default () => {
  const ref = useRef(null);

  const [label, set] = useState('Drag Element base');
  const [pos, setPos] = useState({ x: 20, y: 10 });
  const [pos2, setPos2] = useState({ x: 20, y: 100 });
  const [pos3, setPos3] = useState({ x: 280, y: 100 });

  const [width, setWidth] = useState(50);

  const [props, isDragging] = useDraggable(
    ref,
    {
      onMouseMove: ({ x, y }) => {
        setPos({ x, y });
        set('Drag Element moving');
      },
      onMouseDown: e => set('Drag Element start'),
      onMouseUp: () => set('Drag Element stop'),
    },
    { overbound: false },
  );

  const [props3] = useDraggable(
    ref,
    { onMouseMove: ({ x, y }) => setPos2({ x, y }) },
    { overbound: false },
  );

  const [props4] = useDraggable(
    ref,
    { onMouseMove: ({ x, y }) => setPos3({ x, y }) },
    { overbound: true },
  );

  return (
    <Wrapper label="useDraggable" time="2020-09-23">
      <Part>基础使用，是否允许拖拽DOM溢出容器</Part>
      <div
        ref={ref}
        style={{
          width: 400,
          height: 220,
          margin: '0 auto',
          border: '1px solid #efefef',
          position: 'relative',
        }}
      >
        <div
          {...props}
          style={{
            width: 60,
            height: 60,
            background: 'rgb(199, 240, 210)',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #efefef',
            position: 'absolute',
            userSelect: 'none',
            left: pos.x,
            top: pos.y,
          }}
        >
          {label}
        </div>
        <div
          {...props3}
          style={{
            width: 100,
            height: 110,
            background: '#fbe9eb',
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #efefef',
            userSelect: 'none',
            position: 'absolute',
            left: pos2.x,
            top: pos2.y,
          }}
        >
          DragEle 不允许拖拽出容器
        </div>
        <div
          {...props4}
          style={{
            width: 85,
            height: 65,
            background: 'rgb(210, 54, 105)',
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #efefef',
            userSelect: 'none',
            position: 'absolute',
            left: pos3.x,
            top: pos3.y,
          }}
        >
          DragEle 允许拖拽出容器
        </div>
      </div>
      <Part>
        两栏布局的伸缩控制，Left元素容器的宽度范围设置为
        [50,500]，避免坍缩，当前宽度[
        {width}
        px]
      </Part>
      <DraggleLayout
        containerWidth={550}
        containerHeight={220}
        min={50}
        max={500}
        initLeftWidth={100}
        onWidthChange={w => setWidth(w)}
        handler={
          <div
            style={{
              width: 4,
              height: '100%',
              background: 'rgb(77, 81, 100)',
            }}
          />
        }
      >
        <div
          style={{
            backgroundColor: `rgb(36, 205, 208)`,
            color: `#fff`,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          left
        </div>
        <div
          style={{
            backgroundColor: `rgb(116, 140, 253)`,
            color: `#fff`,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          right
        </div>
      </DraggleLayout>

      <Description>useDraggable，使容器内的DOM元素变得可拖拽。</Description>
    </Wrapper>
  );
};
