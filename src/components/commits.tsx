'use client';

import type { Tables } from '@/lib/database.types';
import { createClient } from '@/lib/supabase/client';
import { getInitials } from '@/lib/utils';
import { useSuspenseQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import relativeTime from 'dayjs/plugin/relativeTime';

import { listCommits } from '@/lib/supabase/queries';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';

dayjs.extend(relativeTime);
dayjs.locale('pt-br');

type Commit = Tables<'commits'>;

const supabase = createClient();

export function Commits() {
  const listCommitsQuery = useSuspenseQuery({
    refetchInterval: 10 * 1000,
    queryKey: ['listCommits'],
    queryFn: () => listCommits(supabase),
  });
  const commits = listCommitsQuery.data;
  const noCommit = !commits || commits?.length === 0;

  return (
    <div className="flex flex-col gap-2 mt-10">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Últimos 10 commits</h3>

      <div className="max-h-96 overflow-scroll flex flex-col gap-2">
        {noCommit && (
          <Card className="border-dashed">
            <CardHeader>
              <CardTitle>Sem commits</CardTitle>
              <CardDescription>Ainda não foi feito nenhum commit!</CardDescription>
            </CardHeader>
          </Card>
        )}

        {commits?.map((commit) => (
          <CommitMessage key={commit.id} commit={commit} />
        ))}
      </div>
    </div>
  );
}

function CommitMessage({ commit }: { commit: Commit }) {
  return (
    <Card>
      <CardHeader className="flex flex-row gap-3 items-center p-4 justify-between">
        <div className="flex flex-row gap-3 items-center">
          <Avatar>
            <AvatarImage src={commit.pictureUrl} alt={commit.author} />
            <AvatarFallback>{getInitials(commit.author)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{commit.title}</CardTitle>
            <CardDescription>
              {commit.author} comitou {dayjs(commit.createdAt).fromNow()}
            </CardDescription>
          </div>
        </div>

        <Badge>
          {commit.points < 0 ? '' : '+'}
          {commit.points} pontos
        </Badge>
      </CardHeader>
    </Card>
  );
}
