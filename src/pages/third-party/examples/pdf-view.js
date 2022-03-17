import React from 'react';
import Wrapper from 'components/Wrapper';
import Description from 'components/Description';
import PdfViewer from 'components/PdfViewer';

export default () => {
  return (
    <Wrapper label="PdfViewer PDF阅读器" time="2021-05-10">
      <PdfViewer url="/test.pdf" />

      <Description>PdfViewer,使用react-pdf的一个二次封装，并做了一个分页器。</Description>
    </Wrapper>
  );
};
