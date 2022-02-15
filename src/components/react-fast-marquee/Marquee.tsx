/* eslint-disable indent */
import React, { Fragment, useEffect, useState, useRef } from 'react';
import classnames from 'classnames';
import { setStyle, isIEBrowser } from './utils';
import './Marquee.less';

interface MarqueeProps {
  style?: React.CSSProperties;
  className?: string;
  play?: boolean;
  pauseOnHover?: boolean;
  pauseOnClick?: boolean;
  direction?: 'left' | 'right';
  speed?: number;
  delay?: number;
  loop?: number;
  gradient?: boolean;
  gradientColor?: [number, number, number];
  gradientWidth?: number | string;
  onFinish?: () => void;
  onCycleComplete?: () => void;
  children?: React.ReactNode;
}

/**
 *
 * @see https://github.com/justin-chu/react-fast-marquee
 * @desc 修改了这个库的代码，兼容IE11的场景
 * 具体修改：
 * 1. css variables IE11是不支持的，需要兼容这部分样式代码
 * 2. IE11下移除Marquee.less所有和动画有关的属性，会导致IE动画跑不动
 * 3. 使用JS，往对应的元素增加CSS动画样式animation (如果该DOM已有相关的动画样式，会导致无法播放，第二步的原因)
 */
const Marquee: React.FC<MarqueeProps> = ({
  style = {},
  className = '',
  play = true,
  pauseOnHover = false,
  pauseOnClick = false,
  direction = 'left',
  speed = 20,
  delay = 0,
  loop = 0,
  onFinish,
  onCycleComplete,
  children,
}) => {
  // React Hooks
  const [containerWidth, setContainerWidth] = useState(0);
  const [marqueeWidth, setMarqueeWidth] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeRef2 = useRef<HTMLDivElement>(null);

  const calculateWidth = () => {
    // Find width of container and width of marquee
    if (marqueeRef.current && containerRef.current) {
      setContainerWidth(containerRef.current.getBoundingClientRect().width);
      setMarqueeWidth(marqueeRef.current.getBoundingClientRect().width);
    }

    if (marqueeWidth < containerWidth) {
      setDuration(containerWidth / speed);
    } else {
      setDuration(marqueeWidth / speed);
    }

    if (isIEBrowser) {
      invokeIEFixer();
    }
  };

  // for ie
  const invokeIEFixer = () => {
    setTimeout(() => {
      if (duration) {
        const animationLoop = loop ? `${loop}` : 'infinite';
        const animationDuration = Math.round(duration);
        const animation = `scroll ${animationDuration}s linear ${delay}s ${animationLoop}`;

        setStyle(marqueeRef.current, 'animation', animation);
        setStyle(marqueeRef2.current, 'animation', animation);
      } else {
        setStyle(marqueeRef.current, 'animation', 'none');
        setStyle(marqueeRef2.current, 'animation', 'none');
      }
    }, 0);
  };

  useEffect(() => {
    calculateWidth();
    // Rerender on window resize
    window.addEventListener('resize', calculateWidth);
    return () => {
      window.removeEventListener('resize', calculateWidth);
    };
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const marqueeStyle = {
    ['--play' as string]: play ? 'running' : 'paused',
    ['--direction' as string]: direction === 'left' ? 'normal' : 'reverse',
    ['--duration' as string]: `${duration}s`,
    ['--delay' as string]: `${delay}s`,
    ['--iteration-count' as string]: loop ? `${loop}` : 'infinite',
  };

  return (
    <Fragment>
      {!isMounted ? null : (
        <div
          ref={containerRef}
          style={{
            ...style,
            ['--pause-on-hover' as string]: pauseOnHover ? 'paused' : 'running',
            ['--pause-on-click' as string]: pauseOnClick ? 'paused' : 'running',
          }}
          className={classnames(className, 'marquee-container')}
        >
          <div
            ref={marqueeRef}
            style={marqueeStyle}
            className={classnames('marquee', {
              'marquee-default': !isIEBrowser,
            })}
            onAnimationIteration={onCycleComplete}
            onAnimationEnd={onFinish}
          >
            {children}
          </div>
          <div
            style={marqueeStyle}
            ref={marqueeRef2}
            className={classnames('marquee', {
              'marquee-default': !isIEBrowser,
            })}
          >
            {children}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Marquee;
