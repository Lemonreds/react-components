import React, { useState } from 'react';
import Wrapper from 'components/Wrapper';
import Description from 'components/Description';
import useDeepCompareEffect from 'hooks/useDeepCompareEffect';
import Button from 'components/Form/Button';
import Links from 'components/Links';

export default () => {
  const [data, setData] = useState({ a: 3, b: 4 });
  const [count, setCount] = useState(0);
  useDeepCompareEffect(() => {
    setCount(count + 1);
  }, [data]);
  return (
    <Wrapper label="useDeepCompareEffect" time="2021-03-10">
      <p>{`data: ${JSON.stringify(data)}`}</p>
      <p>
        effect执行的次数
        {count}
      </p>

      <div style={{ margin: '24px 0' }}>
        <Button onClick={() => setData({ ...data })} style={{ width: 200 }}>
          浅比较，不会执行effect
        </Button>

        <Button
          onClick={() => setData({ ...data, _t: Math.random() })}
          style={{ width: 200, marginLeft: 12 }}
        >
          深比较，会执行effect
        </Button>
      </div>

      <Description>
        useDeepCompareEffect，来自
        <Links href="https://github.com/kentcdodds/use-deep-compare-effect">
          github/kentcdodds/use-deep-compare-effect
        </Links>
        的实现，可以通过ref缓存前一次deps的方法来实现类似的hook，比如useDeepCompareMemo,useDeepCompareCallback....
      </Description>
    </Wrapper>
  );
};
