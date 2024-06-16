'use client';

import type { User } from '@supabase/supabase-js';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';

type Props = {
  user?: User;
};

export function Commits(props: Props) {
  return (
    <div className="flex flex-col gap-2 mt-10">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Últimos 10 commits</h3>

      <div className="max-h-96 overflow-scroll flex flex-col gap-2">
        <CommitMessage />
        <CommitMessage />
        <CommitMessage />
        <CommitMessage />
        <CommitMessage />
        <CommitMessage />
        <CommitMessage />
        <CommitMessage />
        <CommitMessage />
        <CommitMessage />
      </div>
    </div>
  );
}

function CommitMessage() {
  return (
    <Card>
      <CardHeader className="flex flex-row gap-3 items-center p-4 justify-between">
        <div className="flex flex-row gap-3 items-center">
          <Avatar>
            <AvatarImage src={undefined} alt="@shadcn" />
            <AvatarFallback>VM</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>feat: added very red text</CardTitle>
            <CardDescription>victor-teles committed 2 weeks ago</CardDescription>
          </div>
        </div>

        <Badge>+10 pontos</Badge>
      </CardHeader>
    </Card>
  );
}
