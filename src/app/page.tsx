'use client';
import OauthSignIn from '@/components/oauth-signin';
// import { EmployeeForm } from "@/components/employee-form";
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';

export default function Home() {
  async function login() {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'azure',
      options: {
        scopes: 'email',
      },
    });
    console.log(data);
  }

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
