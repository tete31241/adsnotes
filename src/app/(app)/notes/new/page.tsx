import NoteEditorWrapper from '@/components/note-editor-wrapper';

export default function NewNotePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">New Note</h1>
      <NoteEditorWrapper />
    </div>
  );
}
