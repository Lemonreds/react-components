import React, { PureComponent } from 'react';

import Page from './Page';

class VirtualPage extends PureComponent {
  render() {
    const { index, style: propsStyle } = this.props;

    const pageNumber = index + 1;

    const style = {
      ...propsStyle,
      width: '100%',
    };

    return (
      <div
        className="dv-page"
        data-page-key={`page_${pageNumber}`}
        key={`page_${pageNumber}`}
        style={style}
      >
        <Page pageNumber={pageNumber} />
      </div>
    );
  }
}

export default VirtualPage;
