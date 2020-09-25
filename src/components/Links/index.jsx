import React from 'react';

const Links = ({ href, text, children }) => (
  <a href={href} target="_blank" rel="noreferrer">
    {text || children || href}
  </a>
);

export default Links;
