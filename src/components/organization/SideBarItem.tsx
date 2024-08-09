'use client';
import { useRouter } from 'next/navigation';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { Organization } from '@prisma/client';

type Props = {
  organization: Organization;
};
function SideBarItem({ organization }: Props) {
  const router = useRouter();
  const onClick = (id: string) => {
    router.push(`/organization/${organization.id}`);
  };
  return (
    <AccordionItem value={organization.id}>
      <AccordionTrigger
        onClick={() => onClick(organization.id)}
        className="font-bold"
      >
        {organization.name}
      </AccordionTrigger>
      <AccordionContent>
        Yes. It adheres to the WAI-ARIA design pattern.
      </AccordionContent>
    </AccordionItem>
  );
}
export default SideBarItem;
