import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const NoteEditor = dynamic(() => import('@/components/note-editor'), { ssr: false });

export default function NewNotePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">New Note</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <NoteEditor />
      </Suspense>
    </div>
  );
}
