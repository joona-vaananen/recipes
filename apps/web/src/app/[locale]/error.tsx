'use client';

import { Button, Flex } from '@radix-ui/themes';
import { ArrowRight, RotateCw } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Hero, Link } from '@recipes/ui';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error = ({ reset }: ErrorProps) => {
  const t = useTranslations('Error');

  return (
    <Hero title={t('title')} description={t('description')}>
      <Flex align={'center'} gap={'4'} wrap={'wrap'}>
        <Button asChild>
          <Link href={'/'}>
            {t('homePageLink')}
            <ArrowRight className={'h-4 w-4'} />
          </Link>
        </Button>
        <Button onClick={() => reset()} variant={'outline'}>
          {t('resetPage')}
          <RotateCw className={'h-4 w-4'} />
        </Button>
      </Flex>
    </Hero>
  );
};

export default Error;
