'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Mic, StopCircle, Play, Save } from 'lucide-react';
import { useNotes } from '@/hooks/use-notes';

export default function VoiceRecorder() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { addNote } = useNotes();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleStartRecording = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };
        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
          const audioUrl = URL.createObjectURL(audioBlob);
          setAudioURL(audioUrl);
          audioChunksRef.current = [];
        };
        mediaRecorderRef.current.start();
        setIsRecording(true);
        setAudioURL('');
      } catch (err) {
        console.error('Error accessing microphone:', err);
      }
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSaveNote = () => {
    addNote({ type: 'voice', audioUrl: audioURL });
    setIsOpen(false);
    setAudioURL('');
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      if (isRecording) {
        handleStopRecording();
      }
      setAudioURL('');
    }
    setIsOpen(open);
  }

  if (!isMounted) {
    return null;
  }
  
  return (
    <>
      <Button variant="outline" size="icon" onClick={() => handleOpenChange(true)} aria-label="Record Voice Note">
        <Mic className="h-4 w-4" />
      </Button>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Record Voice Note</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center gap-4 py-8">
            {!isRecording ? (
              <Button size="lg" className="h-20 w-20 rounded-full" onClick={handleStartRecording} disabled={!isMounted}>
                <Mic className="h-8 w-8" />
              </Button>
            ) : (
              <Button size="lg" variant="destructive" className="h-20 w-20 rounded-full" onClick={handleStopRecording}>
                <StopCircle className="h-8 w-8 animate-pulse" />
              </Button>
            )}
            {audioURL && (
              <div className="w-full">
                <audio src={audioURL} controls className="w-full" />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => handleOpenChange(false)}>Cancel</Button>
            <Button onClick={handleSaveNote} disabled={!audioURL}>
              <Save className="mr-2 h-4 w-4" /> Save Note
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
