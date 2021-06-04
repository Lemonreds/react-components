import React, { memo } from 'react';
import { RrefshStatus } from '../../util';

import styles from './RHeader.less';

const RHeader = props => {
  const { status } = props;

  let child = null;

  switch (status) {
    case RrefshStatus.deactivate:
      child = <span>下拉可以刷新</span>;
      break;
    case RrefshStatus.release:
      child = <span>刷新中</span>;
      break;
    case RrefshStatus.activate:
      child = <span>释放可以刷新</span>;
      break;
    case RrefshStatus.finish:
      child = <span>刷新完成</span>;
      break;
    default:
      break;
  }

  return <div className={styles.rheader}>{child}</div>;
};

const areEqual = (prevProps, nextProps) => {
  const { status } = prevProps;
  return status === nextProps.status;
};

export default memo(RHeader, areEqual);
