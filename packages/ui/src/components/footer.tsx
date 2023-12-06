import {
  AccessibleIcon,
  Container,
  Flex,
  Grid,
  IconButton,
  Link,
  Separator,
  Text,
} from '@radix-ui/themes';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import type { Media } from '@recipes/api/src/common/interfaces/Media';
import { Link as NextLink } from '../lib/utils/navigation';
import { Facebook, Instagram, Pinterest, TikTok, X, YouTube } from './icons';

interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  copyright: string;
  logo: {
    data: Media;
  };
}

export const Footer = ({ copyright, logo, ...props }: FooterProps) => {
  const t = useTranslations('Footer');

  return (
    <footer {...props}>
      <Separator decorative size={'4'} />
      <Container className={'max-w-full'} px={'4'} py={'2'}>
        <Grid
          align={'center'}
          columns={{
            initial: '1',
            md: '3',
          }}
          gap={'4'}
        >
          <Flex
            justify={{
              initial: 'center',
              md: 'start',
            }}
          >
            <Link asChild>
              <NextLink className={'shrink-0'} href={'/'}>
                <Image
                  alt={logo.data.attributes.alternativeText ?? ''}
                  blurDataURL={
                    'placeholder' in logo && logo.placeholder
                      ? (logo.placeholder as string)
                      : undefined
                  }
                  className={'h-14 w-auto'}
                  height={logo.data.attributes.height}
                  placeholder={
                    'placeholder' in logo && logo.placeholder ? 'blur' : 'empty'
                  }
                  priority
                  quality={100}
                  src={logo.data.attributes.url}
                  width={logo.data.attributes.width}
                />
              </NextLink>
            </Link>
          </Flex>
          <Flex align={'center'} gap={'4'} justify={'center'}>
            <Text color={'gray'}>{copyright}</Text>
            <Separator className={'print:hidden'} orientation={'vertical'} />
            <Link asChild>
              <NextLink className={'print:hidden'} href={'/privacy-policy'}>
                {t('privacyPolicy')}
              </NextLink>
            </Link>
          </Flex>
          <Flex
            gap={'4'}
            justify={{
              initial: 'center',
              md: 'end',
            }}
            pb={{
              initial: '2',
              md: '0',
            }}
          >
            <IconButton asChild radius={'full'}>
              <a
                href={'https://facebook.com/olisipacom'}
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
                href={'https://instagram.com/olisipacom'}
                rel={'noopener noreferrer'}
                target={'_blank'}
              >
                <AccessibleIcon label={'Instagram'}>
                  <Instagram className={'h-4 w-4 fill-[#fff]'} />
                </AccessibleIcon>
              </a>
            </IconButton>
            <IconButton asChild radius={'full'}>
              <a
                href={'https://pinterest.com/olisipacom'}
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
                href={'https://tiktok.com/@olisipacom'}
                rel={'noopener noreferrer'}
                target={'_blank'}
              >
                <AccessibleIcon label={'TikTok'}>
                  <TikTok className={'h-4 w-4 fill-[#fff]'} />
                </AccessibleIcon>
              </a>
            </IconButton>
            <IconButton asChild radius={'full'}>
              <a
                href={'https://x.com/olisipacom'}
                rel={'noopener noreferrer'}
                target={'_blank'}
              >
                <AccessibleIcon label={'X'}>
                  <X className={'h-4 w-4 fill-[#fff]'} />
                </AccessibleIcon>
              </a>
            </IconButton>
            <IconButton asChild radius={'full'}>
              <a
                href={'https://youtube.com/@olisipacom'}
                rel={'noopener noreferrer'}
                target={'_blank'}
              >
                <AccessibleIcon label={'YouTube'}>
                  <YouTube className={'h-4 w-4 fill-[#fff]'} />
                </AccessibleIcon>
              </a>
            </IconButton>
          </Flex>
        </Grid>
      </Container>
    </footer>
  );
};
