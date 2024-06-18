'use client';
import { GameProvider } from '@/lib/game-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function Provider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <GameProvider>{children}</GameProvider>
    </QueryClientProvider>
  );
}
