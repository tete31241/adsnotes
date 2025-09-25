'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const NoteEditorWrapper = dynamic(() => import('@/components/note-editor-wrapper'), {
  ssr: false,
  loading: () => <div>Loading editor...</div>,
});

export const dynamic = "force-dynamic";

export default function NewNotePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">New Note</h1>
      <Suspense fallback={<div>Loading editor...</div>}>
        <NoteEditorWrapper />
      </Suspense>
    </div>
  );
}
