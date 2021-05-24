import React from 'react';
import Wrapper from 'components/Wrapper';
import Description from 'components/Description';
import Strong from 'components/Strong';
import Part from 'components/Part';
import ReactIntl from './example';

export default () => {
  return (
    <Wrapper label="react-intl 的多语言方案" time="2021-04-14">
      <ReactIntl />
      <Part>组件内调用</Part>
      <pre>
        {`
        import IntlProvider, { IntlContext, getIntl, getLocale } from './IntlProvider';
        const Component = () => {
            const intl = useIntl();
            const intlCtx = React.useContext(IntlContext);
            return <div> {intl.formatMessage({ id: 'content' })}</div>
        }
        `}
      </pre>
      <Part>非组件调用</Part>
      <pre>
        {`
        import IntlProvider, { IntlContext, getIntl, getLocale } from './IntlProvider';
        const _intl = getIntl(getLocale());
        _intl.formatMessage({
          id: 'content',
        });
        `}
      </pre>
      <Description>
        react-intl多语言封装的方案，提供了
        <Strong>组件内调用</Strong>
        以及
        <Strong>非组件调用</Strong>
        两种方式展示文案;
        通过 
        <Strong>useContext(IntlContext).setLocale(zh-en) </Strong>
        来切换多语言
      </Description>
    </Wrapper>
  );
};
