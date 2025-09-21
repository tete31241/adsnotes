import type { Note } from './types';

export const initialNotes: Note[] = [
  {
    id: '1',
    title: 'Meeting Notes 2024-07-23',
    content: 'Discussed Q3 roadmap. Key takeaways: focus on user engagement, and finalize the new feature launch by September. Action items assigned to John (Design) and Jane (Development).',
    tags: ['work', 'meeting', 'q3-roadmap'],
    type: 'text',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
  },
  {
    id: '2',
    title: 'Brainstorming: New App Idea',
    content: 'A social network for pets. Users can create profiles for their pets, share photos, and connect with other pet owners. Monetization through a premium subscription with advanced features like "pet playdate" scheduling.',
    tags: ['ideas', 'startup', 'pets'],
    type: 'text',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 4)).toISOString(),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 4)).toISOString(),
  },
  {
    id: '3',
    title: 'Grocery List',
    content: '- Milk\n- Bread\n- Eggs\n- Cheese\n- Apples\n- Chicken breast',
    tags: ['personal', 'shopping'],
    type: 'text',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
  },
  {
    id: '4',
    title: 'Book Recommendations',
    content: '1. "Dune" by Frank Herbert - classic sci-fi.\n2. "Project Hail Mary" by Andy Weir - fun and engaging.\n3. "The Three-Body Problem" by Cixin Liu - mind-bending concepts.',
    tags: ['reading', 'books', 'sci-fi'],
    type: 'text',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
  },
  {
    id: '5',
    title: 'Voice Memo: Quick Idea',
    content: 'A quick thought about the AdNotes app design. Maybe we can add customizable themes.',
    tags: ['voice-memo', 'app-dev'],
    type: 'voice',
    audioUrl: '', // Placeholder for audio
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
  },
];
