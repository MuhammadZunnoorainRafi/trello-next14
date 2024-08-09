import SideBar from '@/components/organization/SideBar';
import React from 'react';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-5 p-3 gap-2">
      <div className="col-span-1 pr-2 border-r border-primary ">
        <SideBar />
      </div>
      <div className="col-span-4">{children}</div>
    </div>
  );
}

export default Layout;
