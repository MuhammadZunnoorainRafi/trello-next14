'use client';
import { Organization } from '@prisma/client';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import Link from 'next/link';

type Props = {
  organization: Organization;
};
function SideBarItem({ organization }: Props) {
  return (
    <Button variant="default" className="font-bold w-full">
      <Link href={`/organization/${organization.id}`}>{organization.name}</Link>
    </Button>
  );
}
export default SideBarItem;
