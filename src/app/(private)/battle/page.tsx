import { AddCommit } from '@/components/add-commit';
import { Commits } from '@/components/commits';
import { FilesDiff } from '@/components/files-diff';
import { FilesThree } from '@/components/files-three';
import { Ranking } from '@/components/ranking';
import { RealTimeCursors } from '@/components/realtime-cursors';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getGame, getUser } from '@/lib/supabase/queries';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import '@/lib/commit-game';

export default async function Battle({
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const supabase = createClient();
  const [user] = await Promise.all([getUser(supabase)]);

  const hideColegas = Boolean(searchParams.hideColeguinhas);
  const colegasToShow = searchParams.coleguinhasToShow ? Number(searchParams.coleguinhasToShow) : 10;

  if (!user) {
    return redirect('/');
  }
  const [game] = await Promise.all([getGame(supabase, user.id)]);

  return (
    <div>
      <RealTimeCursors user={user} hideColegas={hideColegas} colegasToShow={colegasToShow} />

      <ResizablePanelGroup direction="horizontal" className="min-h-[calc(100vh-64px)] border">
        <ResizablePanel defaultSize={35}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={75}>
              <div className="p-6">
                <FilesThree />
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={25}>
              <div className="p-6">
                <AddCommit user={user} game={game} />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={65}>
          <div className="p-6">
            <Tabs defaultValue="commits">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="files">Arquivos</TabsTrigger>
                <TabsTrigger value="commits">Commits</TabsTrigger>
                <TabsTrigger value="ranking">Ranking</TabsTrigger>
              </TabsList>
              <TabsContent value="files">
                <FilesDiff />
              </TabsContent>
              <TabsContent value="ranking">
                <Suspense fallback={<p className="leading-7 [&:not(:first-child)]:mt-6">Carregando ranking...</p>}>
                  <Ranking user={user} />
                </Suspense>
              </TabsContent>
              <TabsContent value="commits">
                <Suspense fallback={<p className="leading-7 [&:not(:first-child)]:mt-6">Carregando commits...</p>}>
                  <Commits />
                </Suspense>
              </TabsContent>
            </Tabs>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
