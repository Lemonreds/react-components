import { useState, useEffect } from 'react';
import { isAndroid, isIOS } from '@/utils';

const Sized = {
  i: 'i',
  sm: 'sm',
  nm: 'nm',
  md: 'md',
  lg: 'lg',
};

const SizedIOS = {
  87.5: Sized.sm,
  100: Sized.nm,
  118.75: Sized.md,
  137.5: Sized.lg,
};

const SizedAndroid = {
  0.875: Sized.sm,
  1: Sized.nm,
  1.1875: Sized.md,
  1.375: Sized.lg,
};

/**
 * @desc 获取webview当前设置的字体缩放类型，未来可以由app端传入
 * @see: https://juejin.cn/post/6844903507061932040?share_token=6ed3db1d-c789-4111-9c81-5f36c762ba17
 */
const useFontSize = () => {
  const [sizeType, setSizeType] = useState(Sized.i); // 字体类型
  const [scale, setScale] = useState(1); // 放大的比例

  useEffect(() => {
    if (isIOS) {
      const callback = () => {
        let webkitTextSizeAdjust = Number(
          document.body.getAttribute('style')?.match(/\d+\.+\d+/gi)?.[0],
        );
        if (
          Number.isNaN(webkitTextSizeAdjust) ||
          webkitTextSizeAdjust / 100 === scale
        ) {
          // no changed
          return;
        }

        webkitTextSizeAdjust = webkitTextSizeAdjust || 100; // set default Value
        window.console.log('webkitTextSizeAdjust', webkitTextSizeAdjust);
        setSizeType(SizedIOS[webkitTextSizeAdjust] || Sized.nm);
        setScale(webkitTextSizeAdjust / 100, 1); // ios 需要除百分比
      };
      const observer = new window.MutationObserver(mutations => {
        mutations.forEach(() => {
          callback();
        });
      });
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['style'],
      });
      callback();
    }

    if (isAndroid) {
      const div = document.createElement('div');
      div.style = 'font-size:16px;';
      document.body.appendChild(div);
      const scaledFontSize = Math.round(
        window
          .getComputedStyle(div, null)
          .getPropertyValue('font-size')
          .replace('px', ''),
      );

      document.body.removeChild(div);
      const scaleRate = scaledFontSize / 16;
      const _sizeType = SizedAndroid[scaleRate];
      window.console.log('scaleRate:', scaleRate, _sizeType);
      setSizeType(_sizeType);
      setScale(scaleRate);
    }
  }, []);

  return [scale, sizeType];
};

export default useFontSize;

export { Sized };
