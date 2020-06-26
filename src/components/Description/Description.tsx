import React from 'react';
import cn from 'classnames';
import styles from './Description.less';

type Props = {
  children: JSX.Element;
  className: string;
};

class Description extends React.Component<Props, {}> {
  render() {
    const { children, className } = this.props;
    return <div className={cn(styles.root, className)}>{children}</div>;
  }
}

export default Description;
