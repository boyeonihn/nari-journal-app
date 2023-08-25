import React from 'react';

const Subheader = ({ text }) => {
  return <h2 className="subheader">{text}</h2>;
};

export default React.memo(Subheader);
