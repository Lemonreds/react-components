import React from 'react';
import cn from 'classnames';
import styles from './Tabs.less';

type Props = {
  children: (tab: any) => JSX.Element;
  tabs: any[];
  onActive?: (activeIndex: int) => void;
  style?: object;
};

type State = {
  activeIndex: int;
};

class Tabs extends React.Component<Props, State> {
  state = { activeIndex: 0 };

  onActive = index => {
    this.setState({ activeIndex: index }, this.trigger);
  };

  trigger = () => {
    const { onActive } = this.props;
    const { activeIndex } = this.state;

    if (onActive) {
      onActive(activeIndex);
    }
  };

  render() {
    const { children, style, tabs } = this.props;
    const { activeIndex } = this.state;

    return (
      <div className={styles.root} style={style}>
        <div className={styles.tabs}>
          {tabs.map((item, key) => (
            <div
              className={styles.item}
              key={String(key)}
              onClick={() => this.onActive(key)}
            >
              {item}
            </div>
          ))}
        </div>

        <div
          className={styles.pages}
          style={{
            transform: `translate3d(${-activeIndex * 100}%, 0px, 0px)`,
          }}
        >
          {tabs.map((item, index) => (
            <div
              className={cn(
                styles.page,
                index === activeIndex ? styles.active : styles.inactive,
              )}
              key={index}
            >
              {children(item)}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Tabs;

export { Tabs };
