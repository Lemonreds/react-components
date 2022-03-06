import React, { PureComponent } from 'react';
import './VirtualPageControl.less';

class VirtualPageControl extends PureComponent {
  render() {
    const { currentPage, numPages } = this.props;

    if (!currentPage || !numPages) {
      return null;
    }

    return (
      <div className="dv-virtual-page-control">
        <span className="dv-virtual-page-text">{`${currentPage}/${numPages}`}</span>
      </div>
    );
  }
}

export default VirtualPageControl;
