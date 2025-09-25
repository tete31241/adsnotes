'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const NoteEditor = dynamic(() => import('@/components/note-editor'), { ssr: false });

export default function NoteEditorWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NoteEditor />
    </Suspense>
  );
}
