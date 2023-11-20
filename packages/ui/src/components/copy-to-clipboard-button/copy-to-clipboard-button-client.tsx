'use client';

import { Box, Callout, Tooltip } from '@radix-ui/themes';
import { AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CopyToClipboardButtonClientProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  translations: {
    textCopied: string;
    unsupported: string;
  };
}

export const CopyToClipboardButtonClient = ({
  children,
  text,
  translations,
  ...props
}: CopyToClipboardButtonClientProps) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isUnsupported, setIsUnsupported] = useState(false);

  const onClick = async () => {
    try {
      await window.navigator.clipboard?.writeText(text);

      setIsTooltipOpen(true);
    } catch {
      setIsUnsupported(true);
    }
  };

  useEffect(() => {
    if (!isTooltipOpen) {
      return;
    }

    const timeoutId = setTimeout(() => setIsTooltipOpen(false), 5_000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isTooltipOpen]);

  return (
    <>
      <Tooltip
        className={'[&>span:first-of-type]:!bottom-[1px]'}
        content={translations.textCopied}
        open={isTooltipOpen}
      >
        <button onClick={() => void onClick()} {...props}>
          {children}
        </button>
      </Tooltip>
      {isUnsupported ? (
        <Box width={'100%'}>
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
        </Box>
      ) : null}
    </>
  );
};
