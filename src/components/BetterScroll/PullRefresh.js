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
    const ins = new BScroll(wrapperRef.current, {
      scrollY: true,
      bounceTime: TIME_BOUNCE,
      useTransition: false,
      pullDownRefresh: {
        threshold: THRESHOLD,
        stop: STOP,
      },
      pullUpLoad: true,
    });

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
          <div className={styles.header}>
            <PullRefreshHeader
              beforePullDown={beforePullDown}
              isPullingDown={isPullingDown}
            />
          </div>
          <div className={styles.children}>{children}</div>
          <div className={styles.footer}>
            <PullRefreshFooter isPullUpLoad={isPullUpLoad} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PullRefresh;
