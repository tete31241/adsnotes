import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Note } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';
import { Mic, FileText } from 'lucide-react';

interface NoteCardProps {
  note: Note;
}

export default function NoteCard({ note }: NoteCardProps) {
  const contentSnippet = note.content.substring(0, 100) + (note.content.length > 100 ? '...' : '');

  return (
    <Link href={`/notes/${note.id}/edit`} className="block">
      <Card className="flex h-full flex-col hover:shadow-md transition-shadow duration-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            {note.type === 'voice' ? <Mic className="h-5 w-5 text-primary" /> : <FileText className="h-5 w-5 text-primary" />}
            <span className="truncate">{note.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 text-sm text-muted-foreground">
          {note.type === 'text' && <p>{contentSnippet}</p>}
          {note.type === 'voice' && note.audioUrl && (
             <audio src={note.audioUrl} controls className="w-full h-10" />
          )}
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2">
          <div className="flex flex-wrap gap-1">
            {note.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <p className="text-xs text-muted-foreground pt-2">
            Updated {formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}
