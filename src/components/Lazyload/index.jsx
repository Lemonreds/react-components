import React from 'react';
import Observer from './Observer';

function Lazyload({ width, height, children }) {
  return (
    <Observer>
      {({ inView }) =>
        inView ? (
          children
        ) : (
          // 空占位符
          <div
            style={{
              width: width || 100,
              height: height || 80,
            }}
          />
        )
      }
    </Observer>
  );
}

export default React.memo(Lazyload);
