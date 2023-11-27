import { useTranslations } from 'next-intl';
import { WakeLockSwitchClient } from './wake-lock-switch-client';

type WakeLockSwitchProps = Omit<
  React.ComponentPropsWithoutRef<typeof WakeLockSwitchClient>,
  'translations'
>;

export const WakeLockSwitch = (props: WakeLockSwitchProps) => {
  const t = useTranslations('WakeLockSwitch');

  return (
    <WakeLockSwitchClient
      translations={{
        label: t('label'),
        unsupported: t('unsupported'),
      }}
      {...props}
    />
  );
};
