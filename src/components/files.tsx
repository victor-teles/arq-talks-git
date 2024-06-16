'use client';

import type { User } from '@supabase/supabase-js';
import { FilePlus2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

type Props = {
  user?: User;
};

export function Files(props: Props) {
  return (
    <div className="flex flex-col gap-2 mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Arquivos alterados</CardTitle>
          <CardDescription>Escreva seus commits com base nesses arquivos.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center">
          <div className="flex items-center gap-2">
            <FilePlus2 className="size-4" />
            <p className="text-sm">Arquivo1.cs</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
