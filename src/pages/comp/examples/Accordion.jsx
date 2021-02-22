import React from 'react';
import Wrapper from 'components/Wrapper';
import Description from 'components/Description';
import Accordion from 'components/Accordion';

export default () => {
  return (
    <Wrapper label="Accordion" time="2020-09-27">
      <Accordion.Container>
        <Accordion title="Accordion-1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
          lacus ex, sit amet blandit leo lobortis eget.
        </Accordion>
        <Accordion title="Accordion-2">
          <pre>
            {`
            div{
                animation-duration:2s;
                -webkit-animation-duration:2s;  
            }
            `}
          </pre>
        </Accordion>
        <Accordion title="Accordion-3">
          <h3 style={{ fontSize: 26 }}>React</h3>
          <p>A JavaScript library for building user interfaces</p>
        </Accordion>
        <Accordion title="Accordion-4">
          Originally, chunks (and modules imported inside them) were connected
          by a parent-child relationship in the internal webpack graph. The
          CommonsChunkPlugin was used to avoid duplicated dependencies across
          them, but further optimizations where not possible Since version 4 the
          CommonsChunkPlugin was removed in favor of optimization.splitChunks
          and optimization.runtimeChunk options. Here is how the new flow works.
        </Accordion>
      </Accordion.Container>
      <Description>[2020-09-27] Accordion 折叠面板。</Description>
    </Wrapper>
  );
};
