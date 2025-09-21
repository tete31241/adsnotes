'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import type { Note } from '@/lib/types';
import NoteCard from './note-card';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q');

  const filteredNotes = useMemo(() => {
    if (!searchQuery) {
      return notes;
    }
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [notes, searchQuery]);

  if (filteredNotes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20">
        <h2 className="text-xl font-semibold">No Notes Found</h2>
        <p className="text-muted-foreground">
          {searchQuery ? 'Try a different search term.' : "You haven't created any notes yet."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filteredNotes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
}
