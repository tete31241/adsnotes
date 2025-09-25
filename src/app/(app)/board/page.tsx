import Board from '@/components/board';
import { Suspense } from 'react';

export default function BoardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Board />
    </Suspense>
  );
}
