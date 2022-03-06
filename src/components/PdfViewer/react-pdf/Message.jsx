import React, { PureComponent } from 'react';

class Message extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <div
        className="react-pdf-message"
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#fff',
        }}
      >
        {children}
      </div>
    );
  }
}

export default Message;
