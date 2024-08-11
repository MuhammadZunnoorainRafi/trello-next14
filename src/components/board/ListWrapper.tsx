import React from 'react';

type Props = {
  children: React.ReactNode;
};

function ListWrapper({ children }: Props) {
  return <li className="shrink-0 w-[272px] h-full select-none">{children}</li>;
}

export default ListWrapper;
