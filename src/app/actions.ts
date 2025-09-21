'use server';

import { suggestTags } from '@/ai/flows/smart-tagging';
import { chat } from '@/ai/flows/chat';
import { z } from 'zod';

const noteContentSchema = z.string().min(10, 'Note content must be at least 10 characters long.');

export type FormState = {
  status: 'idle' | 'loading' | 'success' | 'error';
  tags?: string[];
  message?: string;
};

export async function suggestNoteTags(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const noteContent = formData.get('content') as string;

  const validation = noteContentSchema.safeParse(noteContent);
  if (!validation.success) {
    return {
      status: 'error',
      message: validation.error.errors.map((e) => e.message).join(', '),
    };
  }
  
  try {
    const result = await suggestTags({ noteContent });
    if (result.tags && result.tags.length > 0) {
      return { status: 'success', tags: result.tags };
    } else {
      return { status: 'error', message: 'No tags were suggested. Try adding more content.' };
    }
  } catch (error) {
    console.error(error);
    return { status: 'error', message: 'An unexpected error occurred while suggesting tags.' };
  }
}

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

const ChatActionInputSchema = z.object({
  history: z.array(MessageSchema),
  message: z.string(),
});

export type ChatState = {
  status: 'idle' | 'loading' | 'success' | 'error';
  response?: string;
  message?: string;
};

export async function chatWithBot(
  prevState: ChatState,
  formData: FormData
): Promise<ChatState> {
  const parsedData = ChatActionInputSchema.safeParse({
    history: JSON.parse(formData.get('history') as string || '[]'),
    message: formData.get('message') as string,
  });

  if (!parsedData.success) {
    return {
      status: 'error',
      message: parsedData.error.errors.map((e) => e.message).join(', '),
    };
  }

  try {
    const result = await chat(parsedData.data);
    return { status: 'success', response: result.response };
  } catch (error) {
    console.error(error);
    return { status: 'error', message: 'An unexpected error occurred.' };
  }
}
