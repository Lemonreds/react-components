import React from 'react';
import { Route } from 'react-router-dom';

export default function(props) {
  return (
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
      404 :)
      <a href="/comp">to ComponentPage</a>
    </div>
  );
}
