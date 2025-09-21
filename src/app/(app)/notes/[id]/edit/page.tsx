'use client';

import { useParams, useRouter } from 'next/navigation';
import NoteEditor from '@/components/note-editor';
import { useNotes } from '@/hooks/use-notes';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function EditNotePage() {
  const params = useParams();
  const router = useRouter();
  const { getNoteById } = useNotes();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const note = getNoteById(id);

  useEffect(() => {
    if (!note) {
      // Could redirect to a 404 page
      // router.replace('/404');
    }
  }, [note, router]);

  if (!note) {
    return (
        <div>
            <Skeleton className="h-10 w-1/2 mb-6" />
            <div className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-10 w-full" />
            </div>
        </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Note</h1>
      <NoteEditor note={note} />
    </div>
  );
}
