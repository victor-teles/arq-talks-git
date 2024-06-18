'use client';

import { useGame } from '@/lib/game-provider';
import type { User } from '@supabase/supabase-js';
import { FilePlus2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Skeleton } from './ui/skeleton';

type Props = {
  user?: User;
};

export function FilesThree(props: Props) {
  const { game } = useGame();

  return (
    <div className="flex flex-col gap-2 mt-10">
      {!game && <Skeleton className="h-[125px] w-full rounded-xl" />}

      {game?.isFinished() && (
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle>Parabéns 🎉</CardTitle>
            <CardDescription>Você commitou todos os arquivos alterados!</CardDescription>
          </CardHeader>
        </Card>
      )}

      {game && !game.isFinished() && (
        <Card>
          <CardHeader>
            <CardTitle>Arquivos alterados</CardTitle>
            <CardDescription>Escreva seus commits com base nesses arquivos.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center">
            <div className="flex items-center gap-2 cursor-pointer">
              <FilePlus2 className="size-4" />
              <p className="text-sm">{game?.getCurrentFile()?.name}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
