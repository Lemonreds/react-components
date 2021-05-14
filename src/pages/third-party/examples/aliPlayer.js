import React, { useRef, useEffect } from 'react';
import Wrapper from 'components/Wrapper';
import Description from 'components/Description';
import AliPlayer, { loadSDK } from 'components/AliPlayer';

const config = {
  width: '100%',
  height: '200px',
  source: '//player.alicdn.com/video/aliyunmedia.mp4',
  autoplay: false,
  isLive: false,
  rePlay: false,
  showBuffer: true,
  snapshot: false,
  showBarTime: 5000,
  useFlashPrism: false,
  playsinline: true,
  preload: true,
};

export default () => {
  const ref = useRef(null);

  useEffect(() => {
    loadSDK().then(() => {
      ref.current.init();
    });
  }, []);

  return (
    <Wrapper label="AliPlayer 视频播放器" time="2021-05-10">
      <AliPlayer
        id="aplayer"
        ref={ref}
        style={{ borderRadius: 8, height: 220 }}
        config={config}
      />

      <Description>
        AliPlayer,基于aliplayer的一个react封装例子，可以手动选择加载aliplayerSDK(包括js和css)的时机，而不是直接写在全局的index.html模版中。
      </Description>
    </Wrapper>
  );
};
