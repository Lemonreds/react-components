import { useRef } from 'react';
import Video from './Vjs';

const VideoH5 = props => {
  const { onReady, style } = props;

  const playerRef = useRef(null);

  /**
   * 播放视频
   */
  const play = (source, opts) => {
    const player = playerRef.current;
    if (player) {
      const d = source?.src;
      if (d) {
        if (opts?.currentTime) {
          const handleLoaded = function() {
            window.console.log('loadedmetadata');
            player.currentTime(opts?.currentTime);
          };
          // watch once
          player.one('loadedmetadata', handleLoaded);
        }

        player.src(source);
        player.load(source);
      }
    }
  };

  /**
   * 获取当前的播放位置
   */
  const getDuration = () => {
    const player = playerRef.current;
    if (player) {
      return player.currentTime();
    }
    return 0;
  };

  /**
   * 禁止拖动播放条
   */
  const disableProgress = disabled => {
    const player = playerRef.current;
    if (player) {
      player.disableProgress({ autoDisable: disabled });
    }
  };

  const handleOnTimeUpdate = function() {
    const { onTimeUpdate } = props;
    const duration = this.duration();
    const currentTime = this.currentTime();

    if (onTimeUpdate instanceof Function) {
      onTimeUpdate?.({ duration, currentTime });
    }
  };

  const onVjsLoaded = player => {
    playerRef.current = player;

    player.on('timeupdate', handleOnTimeUpdate);
    

    if (onReady instanceof Function) {
      onReady({ play, getDuration, disableProgress });
    }
  };

  return (
    <Video
      style={style}
      options={{
        autoplay: false,
        controls: true,
        muted: false,
        fluid: true,
        // poster: 'xxx', // 视频封面图地址
        controlBar: {
          children: [
            { name: 'playToggle' }, // 播放按钮
            { name: 'currentTimeDisplay' }, // 当前已播放时间
            { name: 'PlayNext' }, //点击播放下一个按钮
            { name: 'progressControl' }, // 播放进度条
            { name: 'durationDisplay' }, // 总时间
            { name: 'remainingTimeDisplay' }, // 剩下的时间
            {
              name: 'playbackRateMenuButton',
              playbackRates: [0.5, 1, 1.5, 2]
            }, // 倍数播放
            {
              name: 'volumePanel', // 音量控制
              inline: false // 不使用水平方式
            },
            { name: 'FullscreenToggle' } // 全屏
          ]
        },
        preload: true,
        responsive: true,
        sources: []
      }}
      onVjsLoaded={onVjsLoaded}
    />
  );
};

export default VideoH5;
