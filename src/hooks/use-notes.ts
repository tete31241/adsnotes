'use client';

import useLocalStorage from './use-local-storage';
import type { Note } from '@/lib/types';
import { initialNotes } from '@/lib/initial-data';
import { useRouter } from 'next/navigation';
import { useToast } from './use-toast';

const NOTES_STORAGE_KEY = 'adnotes-notes';

export function useNotes() {
  const [notes, setNotes] = useLocalStorage<Note[]>(NOTES_STORAGE_KEY, initialNotes);
  const router = useRouter();
  const { toast } = useToast();

  const getNoteById = (id: string) => {
    return notes.find((note) => note.id === id);
  };

  const saveNote = (noteToSave: Omit<Note, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }) => {
    let savedNote: Note;
    if (noteToSave.id) {
      // Update existing note
      const now = new Date().toISOString();
      savedNote = { ...getNoteById(noteToSave.id)!, ...noteToSave, updatedAt: now };
      setNotes(notes.map((n) => (n.id === noteToSave.id ? savedNote : n)));
      toast({
        title: "Note Updated",
        description: `"${savedNote.title}" has been saved.`,
      });
    } else {
      // Create new note
      const now = new Date().toISOString();
      savedNote = {
        ...noteToSave,
        id: Date.now().toString(),
        createdAt: now,
        updatedAt: now,
      };
      setNotes([savedNote, ...notes]);
      toast({
        title: "Note Created",
        description: `"${savedNote.title}" has been created.`,
      });
    }
    router.push('/notes');
    router.refresh();
  };
  
  const addNote = (note: Partial<Note>) => {
     const now = new Date().toISOString();
      const newNote: Note = {
        id: Date.now().toString(),
        title: 'New Voice Note',
        content: '',
        tags: ['voice-memo'],
        type: 'voice',
        createdAt: now,
        updatedAt: now,
        ...note,
      };
      setNotes([newNote, ...notes]);
      toast({
        title: "Voice Note Added",
        description: `A new voice note has been created.`,
      });
      router.refresh();
      return newNote;
  }

  const deleteNote = (id: string) => {
    const noteToDelete = getNoteById(id);
    if(noteToDelete) {
        setNotes(notes.filter((n) => n.id !== id));
        toast({
            title: "Note Deleted",
            description: `"${noteToDelete.title}" has been moved to trash.`,
            variant: "destructive",
        });
        router.push('/notes');
        router.refresh();
    }
  };

  return { notes, getNoteById, saveNote, addNote, deleteNote };
}
