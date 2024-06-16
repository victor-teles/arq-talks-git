'use client';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Logo from './icons/logo';
import { Label } from './ui/label';
import { Switch } from './ui/switch';

export default function Header() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function onHideColeguinhasChanged(checked: boolean) {
    const params = new URLSearchParams(searchParams);
    if (checked) {
      params.set('hideColeguinhas', String(checked));
    } else {
      params.delete('hideColeguinhas');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <header className={'flex items-center justify-between border-b border-zinc-900 h-16 px-6'}>
      <div className={'max-w-14 flex items-center p-2 m-4'}>
        <Link href="/" className={'w-14 flex'}>
          <Logo />
        </Link>
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="hide-coleguinhas" onCheckedChange={onHideColeguinhasChanged} />
        <Label htmlFor="hide-coleguinhas">Não quero ver meus colegas</Label>
      </div>
    </header>
  );
}
