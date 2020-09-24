/* eslint-disable no-param-reassign */
import React, { useRef, useEffect, useState } from 'react';
import styles from './Captha.less';

// 默认的颜色
const COLORS = [
  '#2E57C9',
  '#04c56f',
  '#f39538',
  '#b757dc',
  '#e26d6d',
  '#8868ff',
  '#24cdd0',
  '#ffc84e',
  '#fe657f',
  '#748cfd',
];

// 角度转弧度
const getAngle = degree => (degree * Math.PI) / 180;

// 获取 [start-end] 范围内的随机数
const getRan = (start, end) =>
  Math.floor(Math.random() * (end - start + 1) + start);

// 获取 colors 内的任意颜色
const getRanColor = colors => colors[getRan(0, colors.length)];

// 默认的随机数
const DATASETS = 'A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0'.split(
  ',',
);

const draw = (
  ctx,
  strs,
  { width, height, colors, fontSize, lineCount, pointCount },
) => {
  // clear previous
  ctx.clearRect(0, 0, width, height);

  // drawText
  ctx.font = `bold ${fontSize}px Arial`;
  ctx.textBaseline = 'middle';

  const pl = width / (strs.length + 2);
  strs.forEach((c, i) => {
    const x = pl * (i + 1);
    const y = height / 2 + getRan(0, 6);
    const deg = getAngle(getRan(0, 30));
    const color = getRanColor(colors);

    ctx.fillStyle = color;
    ctx.translate(x, y);
    ctx.rotate(deg);
    ctx.fillText(c, 0, 0);
    ctx.rotate(-deg);
    ctx.translate(-x, -y);
  });
  // draw  points
  for (let i = 0; i < pointCount; i += 1) {
    const x = getRan(0, width);
    const y = getRan(0, height);

    ctx.strokeStyle = getRanColor(colors);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 1, y + 1);
    ctx.stroke();
  }
  // draw lines
  for (let i = 0; i < lineCount; i += 1) {
    ctx.strokeStyle = getRanColor(colors);
    ctx.beginPath();
    ctx.moveTo(getRan(0, width), getRan(0, height));
    ctx.lineTo(getRan(0, width), getRan(0, height));
    ctx.stroke();
  }
};

const getRanCaptha = (count, datasets) =>
  new Array(count)
    .fill(null)
    .map(() => datasets[getRan(0, datasets.length - 1)]);

/**
 * @hook Captha
 * @desc 验证码组件
 * @by lmh
 * @at 2020/09/21
 * @ref https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D
 * */
function Captha({
  style,
  width = 180, // 宽度
  height = 60, // 高度
  colors = COLORS, // 随机的颜色列表
  datasets = DATASETS, // 随机的验证码列表
  count = 4, // 个数
  fontSize = 32, // 字体大小
  lineCount = 5, // 干扰线个数
  pointCount = 20, // 干扰点个数
  onChange = captha => captha, // 验证码更新后的回调
}) {
  const [captha, setCaptha] = useState(getRanCaptha(count, datasets));
  const canvas = useRef(null);
  const context = useRef(null);

  useEffect(() => {
    context.current = canvas.current.getContext('2d');
  }, []);

  useEffect(() => {
    toDraw();

    if (onChange instanceof Function) {
      onChange(captha.join(''));
    }
  }, [captha]);

  const toDraw = () =>
    draw(context.current, captha, {
      width,
      height,
      colors,
      fontSize,
      lineCount,
      pointCount,
    });
  const reDraw = () => setCaptha(getRanCaptha(count, datasets));

  return (
    <canvas
      ref={canvas}
      width={width}
      height={height}
      style={style}
      className={styles.root}
      onClick={reDraw}
    />
  );
}
export default Captha;
