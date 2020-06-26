import React from 'react';

const Links = ({ href, text }) => (
  <a href={href} target="_blank" rel="noreferrer">
    {text || href}
  </a>
);

export default Links;
