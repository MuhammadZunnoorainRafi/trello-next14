import { CreateBoardForm } from '@/components/forms/CreateBoardForm';
import db from '@/lib/db';
import Link from 'next/link';

type Props = {
  params: { orgId: string };
};
async function SingleOrganization({ params }: Props) {
  const organization = await db.organization.findUnique({
    where: { id: params.orgId },
  });
  const boards = await db.board.findMany({
    where: { organizationId: params.orgId },
  });
  if (!organization) {
    return <p>Sorry, Organization not found</p>;
  }
  return (
    <div>
      <h1 className="font-bold text-2xl py-2">{organization.name}</h1>
      <div className="flex items-center justify-start gap-2">
        {boards.length > 0 ? (
          <div className="flex items-center justify-start gap-2">
            {boards.map((board) => (
              <Link
                href={`/board/${board.id}`}
                key={board.id}
                className="px-10 hover:opacity-50 duration-150 cursor-pointer py-5 rounded-lg border border-slate-400"
              >
                {board.name}
              </Link>
            ))}
          </div>
        ) : (
          <p>No Board yet please create one.</p>
        )}
        <CreateBoardForm orgId={organization.id} />
      </div>
    </div>
  );
}

export default SingleOrganization;
