'use server';

/**
 * @fileOverview Implements a chat flow that uses the Gemini API to respond to user messages.
 * 
 * - chat - A function that takes the chat history and a new message and returns the AI's response.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { Message } from 'genkit/experimental/ai';

const MessageSchema = z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
});

const ChatInputSchema = z.object({
    history: z.array(MessageSchema),
    message: z.string().describe('The user\'s message.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
    response: z.string().describe('The AI\'s response.'),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
    return chatFlow(input);
}

const chatFlow = ai.defineFlow(
    {
        name: 'chatFlow',
        inputSchema: ChatInputSchema,
        outputSchema: ChatOutputSchema,
    },
    async (input) => {
        const { history, message } = input;

        const historyMessages: Message[] = history.map((msg) => ({
            role: msg.role,
            content: [{ text: msg.content }],
        }));
        
        const { output } = await ai.generate({
            history: historyMessages,
            prompt: message,
            model: 'googleai/gemini-2.5-flash',
            config: {
                temperature: 0.7,
            },
        });

        return { response: output!.text! };
    }
);
