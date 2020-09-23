import React from 'react';
import Wrapper from 'components/Wrapper';
import Description from 'components/Description';
import Loading from 'components/Loading';

export default () => {
  return (
    <Wrapper label="Loading" time="2020-07-04">
      <Loading />
      <Description>Loading，基于CSS动画的Loading；</Description>
    </Wrapper>
  );
};
