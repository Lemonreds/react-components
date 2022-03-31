import { useRef, useEffect } from 'react';
import videojs from 'video.js';

window.videojs = videojs;

require('video.js/dist/video-js.css');
require('videojs-contrib-hls/dist/videojs-contrib-hls');
require('./plugins/disableProgress');
require('./Vjs.less');

const Video = props => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const { options, onVjsLoaded, style } = props;

  useEffect(() => {
    // make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      playerRef.current = videojs(videoElement, options, () => {
        onVjsLoaded?.(playerRef.current);
      });
    }
    return () => {
      const player = playerRef.current;
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [videoRef]);

  return (
    <div
      style={{ width: style?.width ?? '100%', height: style?.height ?? 210 }}
    >
      <video
        ref={videoRef}
        className='video-js vjs-big-play-centered'
        playsInline
      >
        <p className='vjs-no-js'>当前浏览器不支持 Video</p>
      </video>
    </div>
  );
};

export default Video;
