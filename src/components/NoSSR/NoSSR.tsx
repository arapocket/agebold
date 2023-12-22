import React, { FC, ReactNode } from 'react';
import dynamic from 'next/dynamic';

const NoSSR: FC<{ children: ReactNode }> = (props) => (
  <React.Fragment>{props.children}</React.Fragment>
);

export default dynamic(() => Promise.resolve(NoSSR), {
  ssr: false,
});
