import React, { memo, useRef, useEffect, useState } from 'react';
import BScroll from '@better-scroll/core';
import PullDown from '@better-scroll/pull-down';
import Pullup from '@better-scroll/pull-up';

import styles from './PullRefresh.less';

BScroll.use(PullDown);
BScroll.use(Pullup);

const PullRefreshHeader = memo(
  ({ beforePullDown, isPullingDown }) => {
    let text;

    if (beforePullDown) {
      text = '下拉可以刷新';
    } else {
      text = isPullingDown ? '加载中...' : '加载成功';
    }

    return text;
  },
  (prevProps, nextProps) => {
    const { beforePullDown, isPullingDown } = prevProps;
    return (
      beforePullDown === nextProps.beforePullDown &&
      isPullingDown === nextProps.isPullingDown
    );
  },
);

const PullRefreshFooter = memo(
  ({ isPullUpLoad }) => {
    const text = isPullUpLoad ? '加载中....' : '加载更多';
    return text;
  },
  (prevProps, nextProps) => {
    const { isPullUpLoad } = prevProps;
    return isPullUpLoad === nextProps.isPullUpLoad;
  },
);

const TIME_BOUNCE = 800;
const THRESHOLD = 60;
const STOP = 56;

function PullRefresh(props) {
  const { children, refresh, loadMore } = props;
  const wrapperRef = useRef();
  const insRef = useRef(null);

  const [beforePullDown, setBeforePullDown] = useState(true);
  const [isPullingDown, setIsPullingDown] = useState(false);
  const [isPullUpLoad, setIdPullUpload] = useState(false);

  const handlePullingDown = () => {
    setBeforePullDown(false);
    setIsPullingDown(true);
    refresh().then(() => {
      setIsPullingDown(false);
      setTimeout(() => {
        setBeforePullDown(true);
        insRef.current.finishPullDown();
        insRef.current.refresh();
      }, TIME_BOUNCE);
    });
  };

  const handlePullingUp = () => {
    setIdPullUpload(true);
    loadMore().then(() => {
      setIdPullUpload(false);
      insRef.current.finishPullUp();
      insRef.current.refresh();
    });
  };

  useEffect(() => {
    const options = {
      scrollY: true,
      bounceTime: TIME_BOUNCE,
      useTransition: false,
      click: true,
    };
    // 不传入 refresh ,不开启下拉刷新
    if (refresh) {
      options.pullDownRefresh = {
        threshold: THRESHOLD,
        stop: STOP,
      };
    }
    // 不传入 loadMore ,不开启加载更多
    if (loadMore) {
      options.pullUpLoad = true;
    }

    const ins = new BScroll(wrapperRef.current, options);

    insRef.current = ins;

    ins.on('pullingDown', handlePullingDown);
    ins.on('pullingUp', handlePullingUp);
    return () => {
      ins.off('pullingDown', handlePullingDown);
      ins.off('pullingUp', handlePullingUp);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.bswrapper} ref={wrapperRef}>
        <div className={styles.inner}>
          {refresh && (
            <div className={styles.header}>
              <PullRefreshHeader
                beforePullDown={beforePullDown}
                isPullingDown={isPullingDown}
              />
            </div>
          )}

          <div className={styles.children}>{children}</div>
          {loadMore && (
            <div className={styles.footer}>
              <PullRefreshFooter isPullUpLoad={isPullUpLoad} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PullRefresh;
