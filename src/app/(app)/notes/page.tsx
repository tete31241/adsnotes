'use client';

import NoteList from '@/components/note-list';
import { useNotes } from '@/hooks/use-notes';

export default function NotesPage() {
    const { notes } = useNotes();
    
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">All Notes</h1>
            <NoteList notes={notes} />
        </div>
    );
}
