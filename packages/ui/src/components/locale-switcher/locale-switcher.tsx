import { Flex, Text, VisuallyHidden } from '@radix-ui/themes';
import { useTranslations } from 'next-intl';

import { LocaleSwitcherClient } from './locale-switcher-client';

interface LocaleSwitcherProps {
  locale: string;
}

export const LocaleSwitcher = ({ locale, ...props }: LocaleSwitcherProps) => {
  const t = useTranslations('LocaleSwitcher');

  return (
    <Text as={'label'} size={'2'} {...props}>
      <Flex align={'center'} gap={'2'}>
        <VisuallyHidden>{t('label')}</VisuallyHidden>
        <LocaleSwitcherClient
          locale={locale}
          translations={{
            locales: {
              en: t('locales.en'),
              fi: t('locales.fi'),
            },
          }}
        />
      </Flex>
    </Text>
  );
};
