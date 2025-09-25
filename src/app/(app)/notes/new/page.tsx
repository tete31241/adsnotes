'use client';

import { Suspense } from 'react';
import NoteEditor from '@/components/note-editor';

function NewNotePageContents() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">New Note</h1>
      <NoteEditor />
    </div>
  );
}

export default function NewNotePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewNotePageContents />
    </Suspense>
  );
}
