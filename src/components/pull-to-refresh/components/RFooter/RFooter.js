import React, { memo } from 'react';
import { PullUpStatus } from '../../util';

import styles from './RFooter.less';

const RFooter = props => {
  const { status, hasMore } = props;

  let child = null;

  console.log(status, hasMore);

  if (hasMore) {
    switch (status) {
      case PullUpStatus.init:
        child = <span>上拉可以加载更多</span>;
        break;
      case PullUpStatus.loading:
        child = <span>加载中...</span>;
        break;
      default:
      case PullUpStatus.finish:
        child = <span>没有更多数据</span>;
        break;
    }
  } else {
    child = <span>没有更多数据</span>;
  }

  return <div className={styles.rfooter}>{child}</div>;
};

const areEqual = (prevProps, nextProps) => {
  const { status, hasMore } = prevProps;
  return status === nextProps.status && hasMore === nextProps.hasMore;
};

export default memo(RFooter, areEqual);
