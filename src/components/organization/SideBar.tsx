import db from '@/lib/db';
import SideBarItem from './SideBarItem';

async function SideBar() {
  const organizations = await db.organization.findMany();
  return (
    <div className="w-full space-y-1">
      {organizations.map((organization) => (
        <SideBarItem key={organization.id} organization={organization} />
      ))}
    </div>
  );
}

export default SideBar;
