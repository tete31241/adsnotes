export type Note = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  type: 'text' | 'voice';
  audioUrl?: string;
  createdAt: string;
  updatedAt: string;
};
