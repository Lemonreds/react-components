import React from 'react';
import Wrapper from 'components/Wrapper';
import Links from 'components/Links';
import Description from 'components/Description';
// import useRouter from 'hooks/useRouter';

export default () => {
  return (
    <Wrapper label="useRouter" time="2020-08-21">
      <pre>
        {`
        react-router路由hook的整合，提取了路由常用方法，和解析查询参数。
        const {push, replace, goBack, go, pathname, 
        query, match, location, history} = useRouter();
      `}
      </pre>
      <Description>
        useRouter，@ref
        <Links
          href="https://usehooks.com/useRouter/"
          text="https://usehooks.com/useRouter/"
        />
        。
      </Description>
    </Wrapper>
  );
};
