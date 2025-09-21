'use client';
import NoteCard from '@/components/note-card';
import { useNotes } from '@/hooks/use-notes';
import { motion } from 'framer-motion';

export default function BoardPage() {
  const { notes } = useNotes();
  
  // Pre-calculated positions for a dynamic but consistent look
  const positions = [
    { rotate: -2, x: 0, y: 0 }, { rotate: 1.5, x: 280, y: 50 }, { rotate: -1, x: 560, y: 20 },
    { rotate: 2.5, x: 840, y: 60 }, { rotate: -3, x: 10, y: 350 }, { rotate: 1, x: 290, y: 400 },
    { rotate: 3, x: 570, y: 360 }, { rotate: -1.5, x: 850, y: 420 }, { rotate: 2, x: 0, y: 700 },
    { rotate: -2, x: 280, y: 750 }, { rotate: 1, x: 560, y: 720 }, { rotate: -2.5, x: 840, y: 780 }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Canvas Board</h1>
      <div className="relative h-[1200px] w-full overflow-auto p-4">
        {notes.map((note, index) => {
          const pos = positions[index % positions.length];
          return (
            <motion.div
              key={note.id}
              className="absolute w-[260px]"
              style={{
                top: `${pos.y}px`,
                left: `${pos.x}px`,
              }}
              initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: pos.rotate }}
              transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
              drag
              dragConstraints={{ top: -20, left: -20, right: 1000, bottom: 1000 }}
            >
              <NoteCard note={note} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
