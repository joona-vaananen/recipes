import { useTranslations } from 'next-intl';
import { WakeLockSwitchClient } from './wake-lock-switch-client';

export const WakeLockSwitch = () => {
  const t = useTranslations('WakeLockSwitch');

  return (
    <WakeLockSwitchClient
      translations={{
        label: t('label'),
        unsupported: t('unsupported'),
      }}
    />
  );
};
