'use client';

import { useSearchParams } from 'next/navigation';
import NoteEditor from '@/components/note-editor';
import { Suspense, useEffect, useState } from 'react';
import { useNotes } from '@/hooks/use-notes';
import { Note } from '@/lib/types';

function NoteEditorWrapper() {
  const searchParams = useSearchParams();
  const noteId = searchParams.get('id');
  const parentId = searchParams.get('parent');
  const { getNoteById, saveNote, isLoading } = useNotes();
  const [note, setNote] = useState<Note | undefined>(undefined);

  useEffect(() => {
    if (noteId) {
      const existingNote = getNoteById(noteId);
      if (existingNote) {
        setNote(existingNote);
      }
    } else if (parentId) {
      // This is a new note that is a child of another note
      // We don't save it until the user explicitly clicks save
      setNote({ parentId } as any);
    }
  }, [noteId, parentId, getNoteById]);

  if (isLoading) {
    return <div>Loading editor...</div>;
  }

  // if a note has an id, it is an existing note
  // otherwise it is a new note and we might have a parentId
  if (note?.id || parentId) {
    return <NoteEditor note={note} />;
  } 
  
  // if there is a noteId but we couldn't find the note
  if (noteId && !note) {
    return <div>Note not found.</div>;
  }

  // This is a new note
  return <NoteEditor />;
}

export default function NewNotePage() {
  return (
    <Suspense fallback={<div>Loading editor...</div>}>
      <NoteEditorWrapper />
    </Suspense>
  );
}
