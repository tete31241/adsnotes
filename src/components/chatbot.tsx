'use client';

import { useState, useRef, useEffect, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Loader2, Send, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { chatWithBot, ChatState } from '@/app/actions';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

type Message = {
  role: 'user' | 'model';
  content: string;
};

const initialState: ChatState = { status: 'idle' };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" disabled={pending}>
      {pending ? <Loader2 className="animate-spin" /> : <Send />}
    </Button>
  );
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [formState, formAction] = useActionState(chatWithBot, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [isMobile]);

  useEffect(() => {
    if (formState.status === 'success' && formState.response) {
      setMessages((prev) => [...prev, { role: 'model', content: formState.response! }]);
    }
  }, [formState]);
  
  useEffect(() => {
    if (scrollAreaRef.current) {
        // A slight delay to allow the new message to render
        setTimeout(() => {
            const viewport = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
            if (viewport) {
              viewport.scrollTop = viewport.scrollHeight;
            }
        }, 100);
    }
  }, [messages]);


  const handleFormSubmit = (formData: FormData) => {
    const message = formData.get('message') as string;
    if (!message.trim()) return;

    setMessages((prev) => [...prev, { role: 'user', content: message }]);
    
    const newFormData = new FormData();
    newFormData.append('message', message);
    
    // Pass only the last 10 messages for history
    const recentHistory = messages.slice(-10);
    newFormData.append('history', JSON.stringify(recentHistory));

    formAction(newFormData);
    formRef.current?.reset();
  };

  return (
    <>
        <AnimatePresence>
            {isMobile && (
                 <div className="fixed bottom-20 right-4 z-50">
                    <Button
                    size="icon"
                    className="rounded-full w-14 h-14 shadow-lg"
                    onClick={() => setIsOpen(!isOpen)}
                    >
                    {isOpen ? <X /> : <Bot />}
                    </Button>
                </div>
            )}
        </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={cn(
              "fixed bottom-4 right-4 z-50",
              isMobile ? "w-[calc(100%-2rem)] h-[calc(100vh-10rem)]" : "w-[400px] h-[calc(100vh-5.5rem)] flex flex-col",
              !isMobile && "relative bottom-auto right-auto"
            )}
          >
            <Card className={cn("shadow-2xl w-full h-full flex flex-col")}>
              <CardHeader className="flex-shrink-0 flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Bot /> ADNOTES ASSISTANT
                </CardTitle>
                {isMobile && (
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsOpen(false)}>
                        <X className="h-4 w-4" />
                    </Button>
                )}
              </CardHeader>
              <CardContent className="flex-1 flex flex-col min-h-0">
                <ScrollArea className="flex-1 pr-4 -mr-4" ref={scrollAreaRef}>
                  <div className="space-y-4">
                    {messages.map((msg, index) => (
                      <div
                        key={index}
                        className={cn(
                          'flex items-end gap-2',
                          msg.role === 'user' ? 'justify-end' : 'justify-start'
                        )}
                      >
                        <div
                          className={cn(
                            'max-w-[80%] rounded-lg px-3 py-2 text-sm',
                            msg.role === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          )}
                        >
                          {msg.content}
                        </div>
                      </div>
                    ))}
                     {formState.status === 'loading' && (
                        <div className="flex justify-start">
                           <div className="bg-muted rounded-lg px-3 py-2 text-sm">
                             <Loader2 className="animate-spin h-4 w-4" />
                           </div>
                        </div>
                    )}
                  </div>
                </ScrollArea>
                <form
                  ref={formRef}
                  action={handleFormSubmit}
                  className="mt-4 flex gap-2"
                >
                  <input
                    type="hidden"
                    name="history"
                    value={JSON.stringify(messages.slice(-10))}
                  />
                  <Input name="message" placeholder="Ask anything..." autoComplete="off" />
                  <SubmitButton />
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
