import React from 'react';
import cn from 'classnames';
import pauseIcon from 'assets/TimeLine/map-pause.svg';
import playerIcon from 'assets/TimeLine/map-player.svg';
import prevIcon from 'assets/TimeLine/map-prev.svg';
import resetIcon from 'assets/TimeLine/map-reset.svg';

import styles from './styles.less';

function Player({ className, isPause, toPrev, toNext, toPlayer, toReset }) {
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
        src={isPause ? pauseIcon : playerIcon}
        alt="player"
        onClick={toPlayer}
      />
      <img
        className={cn(styles.prev, styles.reverse)}
        src={prevIcon}
        alt="player"
        onClick={toNext}
      />
      <img
        className={styles.reset}
        src={resetIcon}
        alt="reset"
        onClick={toReset}
      />
    </div>
  );
}

export default Player;
