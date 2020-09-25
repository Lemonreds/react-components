import React, { useState } from 'react';
import Wrapper from 'components/Wrapper';
import Description from 'components/Description';
import Part from 'components/Part';
import Links from 'components/Links';
import Button from 'components/Form/Button';

import createLoadable from 'components/createLoadable';
// import DynamicTest from 'DynamicTest';

// 占位符组件
const Loading = ({ isLoading, error }) => {
  if (isLoading) return <div>正在异步加载</div>;
  if (error) return <div>加载发生了错误</div>;
  return null;
};

const DynamicTest = createLoadable({
  loader: () => import(/* webpackChunkName: "DynamicTest" */ './DynamicTest'),
  loading: Loading,
  delay: 1500,
});

export default () => {
  const [isClicked, set] = useState(false);

  const onClick = () => {
    if (!isClicked) {
      set(true);
    }
  };

  return (
    <Wrapper label="createLoadable" time="2020-09-25">
      <Part>Webpack动态导入的一个实践</Part>

      <pre>
        {`
    const DynamicTest = createLoadable({
        loader: () => import(/* webpackChunkName: "DynamicTest" */ './DynamicTest'),
        loading: Loading,
        delay: 3000,
    });`}
      </pre>

      <div style={{ width: '100%', height: '100px', border: '1px solid #eee' }}>
        {isClicked && <DynamicTest />}
      </div>

      <Button
        onClick={onClick}
        style={{ width: 240, margin: '24px auto', display: 'block' }}
      >
        点我，延迟1.5s后开始加载异步组件。
      </Button>

      <Description>
        [2020-09-25]
        createLoadable，将模块单独出打包一个chunk，在需要的时候加载，实现代码分片和动态导入。
        <Links href="https://github.com/Lemonreds/snippets/issues/17">
          思路说明
        </Links>
      </Description>
    </Wrapper>
  );
};
