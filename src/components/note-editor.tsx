'use client';

import { useState, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Tag, Trash2, X, Loader2, Save } from 'lucide-react';
import type { Note } from '@/lib/types';
import { useNotes } from '@/hooks/use-notes';
import { suggestNoteTags, FormState } from '@/app/actions';

interface NoteEditorProps {
  note?: Note;
}

const initialState: FormState = { status: 'idle' };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Sparkles className="mr-2 h-4 w-4" />
      )}
      Suggest Tags
    </Button>
  );
}

export default function NoteEditor({ note }: NoteEditorProps) {
  const router = useRouter();
  const { saveNote, deleteNote } = useNotes();
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [tags, setTags] = useState<string[]>(note?.tags || []);
  const [tagInput, setTagInput] = useState('');
  
  const [formState, formAction] = useFormState(suggestNoteTags, initialState);

  useEffect(() => {
    if (formState.status === 'success' && formState.tags) {
      const newTags = formState.tags.filter(t => !tags.includes(t));
      setTags(prevTags => [...prevTags, ...newTags]);
    }
  }, [formState]);


  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim().toLowerCase();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const handleSave = () => {
    const noteToSave = {
      id: note?.id,
      title: title || 'Untitled Note',
      content,
      tags,
      type: note?.type || 'text',
      audioUrl: note?.audioUrl,
    };
    saveNote(noteToSave as any);
  };

  const handleDelete = () => {
    if (note && window.confirm('Are you sure you want to delete this note?')) {
      deleteNote(note.id);
    }
  }

  return (
    <div className="space-y-6 pb-20">
      <Input
        placeholder="Note Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="text-2xl font-bold border-0 shadow-none focus-visible:ring-0 h-auto p-0"
      />
      <Textarea
        placeholder="Start writing..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[40vh] text-base"
        name="content" // for formAction
      />

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Tag className="h-5 w-5" /> Tags
          </h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-base py-1 pl-3 pr-1">
                {tag}
                <button onClick={() => removeTag(tag)} className="ml-2 rounded-full hover:bg-muted-foreground/20 p-0.5">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-4">
            <Input
              placeholder="Add a tag and press Enter"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagInputKeyDown}
            />
            <form action={formAction}>
              <input type="hidden" name="content" value={content} />
              <SubmitButton />
            </form>
          </div>
           {formState?.message && <p className="text-destructive text-sm mt-2">{formState.message}</p>}
        </CardContent>
      </Card>
      
      <div className="fixed bottom-14 right-0 left-0 md:left-[--sidebar-width-icon] p-4 bg-background/80 backdrop-blur-sm border-t flex justify-end gap-4">
        {note && (
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </Button>
        )}
        <Button onClick={() => router.push('/notes')}>Cancel</Button>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" /> Save Note
        </Button>
      </div>
    </div>
  );
}
