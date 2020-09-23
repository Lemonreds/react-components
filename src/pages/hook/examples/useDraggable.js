/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react';
import Wrapper from 'components/Wrapper';
import Description from 'components/Description';
import useDraggable from 'hooks/useDraggable';
import Links from 'components/Links';
import Part from 'components/Part';
import styles from './useDraggable.less';

export default () => {
  const ref = useRef(null);
  const ref2 = useRef(null);

  const [label, set] = useState('Drag Element base');
  const [pos, setPos] = useState({ x: 20, y: 10 });
  const [pos2, setPos2] = useState({ x: 20, y: 100 });
  const [pos3, setPos3] = useState({ x: 280, y: 100 });

  const [pos4, setPos4] = useState({ x: 100, y: 0 });

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

  const [props5] = useDraggable(
    ref2,
    {
      onMouseMove: ({ x, y }) => {
        let _x = x;
        // 临界值控制
        if (_x < 50) _x = 50;
        if (_x > 500) _x = 500;
        setPos4({ x: _x, y });
      },
    },
    { overbound: false },
  );

  return (
    <Wrapper label="useDraggable" time="2020-09-23" className={styles.root}>
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
        两栏布局的伸缩控制，Left元素容器的宽度范围设置为 [50,500]，避免坍缩 
      </Part>
      <div ref={ref2} className={styles.e2container}>
        <div
          className={styles.e2left}
          style={{
            width: pos4.x,
          }}
        >
          left
          <div className={styles.handler} {...props5}>
            》
          </div>
        </div>
        <div
          className={styles.e2right}
          style={{
            width: 550 - pos4.x,
          }}
        >
          right
        </div>
      </div>

      <Description>useDraggable，使容器内的DOM元素变得可拖拽。</Description>
    </Wrapper>
  );
};
