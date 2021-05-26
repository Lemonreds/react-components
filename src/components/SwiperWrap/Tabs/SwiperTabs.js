import React, { useRef, useMemo, useState } from 'react';
import classnames from 'classnames';
import { Swiper, SwiperSlide } from '../index';
import styles from './SwiperTabs.less';

function TabsRenderer(props) {
  const { tabs, current, page, onTabChange } = props;
  const { length } = tabs;

  const [unitWidth, offset, left] = useMemo(() => {
    // 单位Tab的宽度
    const _unitWidth = 100 / page;

    // page = 3
    // current 0 1   2 3 4 5 6 7   8 9
    // offset  0 0   1 2 3 4 5 6   6 6

    // current 0 1   2 3   4 5
    // offset  0 0   1 2   3 3
    const half = Math.round(page / 2);
    const start = 0;
    const end = length - 1;

    // 整体Tab的偏移量
    let _offset = 0;

    const isBegin = current < start + half; // 第一页的前半部分数据
    const isEnd = current > end - half; // 最后一页的后半本部分数据
    if (isBegin) {
      _offset = 0;
    } else if (isEnd) {
      _offset = end - half - 1;
    } else {
      _offset = current - 1;
    }

    // 指示器偏移左边的距离
    const _left = ((current - _offset) % page) * _unitWidth;

    return [_unitWidth, _offset, _left];
  }, [tabs, page, current]);

  return (
    <div className={styles.deafultTabs}>
      <div className={styles.tabsWrap}>
        <div
          className={styles.tabList}
          style={{
            transform: `translate3d(-${offset * unitWidth}%, 0px, 0px)`,
          }}
        >
          {tabs.map((i, k) => {
            const { title, key = k } = i;
            const isActive = current === k;
            return (
              <div
                className={classnames(styles.tab, {
                  [styles.active]: isActive,
                })}
                key={key}
                style={{ width: `${unitWidth}%` }}
                onClick={() => onTabChange(k)}
              >
                {title}
              </div>
            );
          })}
        </div>

        <DefaultIndicator width={unitWidth} left={left} />
      </div>
    </div>
  );
}

/**
 * @component Tab栏底部的指示器
 */
function DefaultIndicator(props) {
  const { width, left } = props;
  return (
    <div
      className={styles.indicator}
      style={{
        width: `calc(0.5 * ${width}%)`,
        left: `calc(0.25 * ${width}% + ${left}%)`,
      }}
    />
  );
}

/**
 *
 * @component 基于Swiper的Tabs组件
 *
 *
 */
function SwiperTabs(props) {
  const { children, className, style, tabs, page = 4, ...rest } = props;
  const insRef = useRef(null);
  const [current, setCurrent] = useState(0);

  const onSlideChange = () => {
    if (insRef.current?.current !== current) {
      setCurrent(insRef.current?.activeIndex);
    }
  };

  const onTabChange = index => {
    setCurrent(index);
    insRef.current.slideTo(index);
  };

  return (
    <div className={classnames(styles.tabsWrap, className)} style={style}>
      <TabsRenderer
        tabs={tabs}
        current={current}
        page={page}
        onTabChange={onTabChange}
      />
      <div className={styles.content}>
        <Swiper
          {...rest}
          onSlideChange={(...params) => {
            onSlideChange(params);

            if (props.onSlideChange) {
              props.onSlideChange(params);
            }
          }}
          onSwiper={_ins => {
            insRef.current = _ins;

            if (props.onSwiper) {
              props.onSwiper(_ins);
            }
          }}
        >
          {React.Children.map(children, (child, index) => (
            <SwiperSlide key={tabs[index]?.key || index}>{child}</SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default SwiperTabs;
