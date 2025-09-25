'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Note } from '@/lib/types';
import { initialNotes } from '@/lib/initial-data';
import { toast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';

const NOTES_STORAGE_KEY = 'adnotes-notes';

interface NotesState {
  notes: Note[];
  isLoading: boolean;
  getNoteById: (id: string) => Note | undefined;
  saveNote: (noteToSave: Omit<Note, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }) => Note;
  addNote: (note: Partial<Note>) => Note;
  deleteNote: (id: string) => void;
  deleteAllNotes: () => void;
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set, get) => ({
      notes: initialNotes,
      isLoading: true, // Will be set to false after hydration
      getNoteById: (id: string) => get().notes.find((note) => note.id === id),
      saveNote: (noteToSave) => {
        let savedNote: Note;
        const now = new Date().toISOString();
        if (noteToSave.id) {
          const originalNote = get().getNoteById(noteToSave.id);
          savedNote = { ...originalNote!, ...noteToSave, updatedAt: now };
          set((state) => ({
            notes: state.notes.map((n) => (n.id === noteToSave.id ? savedNote : n)),
          }));
          toast({
            title: "Note Updated",
            description: `"${savedNote.title}" has been saved.`,
          });
        } else {
          savedNote = {
            id: Date.now().toString(),
            createdAt: now,
            updatedAt: now,
            title: 'Untitled Note',
            content: '',
            tags: [],
            type: 'text',
            ...noteToSave,
          };
          set((state) => ({
            notes: [savedNote, ...state.notes],
          }));
          toast({
            title: "Note Created",
            description: `"${savedNote.title}" has been created.`,
          });
        }
        return savedNote;
      },
      addNote: (note) => {
        const now = new Date().toISOString();
        const newNote: Note = {
          id: Date.now().toString(),
          createdAt: now,
          updatedAt: now,
          title: 'New Voice Note',
          content: '',
          tags: ['voice-memo'],
          type: 'voice',
          ...note,
        };
        set((state) => ({
            notes: [newNote, ...state.notes],
        }));
        toast({
            title: "Voice Note Added",
            description: `A new voice note has been created.`,
        });
        return newNote;
      },
      deleteNote: (id: string) => {
        const noteToDelete = get().getNoteById(id);
        if (noteToDelete) {
          set((state) => ({
            notes: state.notes.filter((n) => n.id !== id),
          }));
          toast({
            title: "Note Deleted",
            description: `"${noteToDelete.title}" has been moved to trash.`,
            variant: "destructive",
          });
        }
      },
      deleteAllNotes: () => {
        set({ notes: [] });
        toast({
            title: "All Notes Deleted",
            description: "All notes have been moved to trash.",
            variant: "destructive",
        });
      },
    }),
    {
      name: NOTES_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
            state.isLoading = false;
        }
      },
      partialize: (state) => ({ notes: state.notes }),
    }
  )
);

export function useIsNotesStoreHydrated() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const unsubHydrate = useNotesStore.persist.onHydrate(() => setIsHydrated(false));
    const unsubFinishHydration = useNotesStore.persist.onFinishHydration(() => setIsHydrated(true));

    setIsHydrated(useNotesStore.persist.hasHydrated());

    return () => {
      unsubHydrate();
      unsubFinishHydration();
    };
  }, []);

  return isHydrated;
}
