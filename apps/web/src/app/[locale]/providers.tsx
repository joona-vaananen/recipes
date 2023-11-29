'use client';

import { Theme } from '@radix-ui/themes';
import { LocaleSwitcherProvider, UserProvider } from '@recipes/ui';
import { NextIntlClientProvider, type AbstractIntlMessages } from 'next-intl';
import { ThemeProvider } from 'next-themes';

interface ProvidersProps {
  children: React.ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
  timeZone: string;
}

export const Providers = ({
  children,
  locale,
  messages,
  timeZone,
}: ProvidersProps) => {
  return (
    <UserProvider>
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
        timeZone={timeZone}
      >
        <LocaleSwitcherProvider>
          <ThemeProvider attribute={'class'}>
            <Theme accentColor={'ruby'}>{children}</Theme>
          </ThemeProvider>
        </LocaleSwitcherProvider>
      </NextIntlClientProvider>
    </UserProvider>
  );
};
