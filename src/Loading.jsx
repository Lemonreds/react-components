import React from 'react';

const Loading = () => (
  <div
    style={{
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      background: '#fff',
      zIndex: '999',
      color: '#d23669',
      fontSize: '18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    正在加载.... :)
  </div>
);

export default Loading;
