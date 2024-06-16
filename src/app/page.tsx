'use client';
import OauthSignIn from '@/components/oauth-signin';

export default function Home() {
  return (
    <main className="flex h-[calc(100%-64px)] flex-col items-center justify-between container  py-24">
      <div className="flex flex-col gap-4 h-52 justify-between items-center">
        <span className="flex flex-col items-center">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-6xl">
            ArqTalks - Do GIT ao desenvolvimento
          </h1>

          <p className="text-xl text-muted-foreground mt-4">19 Junho 2024 | Batalha de commits</p>
        </span>
        <OauthSignIn />
      </div>
    </main>
  );
}
