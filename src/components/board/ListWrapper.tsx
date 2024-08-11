import React from 'react';

type Props = {
  children: React.ReactNode;
};

function ListWrapper({ children }: Props) {
  return <li className="shrink-0 w-[262px] h-full select-none">{children}</li>;
}

export default ListWrapper;
