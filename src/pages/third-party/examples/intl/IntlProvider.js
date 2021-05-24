import React, { useState } from 'react';
import { RawIntlProvider, createIntlCache, createIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';
// import { useWhyDidYouUpdate } from 'ahooks';

// react-intl 多语言文件
const messages = {
  'zh-CN': {
    content: '豫章故郡，洪都新府。星分翼轸，地接衡庐。',
    desc: '我是一段内容',
  },
  'zh-MO': {
    content: '豫章故郡，洪都新府。星分翼軫，地接衡廬。',
    desc: '我是一段內容',
  },
  'en-US': {
    content:
      'The old county of Yuzhang, the new mansion of Hongdu. The star points to Wing Zhen, and the ground connects to Heng Lu.',
    desc: 'I am a piece of content',
  },
};
// 对应展示的文案
const locales = {
  'zh-CN': '简体',
  'zh-MO': '繁體',
  'en-US': 'English',
};

const makeSafeLocale = locale => {
  if (!locales[locale]) {
    throw new Error(`locale [${locale}] must one of [zh-CN,zh-MO,en-US] `);
  }
  return locale;
};

/**
 * **
 * 创建react-intl的contenxt，通过此修改语言
 */
const IntlContext = React.createContext({
  locale: 'zh-MO',
  lang: '繁體',
  setLocale: () => {},
});

/**
 * **
 * 根据locale创建intl
 * @returns intl
 */
const cache = createIntlCache();
const getIntl = _locale => {
  const locale = makeSafeLocale(_locale);
  window.localStorage.setItem('intl-locale', locale);
  return createIntl({ locale, messages: messages[locale] }, cache);
};

/**
 * **
 * 获取上一次设置的语言类型
 * @returns string
 */
const getLocale = () => {
  return window.localStorage.getItem('intl-locale') || 'zh-MO';
};

/**
 * **
 * 获取语言列表
 * @returns string[]
 */
export const getAllLocales = () => Object.keys(messages);

const _IntlProvider = props => {
  const { children } = props;
  const { query } = useLocation();
  const [locale, setLocale] = useState(() => getLocale(query));
  const [intl, setIntl] = useState(() => getIntl(locale));

  // useWhyDidYouUpdate('useWhyDidYouUpdateComponent', { ...props, locale, intl });

  const safeSetLocale = _locale => {
    const safeLocale = makeSafeLocale(_locale);
    if (safeLocale !== locale) {
      setLocale(safeLocale);
      setIntl(getIntl(safeLocale));
    }
  };

  return (
    <IntlContext.Provider
      value={{
        locale,
        lang: locales[locale],
        setLocale: safeSetLocale,
      }}
    >
      <RawIntlProvider value={intl}>{children}</RawIntlProvider>
    </IntlContext.Provider>
  );
};

export default React.memo(_IntlProvider);

export { IntlContext, getIntl, getLocale };
