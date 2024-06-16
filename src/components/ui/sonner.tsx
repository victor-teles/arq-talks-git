'use client';

import { useTheme } from 'next-themes';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { Toaster as Sonner, toast } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      const status = searchParams.get('status');
      const statusDescription = searchParams.get('status_description');
      const error = searchParams.get('error');
      const errorDescription = searchParams.get('error_description');
      if (error || status) {
        toast(error ? error ?? 'Hmm... Algo deu errado.' : status ?? 'Certo!', {
          description: error ? errorDescription : statusDescription,

          action: {
            label: 'Ok',
            onClick: () => console.log('Ok'),
          },
        });

        const newSearchParams = new URLSearchParams(searchParams.toString());
        const paramsToRemove = ['error', 'status', 'status_description', 'error_description'];

        for (const param of paramsToRemove) {
          newSearchParams.delete(param);
        }
        const redirectPath = `${pathname}?${newSearchParams.toString()}`;
        router.replace(redirectPath, { scroll: false });
      }
      isFirstRender.current = false;
    }
  }, [searchParams]);

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
