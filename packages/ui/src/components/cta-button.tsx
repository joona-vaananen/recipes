import { Button } from '@radix-ui/themes';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import type { CtaButton as ICtaButton } from '@recipes/api/src/components/ui/interfaces/CtaButton';
import { BASE_URL } from '../constants';

type CtaButtonProps = ICtaButton;

export const CtaButton = ({ text, url, variant }: CtaButtonProps) => {
  if (url.startsWith('/')) {
    return (
      <Button asChild variant={variant ?? undefined}>
        <Link href={url}>
          {text}
          <ArrowRight className={'h-4 w-4'} />
        </Link>
      </Button>
    );
  }

  if (url.startsWith(BASE_URL)) {
    try {
      const { pathname } = new URL(url);

      return (
        <Button asChild variant={variant ?? undefined}>
          <Link href={pathname}>
            {text}
            <ArrowRight className={'h-4 w-4'} />
          </Link>
        </Button>
      );
    } catch {
      return (
        <Button asChild variant={variant ?? undefined}>
          <a href={url}>
            {text}
            <ArrowRight className={'h-4 w-4'} />
          </a>
        </Button>
      );
    }
  }

  return (
    <Button asChild variant={variant ?? undefined}>
      <a href={url} rel={'noopener noreferrer'} target={'_blank'}>
        {text}
        <ArrowRight className={'h-4 w-4'} />
      </a>
    </Button>
  );
};
