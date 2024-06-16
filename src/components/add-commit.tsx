'use client';

import type { User } from '@supabase/supabase-js';
import { GitGraph } from 'lucide-react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

type Props = {
  user?: User;
};

export function AddCommit(props: Props) {
  return (
    <form className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
      <Label htmlFor="message" className="sr-only">
        Message
      </Label>
      <Textarea
        id="message"
        placeholder="Escreve sua mensagem de commit..."
        className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
      />
      <div className="flex items-center p-3 pt-0">
        <Button type="submit" size="sm" className="ml-auto gap-1.5">
          Commit
          <GitGraph className="size-3.5" />
        </Button>
      </div>
    </form>
  );
}
