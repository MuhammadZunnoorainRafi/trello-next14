type Props = {
  params: { orgId: string };
};
function SingleOrganization({ params }: Props) {
  return <div>{params.orgId}</div>;
}

export default SingleOrganization;
