/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react';
import Wrapper from 'components/Wrapper';
import Description from 'components/Description';
import useDraggable from 'hooks/useDraggable';
import Links from 'components/Links';

export default () => {
  const ref = useRef(ref);

  const [label, set] = useState('Drag Element base');
  const [pos, setPos] = useState({ x: 20, y: 10 });
  const [pos2, setPos2] = useState({ x: 20, y: 100 });
  const [pos3, setPos3] = useState({ x: 280, y: 100 });

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

      <Description>useDraggable，使容器内的DOM元素变得可拖拽。</Description>
    </Wrapper>
  );
};
