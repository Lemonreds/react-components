import React from 'react';
import { observe, unobserve } from './IntersectionObserver';
/**
  @desc IntersectionObserver监听组件
  @by lmh
  @at 2020-07-06
 */
class Observer extends React.PureComponent {
  state = { inView: false };

  ref = React.createRef();

  componentDidMount() {
    observe(this.ref.current, (/** element */) => {
      this.setState({ inView: true });
    });
  }

  componentWillUnmount() {
    unobserve(this.ref.current);
    this.ref = null;
  }

  render() {
    const { inView } = this.state;
    const { children } = this.props;
    return (
      <div ref={this.ref}>
        {children instanceof Function && children({ inView })}
      </div>
    );
  }
}

export default Observer;
