import { useTranslations } from 'next-intl';

import { ThemeSwitcherClient } from './theme-switcher-client';

type ThemeSwitcherProps = Partial<React.ComponentPropsWithoutRef<
  typeof ThemeSwitcherClient
>>

export const ThemeSwitcher = (props: ThemeSwitcherProps) => {
  const t = useTranslations('ThemeSwitcher');

  return <ThemeSwitcherClient translations={{ toggle: t('toggle') }} {...props} />;
};
