import React from 'react';
import { useIntl } from 'umi'; // 等价于 import { useIntl } from 'react-intl'; 参考 ../umi-plugin-intl
import Strong from 'components/Strong';
import IntlProvider, { IntlContext, getIntl, getLocale } from './IntlProvider';

// 非组件的多语言调用方式
const _intl = getIntl(getLocale());

// eslint-disable-next-line no-console
console.log(
  _intl.formatMessage({
    id: 'content',
  }),
);
// end

const Component = () => {
  const intl = useIntl();
  const intlCtx = React.useContext(IntlContext);
  return (
    <div>
      <p>
        <Strong>当前语言：</Strong>
        {intlCtx.lang}
      </p>
      <p>
        <Strong>多语言文本1：</Strong>
        {intl.formatMessage({ id: 'content' })}
      </p>
      <p>
        <Strong>多语言文本2：</Strong>
        {intl.formatMessage({ id: 'desc' })}
      </p>

      <button
        type="button"
        onClick={() => {
          intlCtx.setLocale('zh-CN');
        }}
        style={{
          marginBottom: 38,
          display: 'inline-block',
          width: 200,
          height: 100,
          marginRight: 12,
          background: '#e4edf7',
        }}
      >
        更改语言成 zhCN
      </button>
      <button
        type="button"
        onClick={() => {
          intlCtx.setLocale('zh-MO');
        }}
        style={{
          marginBottom: 38,
          display: 'inline-block',
          width: 200,
          height: 100,
          marginRight: 12,
          background: '#e4edf7',
        }}
      >
        更改语言成 zhMo
      </button>

      <button
        type="button"
        onClick={() => {
          intlCtx.setLocale('en-US');
        }}
        style={{
          marginBottom: 38,
          display: 'inline-block',
          width: 200,
          height: 100,
          marginRight: 12,
          background: '#e4edf7',
        }}
      >
        更改语言成 en-US
      </button>
    </div>
  );
};

export default () => {
  return (
    <IntlProvider>
      <Component />
    </IntlProvider>
  );
};
