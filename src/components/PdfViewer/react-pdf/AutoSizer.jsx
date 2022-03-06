import React, { PureComponent } from 'react';
import debounce from 'lodash/debounce';

export default class AutoSizer extends PureComponent {
  handleWindowResize = debounce(() => {
    this.calculateContainerBounds();
  }, 300);

  constructor(props) {
    super(props);

    this.state = {
      sized: {
        width: undefined,
        height: undefined,
      },
    };

    this.dvContainerRef = React.createRef();
  }

  componentDidMount() {
    this.calculateContainerBounds();
    window.addEventListener('resize', this.handleWindowResize, true);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize, true);
  }

  calculateContainerBounds = () => {
    if (this.dvContainerRef == null) {
      return;
    }
    const { width, height } = this.dvContainerRef.current.getBoundingClientRect();
    this.setState({
      sized: { width, height },
    });
  };

  renderContent() {
    const { children } = this.props;
    const { sized } = this.state;

    if (!sized.width || !sized.height) {
      return null;
    }

    return children instanceof Function ? children(sized) : children;
  }

  render() {
    return (
      <div
        className="dv-auto-sizer"
        ref={this.dvContainerRef}
        style={{ width: '100%', height: '100%' }}
      >
        {this.renderContent()}
      </div>
    );
  }
}
