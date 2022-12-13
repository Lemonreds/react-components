import React, { useEffect, useState } from 'react';
import usePrevious from '../../hooks/usePrevious';
import './WaterFall.less';

function WaterFallBaseItem(props) {
  const { children, index } = props;
  return (
    <div className="waterFall-item" data-index={index}>
      {children}
    </div>
  );
}

const WaterFallItem = React.memo(WaterFallBaseItem, (preProps, nextProps) => {
  return preProps.index === nextProps.index;
});

const diffSize = 50;

/**
 *
 * 两列的瀑布流组件
 *
 */
function WaterFall(props) {
  const { data, render } = props;

  const [dataSource, setDataSource] = useState({
    left: [], // 左列数据
    leftIndexs: [], // 左列的真实index
    right: [],
    rightIndexs: [],
    leftHeight: 0, // 左列的所有item总高度
    rightHeight: 0,
    startIndex: 0, // 计算截止的index，避免重复计算
  });

  const previousDataLen = usePrevious(data.length);

  useEffect(() => {
    if (data.length !== previousDataLen) {
      setTimeout(() => {
        layout();
      }, 0);
    }
  }, [previousDataLen]);

  const layout = () => {
    const nodes = document.querySelectorAll('.waterFall-item');
    let {
      left,
      right,
      leftHeight,
      rightHeight,
      startIndex,
      leftIndexs,
      rightIndexs,
    } = dataSource;

    let i;
    for (i = startIndex; i < data.length; i += 1) {
      const h = nodes[i].getBoundingClientRect().height;
      const item = data[i];

      if (leftHeight - diffSize <= rightHeight) {
        left.push(item);
        leftHeight += h;
        leftIndexs.push(i);
      } else {
        right.push(item);
        rightHeight += h;
        rightIndexs.push(i);
      }
    }
    const d = {
      left,
      leftIndexs,
      leftHeight,
      right,
      rightHeight,
      rightIndexs,
      startIndex: i,
    };

    setDataSource(d);
  };

  const renderItem = (list, indexes) => {
    return list.map((item, index) => (
      <WaterFallItem key={index} index={indexes[index] || index}>
        {render(item)}
      </WaterFallItem>
    ));
  };

  return (
    <div className="waterFall">
      <div className="waterFall-left">
        {renderItem(dataSource.left, dataSource.leftIndexs)}
      </div>
      <div className="waterFall-right">
        {renderItem(dataSource.right, dataSource.rightIndexs)}
      </div>
      <div className="waterFall-ready">
        {renderItem(data.slice(dataSource.startIndex), [])}
      </div>
    </div>
  );
}

export default WaterFall;
