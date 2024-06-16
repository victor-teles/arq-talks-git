'use client';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Logo from './icons/logo';
import { Label } from './ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Switch } from './ui/switch';

type Props = {
  hideControls?: boolean;
};

export default function Header(props: Props) {
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
  function onColeguinhasCountChanged(value: string) {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('coleguinhasToShow', String(value));
    } else {
      params.delete('coleguinhasToShow');
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

      {!props.hideControls && (
        <div className="flex items-center space-x-4">
          <Select defaultValue="10" onValueChange={onColeguinhasCountChanged}>
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder="Colegas" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Número de cursores na tela</SelectLabel>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="30">30</SelectItem>
                <SelectItem value="40">40</SelectItem>
                <SelectItem value="50">50+</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Separator orientation="vertical" />
          <Switch id="hide-coleguinhas" onCheckedChange={onHideColeguinhasChanged} />
          <Label htmlFor="hide-coleguinhas">Não quero ver meus colegas</Label>
        </div>
      )}
    </header>
  );
}
