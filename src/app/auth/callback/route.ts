import { getErrorRedirect, getStatusRedirect } from '@/lib/helpers';
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// biome-ignore lint/style/useNamingConvention: <explanation>
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = createClient();

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return NextResponse.redirect(
        getErrorRedirect(`${requestUrl.origin}/`, error.name, 'Não foi possível autenticar!'),
      );
    }
  }

  return NextResponse.redirect(
    getStatusRedirect(`${requestUrl.origin}/battle`, 'Sucesso!', 'Agora você pode batalhar'),
  );
}
