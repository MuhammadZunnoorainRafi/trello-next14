import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import db from '@/lib/db';
import Link from 'next/link';
import SideBarItem from './SideBarItem';

async function SideBar() {
  const organizations = await db.organization.findMany();
  return (
    <Accordion type="single" collapsible className="w-full">
      {organizations.map((organization) => (
        <SideBarItem key={organization.id} organization={organization} />
      ))}
    </Accordion>
  );
}

export default SideBar;
