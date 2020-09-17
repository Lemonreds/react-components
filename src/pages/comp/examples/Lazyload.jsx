import React from 'react';
import Wrapper from 'components/Wrapper';
import Description from 'components/Description';
import Lazyload from 'components/Lazyload';
import Observer from 'components/Lazyload/Observer';
import posterImg from 'assets/LazyLoad/video-poster.png';
import image from 'assets/LazyLoad/image.png';

export default () => {
  return (
    <Wrapper label="Lazyload" time="2020-07-06">
      <Lazyload width={200} height={200}>
        <pre>
          组件不可见时，只会展示占位容器，当组件进入可视区域后（触发
          IntersectionObserver），就会展示。
        </pre>
      </Lazyload>

      <Lazyload width="100%" height={256}>
        <img src={image} alt="lazyload" width={660} height={366} />
      </Lazyload>

      <Observer>
        {inView => (
          <video
            autoPlay
            muted
            loop
            playsInline
            // width="610"
            height="256"
            poster={posterImg}
          >
            <source
              src={
                inView
                  ? 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4'
                  : null
              }
              type="video/mp4"
            />
          </video>
        )}
      </Observer>

      <Description>
        基于浏览器API
        IntersectionObserver的Lazyload组件，可用于懒加载图片、视频以及其他组件。
      </Description>
    </Wrapper>
  );
};
