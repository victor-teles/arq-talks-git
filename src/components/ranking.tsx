'use client';

import type { Database, Tables } from '@/lib/database.types';
import { listRanking } from '@/lib/queries';
import { createClient } from '@/lib/supabase/client';
import { cn, getInitials } from '@/lib/utils';
import type { User } from '@supabase/supabase-js';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Crown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';

type Props = {
  user?: User;
};
type Ranking = Tables<'ranking'>;

const supabase = createClient();

export function Ranking(props: Props) {
  const listRankingQuery = useSuspenseQuery({
    refetchInterval: 10 * 1000,
    queryKey: ['listRanking'],
    queryFn: () => listRanking(supabase),
  });
  const ranking = listRankingQuery.data;

  const noRanking = !ranking || ranking?.length === 0;

  return (
    <div className="flex flex-col gap-2 mt-10">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Melhores commitadores</h3>

      {noRanking && (
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle>Sem ganhadores</CardTitle>
            <CardDescription>Ainda não temos nenhum ganhador!</CardDescription>
          </CardHeader>
        </Card>
      )}

      {ranking?.map((ranking, i) => (
        <RankedUser key={ranking.userId} ranking={ranking} position={i} />
      ))}
    </div>
  );
}

function RankedUser({ ranking, position }: { ranking: Ranking; position: number }) {
  const positionColor = {
    0: 'text-amber-400',
    1: 'text-slate-400',
    2: 'text-yellow-700',
  };

  const hasCrown = Object.hasOwn(positionColor, position);
  return (
    <Card>
      <CardHeader className="flex flex-row gap-3 items-center p-4 justify-between">
        <div className="flex flex-row gap-3 items-center">
          <Avatar>
            <AvatarImage src={ranking.pictureUrl ?? undefined} alt={ranking.author ?? undefined} />
            <AvatarFallback>{getInitials(ranking.author)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{ranking.author}</CardTitle>
            <CardDescription>{ranking.sum} pontos</CardDescription>
          </div>
        </div>
        {/* @ts-ignore */}
        {hasCrown && <Crown className={cn(positionColor[position])} />}
      </CardHeader>
    </Card>
  );
}
