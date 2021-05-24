import * as React from 'react';

/**
 * 手动触发react的更新时机
 */

export default class StaticRenderer extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.shouldUpdate;
  }

  render() {
    const { render } = this.props;
    return render();
  }
}
