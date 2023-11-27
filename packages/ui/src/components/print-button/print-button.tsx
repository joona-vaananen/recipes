import { useTranslations } from 'next-intl';
import { PrintButtonClient } from './print-button-client';

export const PrintButton = () => {
  const t = useTranslations('PrintButton');

  return (
    <PrintButtonClient
      translations={{
        label: t('label'),
      }}
    />
  );
};
