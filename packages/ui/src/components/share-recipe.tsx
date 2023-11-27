import { AccessibleIcon, Flex, IconButton, Text } from '@radix-ui/themes';
import { Link, Share } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { stringify } from 'qs';

import { BASE_URL } from '../constants';
import { getPathname, type Locale } from '../lib/utils/navigation';
import { CopyToClipboardButton } from './copy-to-clipboard-button';
import { Facebook, Pinterest, X } from './icons';

interface ShareRecipeProps extends React.HTMLAttributes<HTMLDivElement> {
  locale: string;
  slug: string;
}

export const ShareRecipe = ({ locale, slug, ...props }: ShareRecipeProps) => {
  const t = useTranslations('ShareRecipe');

  const url = `${BASE_URL}/${locale}${getPathname({
    locale: locale as Locale,
    href: {
      pathname: '/recipes/[slug]',
      params: { slug },
    },
  })}`;

  return (
    <Flex direction={'column'} gap={'4'} {...props}>
      <Flex align={'center'} gap={'2'}>
        <Share className={'h-6 w-6'} />
        <Text weight={'bold'}>{t('label')}</Text>
      </Flex>
      <Flex gap={'4'} wrap={'wrap'}>
        <IconButton asChild radius={'full'}>
          <a
            href={`https://facebook.com/sharer/sharer.php${stringify(
              { u: url },
              { addQueryPrefix: true, encodeValuesOnly: true }
            )}`}
            rel={'noopener noreferrer'}
            target={'_blank'}
          >
            <AccessibleIcon label={'Facebook'}>
              <Facebook className={'h-4 w-4 fill-[#fff]'} />
            </AccessibleIcon>
          </a>
        </IconButton>
        <IconButton asChild radius={'full'}>
          <a
            href={`https://pinterest.com/pin/create/button${stringify(
              { url },
              { addQueryPrefix: true, encodeValuesOnly: true }
            )}`}
            rel={'noopener noreferrer'}
            target={'_blank'}
          >
            <AccessibleIcon label={'Pinterest'}>
              <Pinterest className={'h-4 w-4 fill-[#fff]'} />
            </AccessibleIcon>
          </a>
        </IconButton>
        <IconButton asChild radius={'full'}>
          <a
            href={`https://x.com/share${stringify(
              { url },
              { addQueryPrefix: true, encodeValuesOnly: true }
            )}`}
            rel={'noopener noreferrer'}
            target={'_blank'}
          >
            <AccessibleIcon label={'X'}>
              <X className={'h-4 w-4 fill-[#fff]'} />
            </AccessibleIcon>
          </a>
        </IconButton>
        <IconButton asChild radius={'full'}>
          <CopyToClipboardButton
            text={url}
            translations={{
              textCopied: t('linkCopied'),
            }}
          >
            <AccessibleIcon label={t('copyLink')}>
              <Link className={'h-4 w-4 stroke-[#fff]'} />
            </AccessibleIcon>
          </CopyToClipboardButton>
        </IconButton>
      </Flex>
    </Flex>
  );
};
