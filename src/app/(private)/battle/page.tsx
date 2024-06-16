import { AddCommit } from '@/components/add-commit';
import { Commits } from '@/components/commits';
import { Files } from '@/components/files';
import { Ranking } from '@/components/ranking';
import { RealTimeCursors } from '@/components/realtime-cursors';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getUser } from '@/lib/supabase/queries';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function Battle({
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const supabase = createClient();
  const [user] = await Promise.all([getUser(supabase)]);
  const hideColegas = Boolean(searchParams.hideColeguinhas);

  if (!user) {
    return redirect('/');
  }

  return (
    <div>
      {!hideColegas && <RealTimeCursors user={user} />}

      <ResizablePanelGroup direction="horizontal" className="min-h-[calc(100vh-64px)] border">
        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={75}>
              <div className="p-6">
                <Files />
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={25}>
              <div className="p-6">
                <AddCommit />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          <div className="p-6">
            <Tabs defaultValue="commits">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="commits">Commits</TabsTrigger>
                <TabsTrigger value="ranking">Ranking</TabsTrigger>
              </TabsList>
              <TabsContent value="ranking">
                <Ranking />
              </TabsContent>
              <TabsContent value="commits">
                <Commits />
              </TabsContent>
            </Tabs>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
