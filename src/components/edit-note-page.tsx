'use client';

import { useParams, useRouter } from 'next/navigation';
import NoteEditor from '@/components/note-editor';
import { useNotes } from '@/hooks/use-notes';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function EditNotePageComponent() {
  const params = useParams();
  const router = useRouter();
  const { getNoteById, isLoading } = useNotes(); // Destructure isLoading
  const id = params.id as string;
  const note = getNoteById(id);

  useEffect(() => {
    // If loading is finished and there's still no note, then redirect.
    if (!isLoading && !note) {
      router.replace('/notes');
    }
  }, [isLoading, note, router]);

  // Display a skeleton loader while the notes are loading.
  if (isLoading || !note) {
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
      {note && <NoteEditor note={note} />}
    </div>
  );
}
