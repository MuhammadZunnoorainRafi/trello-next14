import { CreateOrgForm } from '@/components/forms/CreateOrgForm';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-3">
        <div className="bg-gradient-to-tr from-cyan-200 to-pink-200 rounded-3xl overflow-hidden">
          <h1 className="font-bold text-8xl uppercase bg-[size:130%] bg-[url('/image.jpeg')] bg-clip-text text-transparent animate-slow-pan border p-3">
            Trello Clone
          </h1>
        </div>
        <div className="flex items-center justify-center gap-2">
          <CreateOrgForm />
          <Button asChild>
            <Link href={'/organization'}>Organizations</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
