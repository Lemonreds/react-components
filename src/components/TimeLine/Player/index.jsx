import React from "react";
import cn from "classnames";
import pauseIcon from "assets/TimeLine/map-pause.svg";
import playerIcon from "assets/TimeLine/map-player.svg";
import prevIcon from "assets/TimeLine/map-prev.svg";

import styles from "./styles.less";

function Player({ className, stop, toPrev, toNext, toPlayer }) {
  return (
    <div className={cn(styles.root, className)}>
      <img
        className={styles.prev}
        src={prevIcon}
        alt="player"
        onClick={toPrev}
      />
      <img
        className={styles.player}
        src={stop ? pauseIcon : playerIcon}
        alt="player"
        onClick={toPlayer}
      />
      <img
        className={cn(styles.prev, styles.reverse)}
        src={prevIcon}
        alt="player"
        onClick={toNext}
      />
    </div>
  );
}

export default Player;
