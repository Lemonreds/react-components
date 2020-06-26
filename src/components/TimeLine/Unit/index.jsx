import React from "react";
import cn from "classnames";
import bind from "utils/bind";
import STATUS from "./status";

import styles from "./styles.less";

const classnameMap = {
  [STATUS.INIT]: styles.init,
  [STATUS.RUN]: styles.run,
  [STATUS.COMPLETE]: styles.complete,
  [STATUS.PAUSE]: styles.pause,
};

class Unit extends React.Component {
  ref = React.createRef();

  unbind = null;

  componentDidMount() {
    const { current } = this.ref;
    const { width } = this.props;
    this.unbind = bind(current, (e) => {
      const { clientWidth } = e.target;
      if (clientWidth === width) {
        const { onComplete } = this.props;
        onComplete();
      }
    });
  }


  componentWillUnmount() {
    this.unbind();
  }

  render() {
    const { status, width, label, duration } = this.props;

    return (
      <div className={styles.root}>
        <div className={styles.dark} style={{ width }}>
          <div
            ref={this.ref}
            className={cn(styles.light, classnameMap[status])}
            style={{ animationDuration: `${duration}s` }}
          />
        </div>
        {label && (
          <div
            className={cn(
              styles.point,
              status === STATUS.COMPLETE ? styles.active : ""
            )}
          >
            <span className={styles.label}>{label}</span>
          </div>
        )}
      </div>
    );
  }
}

export default Unit;
