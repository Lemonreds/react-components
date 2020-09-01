import { useState, useEffect } from 'react';
import { on, off } from './utils';

// ref: https://github.com/sindresorhus/screenfull.js/blob/master/src/screenfull.js
const fs = [
  [
    'requestFullscreen',
    'exitFullscreen',
    'fullscreenElement',
    'fullscreenEnabled',
    'fullscreenchange',
    'fullscreenerror',
  ],
  [
    'webkitRequestFullscreen',
    'webkitExitFullscreen',
    'webkitFullscreenElement',
    'webkitFullscreenEnabled',
    'webkitfullscreenchange',
    'webkitfullscreenerror',
  ],
  [
    'webkitRequestFullScreen',
    'webkitCancelFullScreen',
    'webkitCurrentFullScreenElement',
    'webkitCancelFullScreen',
    'webkitfullscreenchange',
    'webkitfullscreenerror',
  ],
  [
    'mozRequestFullScreen',
    'mozCancelFullScreen',
    'mozFullScreenElement',
    'mozFullScreenEnabled',
    'mozfullscreenchange',
    'mozfullscreenerror',
  ],
  [
    'msRequestFullscreen',
    'msExitFullscreen',
    'msFullscreenElement',
    'msFullscreenEnabled',
    'MSFullscreenChange',
    'MSFullscreenError',
  ],
];

const m = {};
for (let i = 0; i < fs.length; i += 1) {
  const items = fs[i];
  if (items[1] in document) {
    for (let j = 0; j < items.length; j += 1) {
      m[fs[0][j]] = items[j];
    }
  }
}
// end

/**
 *
 * @hook useFullScreen
 * @desc 基于screenfull.js的元素全屏hook
 * @at 2020/09/01
 *
 */
const useFullScreen = ref => {
  const [isFullScreen, set] = useState(false);

  const onChange = () => {
    set(!!document[m.fullscreenElement]);
  };

  useEffect(() => {
    if (ref.current) {
      on(document, `${m.fullscreenchange}`, onChange);
    }
    return () => off(document, `${m.fullscreenchange}`, onChange);
  }, [ref.current]);

  const request = () => ref.current[m.requestFullscreen]();
  const exit = () => document[m.exitFullscreen]();
  const toggle = isFullScreen ? exit : request;

  return [isFullScreen, { request, toggle, exit }];
};

export default useFullScreen;
