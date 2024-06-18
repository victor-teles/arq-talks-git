'use client';

import { CommitGame } from '@/lib/commit-game';
import type { Tables, TablesInsert } from '@/lib/database.types';
import { useGame } from '@/lib/game-provider';
import { createClient } from '@/lib/supabase/client';
import { createCommit } from '@/lib/supabase/queries';
import type { User } from '@supabase/auth-js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { GitGraph } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

type Commit = TablesInsert<'commits'>;
type Game = Tables<'game'>;

type Props = {
  user: User;
  game: Game | null;
};

const supabase = createClient();

export function AddCommit(props: Props) {
  const { game, startGame, update } = useGame();

  const [title, setTitle] = useState('');
  const createCommitMutation = useMutation({
    mutationKey: ['createCommit'],
    mutationFn: (commit: Commit) => createCommit(supabase, commit),
  });
  const queryClient = useQueryClient();

  const createCommitSubmit = useCallback(async () => {
    if (!title) {
      toast('Commit vazio??! vou fingir que não vi!', {
        action: {
          label: 'Me perdoe, errei',
          onClick: () => console.log('Ok'),
        },
      });
      return;
    }
    const author = props.user?.user_metadata?.name ?? 'Desconhecido';
    const pictureUrl = props.user?.user_metadata?.picture ?? `https://avatar.vercel.sh/${author}`;

    const commitMessage = title?.trim();
    const points = game?.addCommit(commitMessage);

    await createCommitMutation.mutateAsync({
      title: commitMessage,
      createdAt: new Date().toISOString(),
      author,
      pictureUrl,
      userId: props.user.id,
      points: points ?? 0,
    });

    await queryClient.invalidateQueries({ queryKey: ['listCommits'], refetchType: 'all' });
    setTitle('');

    if (game) {
      game.getNextFile();
      game.maybeFinishTheGame();
      await game.update();
      update(game);
    }
  }, [createCommitMutation, title]);

  useEffect(() => {
    startGame(
      props.user.id,
      props.game?.filePosition ?? 0,
      props.game?.finishedAt ? dayjs(props.game?.finishedAt).toDate() : undefined,
    );
  }, []);

  return (
    <form className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
      <Label htmlFor="message" className="sr-only">
        Message
      </Label>
      <Textarea
        required
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
          disabled={game?.isFinished()}
        >
          Commit
          <GitGraph className="size-3.5" />
        </Button>
      </div>
    </form>
  );
}
