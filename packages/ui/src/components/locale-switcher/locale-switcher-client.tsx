'use client';

import { Button, DropdownMenu } from '@radix-ui/themes';
import { ChevronDown } from 'lucide-react';

import { useRouter } from 'next/navigation';
import type { Locale } from '../../lib/utils/navigation';
import { useLocaleSwitcher } from './locale-switcher-context';

interface LocaleSwitcherClientProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenu.Root> {
  locale: string;
  translations: {
    locales: {
      en: string;
      fi: string;
    };
  };
}

export const LocaleSwitcherClient = ({
  locale: currentLocale,
  translations,
  ...props
}: LocaleSwitcherClientProps) => {
  const router = useRouter();
  const { pathnames } = useLocaleSwitcher();
  const pathnameEntries = Object.entries(pathnames);

  const onCheckedChange = (locale: Locale, pathname: string) => {
    router.push(`/${locale}${pathname}`.replace(/\/$/, ''));
  };

  return (
    <DropdownMenu.Root {...props}>
      <DropdownMenu.Trigger>
        <Button variant={'outline'}>
          {translations.locales[currentLocale as Locale]}
          <ChevronDown size={16} />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {pathnameEntries
          .sort(([a], [b]) => a.localeCompare(b, currentLocale))
          .map(([locale, pathname]) => (
            <DropdownMenu.CheckboxItem
              checked={locale === currentLocale}
              key={locale}
              onCheckedChange={() =>
                onCheckedChange(locale as Locale, pathname)
              }
            >
              {translations.locales[locale as Locale]}
            </DropdownMenu.CheckboxItem>
          ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
