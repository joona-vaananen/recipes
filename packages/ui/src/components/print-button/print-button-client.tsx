'use client';

import { AccessibleIcon, IconButton } from '@radix-ui/themes';
import { Printer } from 'lucide-react';

interface PrintButtonClientProps
  extends React.ComponentPropsWithoutRef<typeof IconButton> {
  translations: {
    label: string;
  };
}

export const PrintButtonClient = ({
  translations,
  ...props
}: PrintButtonClientProps) => {
  const onClick = () => {
    window.print();
  };

  return (
    <IconButton onClick={onClick} type={'button'} radius={'full'} {...props}>
      <AccessibleIcon label={translations.label}>
        <Printer className={'h-4 w-4'} />
      </AccessibleIcon>
    </IconButton>
  );
};
