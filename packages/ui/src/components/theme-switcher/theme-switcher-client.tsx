'use client';

import { AccessibleIcon, IconButton } from '@radix-ui/themes';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface ThemeSwitcherClientProps
  extends React.ComponentPropsWithoutRef<typeof IconButton> {
  translations: {
    toggle: string;
  };
}

export const ThemeSwitcherClient = ({
  translations,
  ...props
}: ThemeSwitcherClientProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const { theme = 'light', setTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onClick = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <IconButton
      className={'h-5 w-5'}
      onClick={onClick}
      variant={'ghost'}
      {...props}
    >
      {isMounted ? (
        <AccessibleIcon label={translations.toggle}>
          {theme === 'light' ? (
            <Sun className={'h-5 w-5'} />
          ) : (
            <Moon className={'h-5 w-5'} />
          )}
        </AccessibleIcon>
      ) : null}
    </IconButton>
  );
};
