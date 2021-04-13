import React, { useRef, useState, useEffect } from 'react';

const sizedWrapper = ele => {
  const { clientWidth, scrollWidth } = ele || {};
  return { clientWidth, scrollWidth };
};

const measureText = text => {
  return document
    .createElement('canvas')
    .getContext('2d')
    .measureText(text).width;
};

const getEllipsisText = (text, maxWidth) => {
  const start = 0;
  let end = text.length - 1;
  let subText;
  while (start <= end) {
    subText = text.slice(0, end - 3); // 每次计算减少3个字符，相应减少计算次数

    if (measureText(subText) <= maxWidth) {
      break;
    }

    end -= 1;
  }
  return subText;
};

const TextEllipsis = ({ value, style }) => {
  const wrapperRef = useRef(null);
  const [text, setText] = useState(value);
  const [ellipsis, setEllipsis] = useState(false);

  useEffect(() => {
    if (text.length > 0) {
      const { clientWidth, scrollWidth } = sizedWrapper(wrapperRef.current);
      if (clientWidth < scrollWidth) {
        const subText = getEllipsisText(text, clientWidth);
        setText(subText);
        setEllipsis(value.length > subText.length);
      }
    }
  }, [text]);

  const wrapperStyle = {
    width: '100%',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    ...style,
  };

  return (
    <div ref={wrapperRef} style={wrapperStyle}>
      {text}
      {ellipsis && '...'}
    </div>
  );
};

export default TextEllipsis;
