import { Button } from '@radix-ui/themes';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Hero, Link } from '@recipes/ui';

const NotFound = () => {
  const t = useTranslations('NotFound');

  return (
    <Hero title={t('title')} description={t('description')}>
      <Button asChild>
        <Link href={'/'}>
          {t('homePageLink')}
          <ArrowRight className={'h-4 w-4'} />
        </Link>
      </Button>
    </Hero>
  );
};

export default NotFound;
