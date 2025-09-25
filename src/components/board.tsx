'use client';
import NoteCard from '@/components/note-card';
import { useNotes } from '@/hooks/use-notes';
import { motion } from 'framer-motion';

export default function Board() {
  const { notes } = useNotes();
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Canvas Board</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {notes.map((note, index) => {
          return (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <NoteCard note={note} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
