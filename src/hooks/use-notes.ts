'use client';

import { useNotesStore, useIsNotesStoreHydrated } from './use-notes-store';
import { useRouter } from 'next/navigation';

export function useNotes() {
  const router = useRouter();
  const { 
    notes, 
    isLoading: isStoreLoading, 
    getNoteById, 
    saveNote: saveNoteToStore, 
    addNote, 
    deleteNote, 
    deleteAllNotes 
  } = useNotesStore();

  // This ensures that we don't render the component until the store is hydrated
  // which prevents content flashing and mismatches between server and client.
  const isHydrated = useIsNotesStoreHydrated();
  const isLoading = !isHydrated || isStoreLoading;

  const saveNote = (noteToSave: any) => {
    const savedNote = saveNoteToStore(noteToSave);
    router.push('/notes'); // Navigate after saving
    router.refresh();
    return savedNote;
  };

  return {
    notes,
    isLoading,
    getNoteById,
    saveNote,
    addNote,
    deleteNote,
    deleteAllNotes,
  };
}
