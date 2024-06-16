'use client';

import type { User } from '@supabase/supabase-js';
import { Crown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';

type Props = {
  user?: User;
};

export function Ranking(props: Props) {
  return (
    <div className="flex flex-col gap-2 mt-10">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Melhores commitadores</h3>

      <RankedUser />
      <RankedUser />
      <RankedUser />
      <RankedUser />
    </div>
  );
}

function RankedUser() {
  return (
    <Card>
      <CardHeader className="flex flex-row gap-3 items-center p-4 justify-between">
        <div className="flex flex-row gap-3 items-center">
          <Avatar>
            <AvatarImage src={undefined} alt="@shadcn" />
            <AvatarFallback>VM</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>Victor Mesquita</CardTitle>
            <CardDescription>100 pontos</CardDescription>
          </div>
        </div>

        <Crown className="text-amber-400" />
      </CardHeader>
    </Card>
  );
}
