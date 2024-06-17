'use client';

import type { TablesInsert } from '@/lib/database.types';
import { createCommit } from '@/lib/queries';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/auth-js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GitGraph } from 'lucide-react';
import { useCallback, useState } from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

type Commit = TablesInsert<'commits'>;
type Props = {
  user: User;
};

const supabase = createClient();

export function AddCommit(props: Props) {
  const [title, setTitle] = useState('');
  const createCommitMutation = useMutation({
    mutationKey: ['createCommit'],
    mutationFn: (commit: Commit) => createCommit(supabase, commit),
  });
  const queryClient = useQueryClient();

  const createCommitSubmit = useCallback(async () => {
    const author = props.user?.user_metadata?.name ?? 'Desconhecido';
    const pictureUrl = props.user?.user_metadata?.picture ?? `https://avatar.vercel.sh/${author}`;

    await createCommitMutation.mutateAsync({
      title,
      createdAt: new Date().toISOString(),
      author,
      pictureUrl,
      userId: props.user.id,
      points: 0,
    });

    await queryClient.invalidateQueries({ queryKey: ['listCommits'], refetchType: 'all' });
    setTitle('');
  }, [createCommitMutation, title]);

  return (
    <form className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
      <Label htmlFor="message" className="sr-only">
        Message
      </Label>
      <Textarea
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        id="message"
        placeholder="Escreve sua mensagem de commit..."
        className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
      />
      <div className="flex items-center p-3 pt-0">
        <Button
          type="button"
          size="sm"
          className="ml-auto gap-1.5"
          isLoading={createCommitMutation.isPending}
          onClick={createCommitSubmit}
        >
          Commit
          <GitGraph className="size-3.5" />
        </Button>
      </div>
    </form>
  );
}
