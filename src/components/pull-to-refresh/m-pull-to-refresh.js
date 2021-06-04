import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import RHeader from './components/RHeader';
import RFooter from './components/RFooter';
import StaticRenderer from './components/StaticRenderer/StaticRenderer';
import {
  willPreventDefault,
  isWebView,
  setTransform,
  RrefshStatus,
  PullUpStatus,
} from './util';
import './m-pull-to-refresh.less';

/**
 *
 * @component a component that support pullDownToRfresh and pullUpToLoadMore
 * @see: https://github.com/react-component/m-pull-to-refresh/blob/master/src/PullToRefresh.tsx
 */
class MPullToRefresh extends React.Component {
  containerRef;

  contentRef;

  to;

  ScreenY;

  startScreenX;

  startScreenY;

  timer;

  dy;

  shouldUpdateChildren = false;

  constructor(props) {
    super(props);
    const { hasMore } = props;
    this.state = {
      hStatus: RrefshStatus.deactivate,
      fStatus: hasMore ? PullUpStatus.init : PullUpStatus.finish,
      dragOnEdge: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.init();
    }, 0);
  }

  shouldComponentUpdate(nextProps) {
    const { children } = this.props;
    this.shouldUpdateChildren = children !== nextProps.children;
    return true;
  }

  componentWillUnmount() {
    const ele = this.containerRef;
    Object.keys(this._to).forEach(key => {
      const handle = this._to[key];
      ele.removeEventListener(key, handle, willPreventDefault);
    });
  }

  init = () => {
    const ele = this.containerRef;
    this._to = {
      touchstart: this.onTouchStart,
      touchmove: this.onTouchMove,
      touchend: this.onTouchEnd,
      touchcancel: this.onTouchEnd,
      scroll: this.onScroll,
    };
    Object.keys(this._to).forEach(key => {
      const handle = this._to[key];
      ele.addEventListener(key, handle, willPreventDefault);
    });
  };

  isEdge = () => {
    const ele = this.containerRef;
    return ele.scrollTop <= 0;
  };

  onTouchStart = e => {
    const { screenX, screenY } = e.touches[0];

    this.startScreenX = screenX;
    this.startScreenY = screenY;
  };

  onTouchMove = e => {
    const { screenX, screenY } = e.touches[0];

    if (Math.abs(screenX - this.startScreenX) > 20 * window.devicePixelRatio) {
      return;
    }

    if (this.startScreenY > screenY) {
      // direction checked
      return;
    }

    if (this.isEdge()) {
      const { dragOnEdge } = this.state;

      if (!dragOnEdge) {
        this.ScreenY = screenY;
        this.startScreenY = screenY;
        this.setState({ dragOnEdge: true });
      }

      const _diff = Math.round(screenY - this.ScreenY);
      const dy = this.easing(_diff);

      this.dy = dy;
      this.setContentStyle(dy);

      const { distanceToRefresh } = this.props;
      const { hStatus } = this.state;

      if (dy < distanceToRefresh) {
        if (hStatus !== RrefshStatus.deactivate) {
          this.setState({ hStatus: RrefshStatus.deactivate });
        }
      } else if (hStatus === RrefshStatus.deactivate) {
        this.setState({ hStatus: RrefshStatus.activate });
      }

      // https://github.com/ant-design/ant-design-mobile/issues/573#issuecomment-339560829
      // iOS UIWebView issue, It seems no problem in WKWebView
      if (isWebView && e.changedTouches[0].clientY < 0) {
        this.onTouchEnd();
      }

      if (e.cancelable) e.preventDefault();
    }
  };

  onTouchEnd = e => {
    const { dragOnEdge, hStatus } = this.state;
    const { refresh } = this.props;

    if (dragOnEdge) {
      this.setState({ dragOnEdge: false });
    }

    if (hStatus === RrefshStatus.activate) {
      this.loading();
      refresh().then(() => {
        this.finish();
      });
    } else {
      this.reset();
    }

    if (e.cancelable) e.preventDefault();
  };

  loading = () => {
    this.setContentStyle(60);
    this.setState({ hStatus: RrefshStatus.release });
  };

  finish = () => {
    this.setState({ hStatus: RrefshStatus.finish }, () => {
      this.timer = setTimeout(() => {
        this.reset();
        this.timer = undefined;
      }, 800);
    });
  };

  reset = () => {
    this.dy = 0;
    this.setContentStyle(0);
  };

  setContentStyle = y => {
    if (this.contentRef) {
      setTransform(this.contentRef.style, `translate3d(0px,${y}px,0)`);
    }
  };

  easing = distance => {
    const { availHeight } = window.screen;
    return (
      (availHeight / 2.5) * Math.sin((distance / availHeight) * (Math.PI / 2))
    );
  };

  onScroll = e => {
    const { hasMore } = this.props;
    const { fStatus } = this.state;

    if (!hasMore || fStatus === PullUpStatus.loading) {
      return;
    }

    const { loadMore, distanceToLoadMore } = this.props;
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const isReachBottom =
      scrollTop + clientHeight >= scrollHeight - distanceToLoadMore;
    if (isReachBottom) {
      this.setState({ fStatus: PullUpStatus.loading });
      loadMore().then(() => {
        this.setState({ fStatus: PullUpStatus.init });
      });
    }
  };

  render() {
    const { className, children, style, hasMore } = this.props;
    const { hStatus, fStatus } = this.state;

    const renderChildren = (
      <StaticRenderer
        shouldUpdate={this.shouldUpdateChildren}
        render={() => children}
      />
    );

    return (
      <div
        className={classnames(className, 'm-refresh-container')}
        ref={ref => {
          this.containerRef = ref;
        }}
        style={style}
      >
        <div
          className={classnames(className, 'm-refresh-body')}
          ref={ref => {
            this.contentRef = ref;
          }}
        >
          <div className="m-refresh-header">
            <RHeader status={hStatus} />
          </div>
          <div className="m-refresh-children">{renderChildren}</div>
          <div className="m-refresh-footer">
            <RFooter status={fStatus} hasMore={hasMore} />
          </div>
        </div>
      </div>
    );
  }
}

MPullToRefresh.propTypes = {
  className: PropTypes.any,
  style: PropTypes.any,
  hasMore: PropTypes.bool,
  distanceToRefresh: PropTypes.number,
  distanceToLoadMore: PropTypes.number,
  refresh: PropTypes.func, // ()=> Promise<any>
  loadMore: PropTypes.func, // ()=> Promise<any>
};

MPullToRefresh.defaultProps = {
  className: '',
  style: {},
  hasMore: true,
  distanceToRefresh: 100,
  distanceToLoadMore: 50,
  refresh: null,
  loadMore: null,
};

export default MPullToRefresh;
