import React from 'react';
// import { Route } from 'react-router-dom';

export default function() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        background: 'var(--bg)',
        zIndex: '999',
        color: 'var(--primary)',
        fontSize: '18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      404，咩都无啦~ :)
      <a href="/comp">【穿梭回去】</a>
    </div>
  );
}
