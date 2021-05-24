import React, { useState, useMemo } from 'react';
import Wrapper from 'components/Wrapper';
import Description from 'components/Description';
import Part from 'components/Part';
import StaticRenderer from 'components/StaticRenderer';
import Button from 'components/Form/Button';
import usePrevious from 'hooks/usePrevious';

export default () => {
  const [propA, setPropA] = useState('我是 propA');
  const [propB, setPropB] = useState('我是 propB');
  const prevPropA = usePrevious(propA);

  const shouldUpdate = useMemo(() => prevPropA !== propA, [propA]);

  return (
    <Wrapper label="StaticRenderer，手动触发react的更新时机" time="2021-05-24">
      <Part>样例：</Part>
      <pre>
        {`
        <StaticRenderer
          propA={propA}
          propB={propB}
          shouldUpdate={shouldUpdate}
          render={() => {
            window.console.log('rendered');
            return <div>{propA}</div>;
          }}
        />

        const [propA, setPropA] = useState('我是 propA');
        const [propB, setPropB] = useState('我是 propB');
        const prevPropA = usePrevious(propA);

        const shouldUpdate = useMemo(() => prevPropA !== propA, [propA]);
        只会在propA改变的时候重新render，其他时机不会render
        `}
      </pre>
      <Part>组件渲染内容：</Part>
      <StaticRenderer
        propA={propA}
        propB={propB}
        shouldUpdate={shouldUpdate}
        render={() => {
          window.console.log('rendered');
          return <div>{propA}</div>;
        }}
      />
      <div style={{ height: 40 }} />

      <Button
        onClick={() => setPropA(`更新propA, ${Math.random().toFixed(4)}`)}
        style={{ marginRight: 24 }}
      >
        更新propA
      </Button>
      <Button
        onClick={() => setPropB(`更新propB, ${Math.random().toFixed(4)}`)}
      >
        更新propB
      </Button>
      <Description>
        react组件中，
        props或state发生变化后，都会重新执行组件的render方法，计算dom差异，然后将差异更新到视图上。
        一些组件用不到的props,state改变后，也同样会执行render。如何有效地减少这些无用的render次数，是react组件性能优化的一个实战。
        taticRenderer，是以上情况的一个通用暴力的方法，它是一个这样的组件，通过传入一个shouldUpdate函数，来覆盖React中默认的shouldComponentUpdate来实现，该组件只会在shouldUpdate返回true的时候重新渲染。
      </Description>
    </Wrapper>
  );
};
