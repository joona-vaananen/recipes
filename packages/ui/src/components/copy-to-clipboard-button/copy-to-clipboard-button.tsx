import { useTranslations } from 'next-intl';

import { CopyToClipboardButtonClient } from './copy-to-clipboard-button-client';

interface CopyToClipboardButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  translations: {
    textCopied: string;
  };
}

export const CopyToClipboardButton = ({
  text,
  translations,
  ...props
}: CopyToClipboardButtonProps) => {
  const t = useTranslations('CopyToClipboardButton');

  return (
    <CopyToClipboardButtonClient
      text={text}
      translations={{
        ...translations,
        unsupported: t('unsupported'),
      }}
      {...props}
    />
  );
};
