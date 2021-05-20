import React, { useRef, useImperativeHandle } from 'react';
import { skinLayout } from './util';
import './Player.less';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  config?: any;
  onInstance?: (player: any) => void;
}

interface IHandle {
  init?: () => void;
  getAliPlayerInstance?: () => any;
}

const Player: React.FC<IProps> = React.forwardRef<IHandle, IProps>(
  ({ id, config, onInstance, ...rest }, pRef) => {
    const player = useRef(null);

    useImperativeHandle(
      pRef,
      () => {
        return {
          getAliPlayerInstance: () => player.current,
          init: () => {
            if (window.Aliplayer) {
              new window.Aliplayer(
                {
                  id,
                  skinLayout,
                  ...config,
                },
                (_player: any) => {
                  player.current = _player;
                  window.console.log('init player success');
                  if (onInstance) {
                    onInstance(player.current);
                  }
                },
              );
            }
          },
        };
      },
      [],
    );

    return <div id={id} {...rest} />;
  },
);

export default Player;
