import NoteEditor from '@/components/note-editor';
import { Suspense } from 'react';

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
