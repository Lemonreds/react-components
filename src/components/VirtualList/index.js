import React, { Component } from 'react';
import PropTypes from 'prop-types';
import equal from 'fast-deep-equal';
import styles from './styles.less';

const overflowItems = 4;

class VList extends Component {
  state = { offset: 0, inBottom: false };

  ref = React.createRef();

  componentDidUpdate(preProps, preState) {
    const { loading } = this.props;
    const { inBottom } = this.state;
    if (!equal(inBottom, preState.inBottom)) {
      if (inBottom) {
        this.onMore();
      }
    }

    if (!equal(loading, preProps.loading)) {
      if (loading) {
        this.slideToBottom();
      }
    }
  }

  renderChildren = () => {
    const { itemRender, unitHeight } = this.props;
    const { startIndex, length } = this.calcParams();

    const t = [];
    for (let i = 0; i < length; i += 1) {
      const index = startIndex + i;
      t.push(
        <div
          key={index}
          className={styles.child}
          style={{
            position: 'absolute',
            left: 0,
            top: `${index * unitHeight}px`,
            width: '100%',
            height: unitHeight,
          }}
        >
          {itemRender instanceof Function && itemRender({ index })}
        </div>,
      );
    }

    return t;
  };

  calcParams = () => {
    const { total, height, unitHeight } = this.props;
    const { offset } = this.state;
    const length = Math.floor(height / unitHeight) + overflowItems;
    return {
      startIndex:
        offset + length > total
          ? offset - Math.abs(total - (offset + length))
          : offset,
      length,
    };
  };

  onMore = () => {
    const { loadMore, hasMore, loading } = this.props;

    if (loadMore instanceof Function && !loading && hasMore) {
      loadMore();
    }
  };

  onScroll = () => {
    const { current } = this.ref;
    if (current) {
      const { scrollTop, scrollHeight, clientHeight } = current;
      // update offset
      const { unitHeight } = this.props;
      const offset = Math.floor(scrollTop / unitHeight);
      // watch inBottom
      const { threshold } = this.props;
      const inBottom = scrollTop + clientHeight > scrollHeight - threshold;
      this.setState({ offset, inBottom });
    }
  };

  slideToBottom = () => {
    const { current } = this.ref;
    if (current) {
      const { scrollHeight } = current;
      current.scrollTop = scrollHeight;
    }
  };

  slideToTop = () => {
    const { current } = this.ref;
    if (current) {
      current.scrollTop = 0;
    }
  };

  render() {
    const { height, unitHeight, total } = this.props;

    return total && height ? (
      <div
        ref={this.ref}
        className={styles.root}
        onScrollCapture={this.onScroll}
        style={{ height, maxHeight: unitHeight * total }}
      >
        <div className={styles.inner} style={{ height: unitHeight * total }}>
          {this.renderChildren()}
        </div>
      </div>
    ) : null;
  }
}

VList.propTypes = {
  itemRender: PropTypes.func,
  unitHeight: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  total: PropTypes.number,
  threshold: PropTypes.number,
  loadMore: PropTypes.func,
  hasMore: PropTypes.bool,
  loading: PropTypes.bool,
};

VList.defaultProps = {
  itemRender: ({ index }) => index,
  total: 0,
  threshold: 50,
  loadMore: null,
  hasMore: false,
  loading: false,
};

export default VList;
