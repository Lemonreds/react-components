import React from 'react';
import Wrapper from 'components/Wrapper';
import Description from 'components/Description';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <Wrapper label="css变量换肤" time="2020-09-18">
      <Link to="/skin">css变量换肤</Link>
      <Description>css变量的换肤</Description>
    </Wrapper>
  );
};
