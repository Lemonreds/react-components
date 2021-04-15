import React, { useState } from 'react';
import classnames from 'classnames';

function FeedBack(props) {
  const {
    activeStyle,
    activeClassName,
    style,
    className,
    children,
    ...rest
  } = props;
  const [isFeedBack, set] = useState(false);

  let mergedStyle = { ...style };

  if (isFeedBack) mergedStyle = { ...mergedStyle, ...activeStyle };

  return React.cloneElement(children, {
    ...children.props,
    style: mergedStyle,
    className: classnames(
      className,
      isFeedBack ? [activeClassName] : undefined,
    ),
    onMouseDown: () => set(true),
    onMouseUp: () => set(false),
    onMouseMove: () => set(false),
    onTouchStart: () => set(true),
    onTouchMove: () => set(false),
    onTouchEnd: () => set(false),
    ...rest,
  });
}

export default FeedBack;
