'use client';

import { Callout, Flex, Switch, Text } from '@radix-ui/themes';
import { AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { useWakeLock } from 'react-screen-wake-lock';

interface WakeLockSwitchClientProps
  extends React.ComponentPropsWithoutRef<typeof Flex> {
  translations: {
    label: string;
    unsupported: string;
  };
}

export const WakeLockSwitchClient = ({
  translations,
  ...props
}: WakeLockSwitchClientProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isUnsupported, setIsUnsupported] = useState(false);
  const { isSupported, release, request } = useWakeLock();

  const onCheckedChange = (isChecked: boolean) => {
    if (!isSupported) {
      setIsUnsupported(true);

      return;
    }

    setIsChecked(isChecked);

    if (isChecked) {
      void request();
    } else {
      void release();
    }
  };

  return (
    <Flex align={'start'} direction={'column'} gap={'4'} {...props}>
      <Text as={'label'} size={'2'}>
        <Flex gap={'2'}>
          <Switch
            disabled={isUnsupported}
            onCheckedChange={(checked) => void onCheckedChange(checked)}
            checked={isChecked}
          />
          {translations.label}
        </Flex>
      </Text>
      {isUnsupported ? (
        <Callout.Root className={'w-fit'}>
          <Callout.Icon>
            <AlertTriangle
              className={'h-4 w-4 stroke-[var(--accent-a11)]'}
              color={'red'}
              role={'alert'}
            />
          </Callout.Icon>
          <Callout.Text>{translations.unsupported}</Callout.Text>
        </Callout.Root>
      ) : null}
    </Flex>
  );
};
