'use client';

import { TIME_ZONE } from '@/constants';
import { Theme } from '@radix-ui/themes';
import { LocaleSwitcherProvider, UserProvider } from '@recipes/ui';
import { NextIntlClientProvider, type AbstractIntlMessages } from 'next-intl';
import { ThemeProvider } from 'next-themes';

interface ProvidersProps {
  children: React.ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
}

export const Providers = ({ children, locale, messages }: ProvidersProps) => {
  return (
    <UserProvider>
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
        timeZone={TIME_ZONE}
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
